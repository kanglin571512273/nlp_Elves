<template>
  <div class="createContent">
    <!-- 表单操作 -->
    <div class="formContainer">
      <div
        class="myBtn myBtn_blue myBtn_plain myBtn_plain_blue"
        @click="$router.go(-1)"
      >
        <img src="@/assets/images/arrow.png" alt />
        返回
      </div>
      <div class="node">
        <span>当前节点：</span>
        <span>{{ 7377 }}</span>
      </div>
      <div class="node">
        <span>关系节点数量：</span>
        <span>{{ 815 }}</span>
      </div>
      <div class="node">
        <span>显示节点个数：</span>
        <span
          :class="{ showNodeNum: true, active: nodeNum == 1 }"
          @click="showNodeNum(1)"
          >100</span
        >
        <i></i>
        <span
          :class="{ showNodeNum: true, active: nodeNum == 2 }"
          @click="showNodeNum(2)"
          >300</span
        >
        <i></i>
        <span
          :class="{ showNodeNum: true, active: nodeNum == 3 }"
          @click="showNodeNum(3)"
          >500</span
        >
        <i></i>
        <span
          :class="{ showNodeNum: true, active: nodeNum == 4 }"
          @click="showNodeNum(4)"
          >1000</span
        >
      </div>
      <div class="search">
        <el-input
          placeholder="请输入内容..."
          v-model="keyword"
          size="mini"
          clearable
        >
          <img
            v-show="!keyword"
            src="@/assets/images/search.png"
            alt
            slot="suffix"
          />
        </el-input>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">操作</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">导出图片</el-dropdown-item>
            <el-dropdown-item command="2">导入CSV</el-dropdown-item>
            <el-dropdown-item command="3">导出CSV</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <!-- 展示区 -->
    <div class="showcontainer">
      <iframe :src="src" class="iframebox"></iframe>
    </div>
    <!-- 按钮 -->
    <div class="btnContainer">
      <div class="myBtn_info diaBtn">取 消</div>
      <div class="myBtn_blue diaBtn">立即创建</div>
    </div>

    <!-- 弹框区 -->

    <el-dialog :visible.sync="dialogFormVisible">
      <div class="dialogNav">
        <div
          :class="{ navItem: true, active: activeNav == 1 }"
          @click="changeNav(1)"
        >
          基本属性
        </div>
        <div
          :class="{ navItem: true, active: activeNav == 2 }"
          @click="changeNav(2)"
        >
          高级属性
        </div>
        <div
          :class="{ navItem: true, active: activeNav == 3 }"
          @click="changeNav(3)"
        >
          规则编辑
        </div>
      </div>
      <div class="diaContainer">
        <!-- 基本属性  -->
        <el-form
          v-show="activeNav == 1"
          label-position="right"
          :model="basicAttrForm"
          label-width="120px"
          align="left"
        >
          <el-form-item label="活动名称：">
            <el-input
              v-model="basicAttrForm.name"
              size="mini"
              placeholder="请输入节点名称"
              maxlength="20"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="选择颜色：">
            <div class="colorContainer">
              <div
                class="colorItem"
                v-for="(item, index) in colors"
                :key="item"
                :style="{ background: color == index + 1 ? item : '' }"
              >
                <i
                  :style="{ background: item }"
                  @click="chooseColor(index + 1)"
                ></i>
              </div>
            </div>
            <el-color-picker
              v-model="basicAttrForm.defaultColor"
              size="mini"
              show-alpha
              @change="changeColor"
            ></el-color-picker>
          </el-form-item>
          <el-form-item label="节点半径：">
            <el-slider
              v-model="basicAttrForm.slider"
              :min="0"
              :max="100"
            ></el-slider>
          </el-form-item>
        </el-form>
        <!-- 高级属性  -->
        <el-form
          v-show="activeNav == 2"
          :model="advancePropForm"
          align="left"
          label-width="120px"
          label-position="right"
        >
          <el-form-item label="关联产品：">
            <el-cascader
              v-model="advancePropForm.product"
              :options="options"
              @change="chooseProduct"
              size="mini"
              placeholder="请输入关联产品"
            ></el-cascader>
          </el-form-item>
        </el-form>
        <!-- 规则编辑  -->
        <div class="ruleEditForm scrollbar" v-show="activeNav == 3">
          <div class="ruleItem" v-for="item in ruleEditForm" :key="item.id">
            <div class="nodeItem">
              <el-select v-model="item.node" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in ruleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="nodeItem">
              <el-input
                v-model="item.node1"
                placeholder="请输入"
                size="mini"
              ></el-input>
            </div>
            <div class="nodeItem">
              <el-select v-model="item.node2" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in ruleOptions1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="nodeItem">
              <el-select v-model="item.node3" placeholder="请选择" size="mini">
                <el-option
                  v-for="item in ruleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="nodeItem">
              <el-input
                v-model="item.node4"
                placeholder="请输入"
                size="mini"
              ></el-input>
            </div>
            <div class="nodeItem">
              <img
                src="@/assets/images/delete.png"
                @click="deleteItem(item.id)"
                alt
              />
            </div>
          </div>
          <div
            v-show="ruleEditForm.length < 10"
            class="myBtn_plain_blue blue"
            @click="addForm"
          >
            新增
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <div class="myBtn_info diaBtn" @click="dialogFormVisible = false">
            取 消
          </div>
          <div
            class="myBtn_blue diaBtn"
            type="primary"
            @click="dialogFormVisible = false"
          >
            确 定
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import "@/utils/importFile";

export default {
  data() {
    return {
      id: null,
      keyword: "", //搜索关键字
      nodeNum: 1, //节点个数
      dialogFormVisible: false, //弹框显示
      src: "http://192.168.1.27:8089/kg/index/",
      //基本属性表单
      basicAttrForm: {
        name: "",
        defafalseltColor: "#409EFF", //默认颜色
        slider: 20 //滑块
      },
      colors: ["#FF6F49", "#004FFF", "#FF9C05", "#A6FF00", "#CC8DFF"],
      color: 1,
      //高级属性
      advancePropForm: { product: "" },
      options: [
        {
          value: "zhinan",
          label: "指南",
          children: [
            {
              value: "shejiyuanze",
              label: "设计原则",
              children: [
                {
                  value: "yizhi",
                  label: "一致"
                },
                {
                  value: "fankui",
                  label: "反馈"
                },
                {
                  value: "xiaolv",
                  label: "效率"
                },
                {
                  value: "kekong",
                  label: "可控"
                }
              ]
            },
            {
              value: "daohang",
              label: "导航",
              children: [
                {
                  value: "cexiangdaohang",
                  label: "侧向导航"
                },
                {
                  value: "dingbudaohang",
                  label: "顶部导航"
                }
              ]
            }
          ]
        },
        {
          value: "zujian",
          label: "组件",
          children: [
            {
              value: "basic",
              label: "Basic",
              children: [
                {
                  value: "layout",
                  label: "Layout 布局"
                },
                {
                  value: "color",
                  label: "Color 色彩"
                },
                {
                  value: "typography",
                  label: "Typography 字体"
                },
                {
                  value: "icon",
                  label: "Icon 图标"
                },
                {
                  value: "button",
                  label: "Button 按钮"
                }
              ]
            },
            {
              value: "form",
              label: "Form",
              children: [
                {
                  value: "radio",
                  label: "Radio 单选框"
                },
                {
                  value: "checkbox",
                  label: "Checkbox 多选框"
                },
                {
                  value: "input",
                  label: "Input 输入框"
                },
                {
                  value: "input-number",
                  label: "InputNumber 计数器"
                },
                {
                  value: "select",
                  label: "Select 选择器"
                },
                {
                  value: "cascader",
                  label: "Cascader 级联选择器"
                },
                {
                  value: "switch",
                  label: "Switch 开关"
                },
                {
                  value: "slider",
                  label: "Slider 滑块"
                },
                {
                  value: "time-picker",
                  label: "TimePicker 时间选择器"
                },
                {
                  value: "date-picker",
                  label: "DatePicker 日期选择器"
                },
                {
                  value: "datetime-picker",
                  label: "DateTimePicker 日期时间选择器"
                },
                {
                  value: "upload",
                  label: "Upload 上传"
                },
                {
                  value: "rate",
                  label: "Rate 评分"
                },
                {
                  value: "form",
                  label: "Form 表单"
                }
              ]
            },
            {
              value: "data",
              label: "Data",
              children: [
                {
                  value: "table",
                  label: "Table 表格"
                },
                {
                  value: "tag",
                  label: "Tag 标签"
                },
                {
                  value: "progress",
                  label: "Progress 进度条"
                },
                {
                  value: "tree",
                  label: "Tree 树形控件"
                },
                {
                  value: "pagination",
                  label: "Pagination 分页"
                },
                {
                  value: "badge",
                  label: "Badge 标记"
                }
              ]
            },
            {
              value: "notice",
              label: "Notice",
              children: [
                {
                  value: "alert",
                  label: "Alert 警告"
                },
                {
                  value: "loading",
                  label: "Loading 加载"
                },
                {
                  value: "message",
                  label: "Message 消息提示"
                },
                {
                  value: "message-box",
                  label: "MessageBox 弹框"
                },
                {
                  value: "notification",
                  label: "Notification 通知"
                }
              ]
            },
            {
              value: "navigation",
              label: "Navigation",
              children: [
                {
                  value: "menu",
                  label: "NavMenu 导航菜单"
                },
                {
                  value: "tabs",
                  label: "Tabs 标签页"
                },
                {
                  value: "breadcrumb",
                  label: "Breadcrumb 面包屑"
                },
                {
                  value: "dropdown",
                  label: "Dropdown 下拉菜单"
                },
                {
                  value: "steps",
                  label: "Steps 步骤条"
                }
              ]
            },
            {
              value: "others",
              label: "Others",
              children: [
                {
                  value: "dialog",
                  label: "Dialog 对话框"
                },
                {
                  value: "tooltip",
                  label: "Tooltip 文字提示"
                },
                {
                  value: "popover",
                  label: "Popover 弹出框"
                },
                {
                  value: "card",
                  label: "Card 卡片"
                },
                {
                  value: "carousel",
                  label: "Carousel 走马灯"
                },
                {
                  value: "collapse",
                  label: "Collapse 折叠面板"
                }
              ]
            }
          ]
        },
        {
          value: "ziyuan",
          label: "资源",
          children: [
            {
              value: "axure",
              label: "Axure Components"
            },
            {
              value: "sketch",
              label: "Sketch Templates"
            },
            {
              value: "jiaohu",
              label: "组件交互文档"
            }
          ]
        }
      ],
      //规则编辑
      ruleEditForm: [
        { id: 1, node: "", node1: "", node2: "", node3: "", node4: "" }
      ],
      ruleOptions: [
        { value: "1", label: "节点" },
        { value: "2", label: "数值" },
        { value: "3", label: "文本" }
      ],
      ruleOptions1: [
        { value: "1", label: "<" },
        { value: "2", label: "=" },
        { value: "3", label: ">" },
        { value: "4", label: "<=" },
        { value: "5", label: ">=" }
      ],
      activeNav: 1
    };
  },
  mounted() {
    this.id = this.$route.params.id;
    var token = localStorage.getItem("token");
    this.src = this.src + this.id + "/" + token;
    console.log(this.id);
  },
  methods: {
    // 展示几个节点
    showNodeNum(index) {
      this.nodeNum = index;
    },
    // 下拉框的选择事件
    handleCommand(val) {
      console.log(val);
    },
    // 选择颜色
    changeColor(val) {
      console.log(val);
    },
    // 选择颜色
    chooseColor(ind) {
      this.color = ind;
      this.defaultColor = this.colors[ind - 1];
    },
    changeNav(ind) {
      console.log(ind);
      this.activeNav = ind;
    },
    // 关联产品
    chooseProduct(val) {
      console.log(val);
    },
    // 表格编辑框
    handleClick(val) {
      console.log(val);
    },
    // 新增表单
    addForm() {
      console.log("addForm");
      this.ruleEditForm.push({
        id: this.ruleEditForm.length + 1,
        node: "",
        node1: "",
        node2: "",
        node3: "",
        node4: ""
      });
    },
    deleteItem(id) {
      this.ruleEditForm = this.ruleEditForm.filter(item => item.id !== id);
      // this.ruleEditForm.split()
    }
  }
};
</script>

<style lang="less" scoped>
.createContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  // 表单操作
  .formContainer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .myBtn {
      color: rgba(45, 50, 145, 1);
      width: 83px;
      img {
        width: 14px;
        vertical-align: middle;
      }
    }
    .node {
      .showNodeNum {
        cursor: pointer;
      }
      .active {
        color: rgba(0, 120, 255, 1);
      }
      i {
        display: inline-block;
        vertical-align: middle;
        margin: 0 10px;
        width: 4px;
        height: 4px;
        background: #c0c4cc;
        border-radius: 50%;
      }
    }
    .search {
      display: flex;
      img {
        width: 16px;
        margin: 5px;
      }
      .el-input {
        margin-right: 10px;
      }
      .el-dropdown-link {
        width: 104px;
        display: inline-block;
        background: #2d3291;
        color: #fff;
        height: 27px;
        border-radius: 3px;
        line-height: 27px;
      }
    }
  }

  // 展示区
  .iframebox {
    width: 100%;
    height: 100%;
  }
  .showcontainer {
    flex: 1;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
  }
  // 按钮
  .btnContainer {
    padding-top: 10px;
    text-align: right;
  }
  // 弹框区域
  .el-dialog {
    .dialogNav {
      display: flex;
      .navItem {
        width: 163px;
        line-height: 34px;
        text-align: center;
        background: #f0f2f5;
        border: 1px solid #f0f2f5;
        border-radius: 2px;
        color: #666;
      }
      .active {
        background-color: #fff;
        color: rgba(45, 50, 145, 1);
      }
    }
    .diaContainer {
      box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
      border-radius: 6px;
      padding: 15px;
      height: 410px;
      // 颜色选择
      .colorContainer {
        float: left;
        display: flex;
        width: 204px;
        // padding-top: 10px;
        margin-top: 10px;
        margin-right: 30px;
        justify-content: space-between;
        .colorItem {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          position: relative;
          i {
            display: inline-block;
            width: 15px;
            height: 15px;
            border: 1.5px solid #fff;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
        }
      }
      .el-color-picker {
        margin-top: 5px;
      }
      .dialog-footer {
        text-align: right;
      }
      .ruleEditForm {
        height: 385px;
        overflow: auto;
        text-align: left;
        .ruleItem {
          border-radius: 6px;
          border: 1px dashed #979797;
          margin-bottom: 10px;
          padding: 10px;
          box-sizing: border-box;
          display: flex;
          justify-content: space-between;
          img {
            width: 15px;
            vertical-align: middle;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.formContainer {
  .el-select {
    width: 104px;
  }
  .el-select .el-input__inner {
    background-color: #2d3291;
  }
}
.createContent {
  .el-dialog__header {
    padding: 0 20px 0px;
  }
  .el-dialog {
    width: 85%;
    .el-form {
      width: 50%;
      height: 92%;
    }
  }
}
</style>
