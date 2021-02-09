<template>
  <div class="myKnowledge">
    <div class="btn">
      <div class="createBtn" @click="addKnowItem">创建知识库</div>
    </div>
    <div class="cartContain scrollbar">
      <CartItem
        v-for="item in listData"
        :key="item.id"
        :data="item"
        @deleteItem="deleteItem"
        @editItem="editItem"
        @editReleaseStatus="editReleaseStatus"
      ></CartItem>
      <div v-show="!listData.length" class="hint">暂无内容...</div>
    </div>
    <!-- 添加知识狂弹窗 -->
    <el-dialog :visible.sync="dialogFormVisible" @close="resetForm('ruleForm')">
      <div class="diaContainer">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          label-position="right"
        >
          <span class="header">{{creatOrEdit[creatOrEditId].title}}</span>
          <el-form-item label="知识库名称:" prop="name">
            <el-input
              v-model.trim="ruleForm.name"
              maxlength="20"
              size="mini"
              show-word-limit
              placeholder="请输入知识库名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="知识库说明:">
            <el-input
              type="textarea"
              size="mini"
              v-model.trim="ruleForm.remark"
              maxlength="120"
              show-word-limit
              placeholder="请输入知识库名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="上传图片:">
            <el-upload
              size="mini"
              class="upload-demo"
              :action="action"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              :before-remove="beforeRemove"
              accept="image/png, image/jpeg, image/jpg"
              multiple
              :limit="1"
              :file-list="fileList"
            >
              <div class="myBtn myBtn_blue" v-show="!fileList.length">上传图片</div>
            </el-upload>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <div class="myBtn_info diaBtn" @click="resetForm('ruleForm')">取 消</div>
          <div
            class="myBtn_blue diaBtn"
            @click="submitForm('ruleForm')"
          >{{creatOrEdit[creatOrEditId].btn}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "@/utils/request";
import {
  getKnowList,
  deleteKnowItem,
  editReleaseStatus,
  getKnowInfo,
  addKnowInfo,
  editKnowInfo,
} from "@/api/api";
import CartItem from "./components/CartItem";
import {
  _getList,
  _delete,
  _getInfo,
  _editStatus,
  _addItem,
  deleteItem,
} from "@/utils/requestApi";
import { MessageBox, Message } from "@/utils/importFile";
export default {
  components: { CartItem },
  data() {
    return {
      pages: {
        pageIndex: 1,
        pageSize: 1000,
        totalCount: 0,
      },
      creatOrEditId: 0,
      creatOrEdit: [
        {
          title: "创建知识库",
          btn: "立即创建",
        },
        {
          title: "修改知识库信息",
          btn: "立即修改",
        },
      ],
      action: axios.baseUrl + "img/upload",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      fileList: [],
      listData: [],
      dialogFormVisible: false,
      ruleForm: {
        name: "",
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
      },
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 获取列表
    getList(search = {}) {
      let { pageIndex, pageSize } = this.pages;
      let newData = Object.assign(
        { dataSource: 1, pageIndex, pageSize },
        search
      );
      _getList(getKnowList, newData, (res) => {
        let { nodeList, totalCount } = res.data;
        this.listData = nodeList;
        this.pages.totalCount = totalCount;
      });
    },
    // 修改发布状态
    editReleaseStatus(ids, status) {
      _editStatus(editReleaseStatus, { ids, status }, () => {
        this.getList();
      });
    },
    // 创建  /  修改  知识库
    addKnowInfo(form) {
      const requestApi = this.creatOrEditId ? editKnowInfo : addKnowInfo;
      _addItem(requestApi, form, () => {
        this.dialogFormVisible = false;
        this.getList();
      });
    },
    // 添加
    addKnowItem() {
      this.creatOrEditId = 0;
      this.dialogFormVisible = true;
    },
    // 删除
    deleteItem(id) {
      deleteItem(() => {
        _delete(deleteKnowItem, this.pages, { domainid: id }, (flag) => {
          this.getList();
        });
      });
    },
    // 编辑
    editItem(id) {
      console.log(id);
      this.creatOrEditId = 1;
      this.dialogFormVisible = true;
      _getInfo(getKnowInfo, { domainId: id }, (res) => {
        this.ruleForm = res.data;
        this.fileList = [{ name: "iconImg.jpeg", url: res.data.iconUrl }];
      });
    },
    addKnowledge() {},
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let form;
          if (this.creatOrEditId) {
            //修改
            let newImg = {
              iconUrl: this.fileList[0] && this.fileList[0].onlineUrl,
            };
            form = Object.assign(this.ruleForm, newImg);
          } else {
            // 添加
            let { name, remark } = this.ruleForm;
            form = {
              domain: name,
              remark,
              url: this.fileList[0] && this.fileList[0].onlineUrl,
            };
          }
          this.addKnowInfo(form);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogFormVisible = false;
      this.ruleForm = {
        name: "",
        remark: "",
      };
      this.fileList = [];
    },
    // 上传成功
    handleSuccess(res) {
      Message.success(res.msg);
      this.fileList = res.data;
    },
    // 删除图片
    handleRemove(file, fileList) {
      this.fileList = [];
    },

    // 删除之前
    beforeRemove(file, fileList) {
      return MessageBox.confirm(`确定移除 ${file.name}？`);
    },
  },
};
</script>

<style lang="less" scoped>
.myKnowledge {
  // 卡片容器
  .cartContain {
    margin-top: 10px;
    flex: 1;
    overflow: auto;
    height: 520px;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
  }
  .diaContainer {
    text-align: left;
    box-shadow: 0px 0px 4px 0px rgba(45, 50, 145, 0.15);
    border-radius: 6px;
    min-height: 475px;
    padding: 15px;
    position: relative;
    .header {
      font-weight: 700;
      display: inline-block;
      margin-bottom: 15px;
      color: #333;
    }
    .dialog-footer {
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
  .myBtn {
    width: 80px;
    height: 31px;
    padding: 0;
    text-align: center;
    line-height: 31px;
  }
  .hint {
    text-align: center;
    line-height: 200px;
    color: #aaa;
  }
}
</style>
<style  lang="less" >
.myKnowledge {
  .el-dialog__header {
    padding: 0 20px 0px;
  }
  .el-dialog__headerbtn {
    top: 1px;
  }
  .el-dialog {
    margin-top: 9vh !important;
    width: 85%;
    .el-form {
      width: 50%;
      height: 92%;
    }
  }
}
</style>