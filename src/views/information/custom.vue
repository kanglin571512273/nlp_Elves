<template>
  <div>
    <el-dialog title="个性化配置" width="70%" :visible.sync="dialogFormVisible">
      <div v-show="addstatus">
        <div class="adproblem" @click="addstatus = false">新增</div>
        <el-card>
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="serial" label="序号" width="80">
            </el-table-column>
            <el-table-column prop="name" label="问题"> </el-table-column>
            <el-table-column prop="id" label="答案"> </el-table-column>
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  class="edit"
                  >编辑</el-button
                >
                <el-button type="text" size="small" class="delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div v-show="!addstatus">
        <el-card>
          <div class="digital-box">
            <div class="title">问题</div>
            <el-form
              :model="problemForm"
              ref="problemForm"
              label-width="100px"
              class="demo-dynamic"
              label-position="left"
            >
              <el-form-item
                prop="question"
                label="标准问题："
                :rules="[
                  {
                    required: true,
                    message: '请输入问题',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input v-model="problemForm.question"></el-input>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in problemForm.domains"
                :label="'相似问题' + (index + 1)"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                  required: true,
                  message: '问题不能为空',
                  trigger: 'blur'
                }"
              >
                <div class="input_box">
                  <el-input v-model="domain.value"></el-input
                  ><el-button @click.prevent="removeDomain(domain)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>

              <el-form-item>
                <el-button @click="addDomain">新增</el-button>
                <el-button @click="resetForm('problemForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="digital-box">
            <div class="title">答案</div>
            <el-form
              :model="answerForm"
              ref="answerForm"
              label-width="100px"
              class="demo-dynamic"
              label-position="left"
            >
              <el-form-item
                prop="email"
                label="文本答案："
                :rules="[
                  {
                    required: true,
                    message: '请输入答案',
                    trigger: 'blur'
                  }
                ]"
              >
                <el-input v-model="answerForm.answer"></el-input>
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in answerForm.domains"
                :label="'相似答案' + (index + 1)"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                  required: true,
                  message: '域名不能为空',
                  trigger: 'blur'
                }"
              >
                <div class="input_box">
                  <el-input v-model="domain.value"></el-input
                  ><el-button @click.prevent="removeDomain(domain)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>

              <el-form-item>
                <!-- <el-button @click="addDomain">新增</el-button> -->
                <!-- <el-button @click="resetForm('answerForm')"
                  >重置</el-button
                > -->
              </el-form-item>
            </el-form>
          </div>
          <el-button type="primary" @click="submitForm('problemForm')"
            >提交</el-button
          >
        </el-card>
      </div>
    </el-dialog>
    <div class="digital-box">
      <div class="title">
        对话设置 <i class="el-icon-question" style="color:#2D3291;"></i>
      </div>
      <div class="types">
        <span class="sapanel">类型：</span>
        <div class="type">
          <span>自定义回答：</span> <el-switch v-model="reply"></el-switch>
          <div class="setup" @click="setup">设置</div>
        </div>
      </div>
    </div>
    <div class="digital-box">
      <div class="title">
        推荐反问配置 <i class="el-icon-question" style="color:#2D3291;"></i>
      </div>
      <div>
        <span>推荐反问状态：</span>
        <el-switch v-model="delivery"></el-switch>
      </div>
    </div>
    <div class="digital-box">
      <div class="title">
        知识库设置
      </div>
      <div class="configuration">知识库配置</div>
      <div class="card-box">
        <div class="card_items card_list">
          <span>
            为机器人添加知识库吧，让它可以更加智能～
          </span>
        </div>
        <div class="card_items">
          <div class="card_item">
            <div class="card_img">
              <img
                src="https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
                alt="img"
              />
            </div>
            <div class="card_fonts">
              <div class="card_title">农行知识库</div>
              <div>说明：理财知识库</div>
              <div>时间：2021-01-13 12:12:12</div>
            </div>
          </div>
        </div>
        <div class="card_items">
          <div class="card_item">
            <div class="card_img">
              <img
                src="https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
                alt="img"
              />
            </div>
            <div class="card_fonts">
              <div class="card_title">农行知识库</div>
              <div>说明：理财知识库</div>
              <div>时间：2021-01-13 12:12:12</div>
            </div>
          </div>
        </div>
        <div class="card_items">
          <div class="card_item">
            <div class="card_img">
              <img
                src="https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
                alt="img"
              />
            </div>
            <div class="card_fonts">
              <div class="card_title">农行知识库</div>
              <div>说明：理财知识库</div>
              <div>时间：2021-01-13 12:12:12</div>
            </div>
          </div>
        </div>
        <div class="card_items">
          <div class="card_item">
            <div class="card_img">
              <img
                src="https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
                alt="img"
              />
            </div>
            <div class="card_fonts">
              <div class="card_title">农行知识库</div>
              <div>说明：理财知识库</div>
              <div>时间：2021-01-13 12:12:12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import {
  Switch,
  Dialog,
  Card,
  Table,
  TableColumn,
  Form,
  FormItem
} from "element-ui";
Vue.use(Switch);
Vue.use(Dialog);
Vue.use(Card);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Form);
Vue.use(FormItem);
export default {
  data() {
    return {
      delivery: true,
      reply: false,
      dialogFormVisible: false,
      addstatus: true,
      tableData: [
        {
          serial: 1,
          date: "2016-05-02",
          name: "王小虎",
          id: 67907790,
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          serial: 2,
          date: "2016-05-04",
          id: 67907790,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333
        },
        {
          serial: 3,
          date: "2016-05-01",
          id: 67907790,
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333
        },
        {
          serial: 4,
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          id: 67907790,
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333
        }
      ],
      problemForm: {
        domains: [
          {
            value: ""
          }
        ],
        question: ""
      },
      answerForm: {
        domains: [
          {
            value: ""
          }
        ],
        answer: ""
      }
    };
  },
  methods: {
    setup() {
      this.dialogFormVisible = true;
      this.addstatus = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.problemForm.domains.indexOf(item);
      if (index !== -1) {
        this.problemForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.problemForm.domains.push({
        value: "",
        key: Date.now()
      });
    }
  }
};
</script>
<style lang="less" scoped>
.digital-box {
  border: 1px dashed #979797;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 10px;
  .title {
    line-height: 20px;
    font-weight: bold;
    color: #333333;
    font-size: 14px;
    margin-bottom: 20px;
  }
  .types {
    display: flex;
    .sapanel {
      margin-right: 70px;
    }
    .type {
      display: flex;
      .setup {
        width: 56px;
        height: 22px;
        line-height: 22px;
        border-radius: 4px;
        border: 1px solid #2d3291;
        color: #2d3291;
        text-align: center;
        font-weight: bold;
        margin-left: 20px;
        cursor: pointer;
      }
    }
  }
}

.configuration {
  width: 92px;
  height: 22px;
  line-height: 22px;
  border-radius: 4px;
  border: 1px solid #2d3291;
  color: #2d3291;
  text-align: center;
  font-weight: bold;
  cursor: pointer;
}
.card-box {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .card_items {
    width: 32%;
    height: 120px;
    margin-top: 20px;
    border-radius: 4px;
    margin-right: 22px;
    border: 2px solid #2d3291;
    display: flex;
    justify-content: center;
    align-items: center;
    .card_item {
      width: 80%;
      height: 80px;
      display: flex;
      .card_img {
        width: 108px;
        height: 80px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .card_fonts {
        font-size: 14px;
        .card_title {
          font-weight: bold;
        }
        div {
          line-height: 28px;
        }
      }
    }
  }
}
.card_list {
  background: #f0f2f5;
  border: 0 !important;
}
.adproblem {
  width: 102px;
  height: 32px;
  line-height: 32px;
  color: #fff;
  text-align: center;
  background: #2d3291;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
}
.input_box {
  display: flex;
}
</style>
