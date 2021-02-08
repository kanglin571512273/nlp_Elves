<template>
  <div>
    <el-dialog title="个性化配置" width="80%" :visible.sync="dialogFormVisible">
      <div v-show="addstatus">
        <div class="adproblem" @click="addquest">新增</div>
        <el-card class="adpros">
          <el-table :data="problemListData" border style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column prop="questionDesc" label="问题"></el-table-column>
            <el-table-column
              prop="defaultAnswer"
              label="答案"
            ></el-table-column>
            <el-table-column
              prop="updateTime"
              label="更新时间"
              width="180"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row.id)"
                  type="text"
                  class="edit"
                  >编辑</el-button
                >
                <el-button
                  type="text"
                  @click="deleteClick(scope.row)"
                  class="delete"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
      <div v-show="!addstatus">
        <el-card class="answer_box">
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
                :rules="{
                  required: true,
                  message: '问题不能为空',
                  trigger: 'blur'
                }"
              >
                <div class="input_box">
                  <el-input v-model="arr[index]"></el-input>
                  <el-button @click.prevent="removeDomain(domain)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>

              <el-form-item>
                <el-button @click="addDomain(problemForm.domains.length)"
                  >新增</el-button
                >
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
              <!-- <el-form-item
                prop="answer"
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
              </el-form-item> -->
              <el-form-item
                v-for="(domain, index) in answerForm.domains"
                :label="'文本答案' + (index + 1)"
                :key="domain.key"
                :rules="{
                  required: true,
                  message: '答案不能为空',
                  trigger: 'blur'
                }"
              >
                <div class="input_box">
                  <el-input v-model="arrquestion[index]"></el-input>
                  <el-button @click.prevent="removeAnswer(domain)"
                    >删除</el-button
                  >
                </div>
              </el-form-item>

              <el-form-item>
                <el-button @click="addanswer(answerForm.domains.length)"
                  >新增</el-button
                >
                <el-button @click="resetanswerForm('answerForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="placeholder"></div>
          <div class="serve">
            <div class="submit-box">
              <div class="create cancel" @click="addstatus = true">返回</div>
              <div class="create" @click="submitForm('problemForm')">提交</div>
            </div>
            <!-- <el-button type="primary" @click="addstatus = true">返回</el-button>
            <el-button type="primary" @click="submitForm('problemForm')"
              >提交</el-button
            >-->
          </div>
        </el-card>
      </div>
    </el-dialog>
    <div class="adproblem" @click="dialogue" v-show="configured.length != 0">
      对话测试
    </div>
    <div class="digital-box">
      <div class="title">
        对话设置
        <el-tooltip
          class="item"
          effect="dark"
          content="当用户需要个性化定制问答时，可以使用此功能。例：可以创建机器人唤醒语，或未知问题回答等"
          placement="right"
        >
          <i class="el-icon-question" style="color:#2D3291;"></i>
        </el-tooltip>
      </div>
      <div class="types">
        <!-- <span class="sapanel">类型：</span> -->
        <div class="type">
          <span>自定义回答：</span>
          <el-switch v-model="reply"></el-switch>
          <div class="setup" @click="setup">设置</div>
        </div>
      </div>
    </div>
    <div class="digital-box">
      <div class="title">
        推荐反问配置
        <el-tooltip
          class="item"
          effect="dark"
          content="开启后，系统将在回答用户问题后，自动推荐相关备选问题，引导用户深入对话；关闭后，系统将只回答问题，不做推荐引导。"
          placement="right"
        >
          <i class="el-icon-question" style="color:#2D3291;"></i>
        </el-tooltip>
      </div>
      <div>
        <span>推荐反问状态：</span>
        <el-switch v-model="delivery"></el-switch>
      </div>
    </div>
    <div class="digital-box">
      <div class="title">知识库设置</div>
      <div class="configuration" @click="knowledgebasetrue">知识库配置</div>
      <div class="card-box">
        <div class="card_items card_list" v-if="configured.length == 0">
          <span>为机器人添加知识库吧，让它可以更加智能～</span>
        </div>
        <div class="card_items" v-for="item in configured" :key="item.id">
          <div class="card_item">
            <div class="card_img">
              <img :src="item.iconUrl" alt="img" />
            </div>
            <div class="card_fonts">
              <div class="card_title ">{{ item.name }}</div>
              <div class="two_ellipsis card_fos">说明：{{ item.remark }}</div>
              <div>时间：{{ item.createTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹框区 -->

    <el-dialog width="80%" title="知识库配置" :visible.sync="knowledgebase">
      <!-- <div class="basefont">知识库配置</div> -->
      <el-card>
        <div class="dialogNav">
          <div
            :class="{ navItem: true, active: activeNav == 1 }"
            @click="changeNav(1)"
          >
            我的知识库
          </div>
          <div
            :class="{ navItem: true, active: activeNav == 2 }"
            @click="changeNav(2)"
          >
            官方知识库
          </div>
          <div
            :class="{ navItem: true, active: activeNav == 3 }"
            @click="changeNav(3)"
          >
            第三方知识库
          </div>
        </div>
        <div class="diaContainer">
          <!-- 我的知识库  -->
          <div v-show="activeNav == 1">
            <div class="card-box">
              <div
                class="card_items card_list"
                v-if="knowledgedata.length == 0"
              >
                <span>为机器人添加知识库吧，让它可以更加智能～</span>
              </div>
              <div
                class="card_bases"
                :class="{ base_items: activeitem.includes(item.id) }"
                v-for="item in knowledgedata"
                :key="item.id"
                @click="knowledge(item.id)"
              >
                <div class="card_item">
                  <div class="round-box">
                    <div
                      class="round"
                      :class="{ roundts: activeitem.includes(item.id) }"
                    ></div>
                  </div>
                  <div class="card_img">
                    <img :src="item.iconUrl" alt="img" />
                  </div>
                  <div class="card_fonts">
                    <div class="card_title">{{ item.name }}</div>
                    <div class="two_ellipsis card_fos">
                      说明：{{ item.remark }}
                    </div>
                    <div>时间：{{ item.createTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 官方知识库  -->
          <div v-show="activeNav == 2">
            <div class="card-box">
              <div class="card_items card_list" v-if="officialdata.length == 0">
                <span>为机器人添加知识库吧，让它可以更加智能～</span>
              </div>
              <div
                class="card_bases"
                :class="{ base_items: activeitem.indexOf(item.id) > -1 }"
                v-for="item in officialdata"
                :key="item.id"
                @click="knowledge(item.id)"
              >
                <div class="card_item">
                  <div class="round-box">
                    <div
                      class="round"
                      :class="{ roundts: activeitem.indexOf(item.id) > -1 }"
                    ></div>
                  </div>
                  <div class="card_img">
                    <img :src="item.iconUrl" alt="img" />
                  </div>
                  <div class="card_fonts">
                    <div class="card_title">{{ item.name }}</div>
                    <div class="two_ellipsis card_fos">
                      说明：{{ item.remark }}
                    </div>
                    <div>时间：{{ item.createTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 第三方知识库  -->
          <div class="ruleEditForm scrollbar" v-show="activeNav == 3">
            <div class="card-box">
              <div class="card_items card_list" v-if="partydata.length == 0">
                <span>为机器人添加知识库吧，让它可以更加智能～</span>
              </div>
              <div
                class="card_bases"
                :class="{ base_items: activeitem.indexOf(item.id) > -1 }"
                v-for="item in partydata"
                :key="item.id"
                @click="knowledge(item.id)"
              >
                <div class="card_item">
                  <div class="round-box">
                    <div
                      class="round"
                      :class="{ roundts: activeitem.indexOf(item.id) > -1 }"
                    ></div>
                  </div>
                  <div class="card_img">
                    <img :src="item.iconUrl" alt="img" />
                  </div>
                  <div class="card_fonts">
                    <div class="card_title">{{ item.name }}</div>
                    <div class="two_ellipsis card_fos">
                      说明：{{ item.remark }}
                    </div>
                    <div>时间：{{ item.createTime }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div slot="footer" class="dialog-footer">
          <div
            class="myBtn littleBtn myBtn_info"
            @click="dialogFormVisible = false"
          >
            取 消
          </div>
          <div
            class="myBtn littleBtn myBtn_blue"
            type="primary"
            @click="dialogFormVisible = false"
          >
            确 定
          </div>
          </div>-->
        </div>
        <div class="submit-box">
          <div class="create cancel" @click="knowledgebasfalse">取 消</div>
          <div class="create" @click="know">确 定</div>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "@/utils/importFile";
import {
  getrobotLibrary,
  getconfiguredList,
  addConfiguration,
  problemList,
  addquestion,
  getquestion,
  deleteQuestion,
  editquestion
} from "@/api/robotCenter";
export default {
  data() {
    return {
      num: 1,
      delivery: true,
      reply: false,
      dialogFormVisible: false,
      knowledgebase: false,
      addstatus: true,
      activeNav: 1,
      type: 1,
      value: "1231231",
      total: "",
      activebase: null,
      seriesId: "",
      id: "",
      spanIndex: [],
      problemListData: [],
      arr: [],
      arrquestion: [],
      problemForm: {
        domains: [],
        question: ""
      },
      answerForm: {
        domains: [],
        answer: ""
      },
      activeitem: [],
      configured: [],
      knowledgedata: [],
      officialdata: [],
      partydata: []
    };
  },
  mounted() {
    this.seriesId = localStorage.getItem("seriesId");
    this.getlists();
    this.getconfiguredLists();
  },
  methods: {
    dialogue() {
      this.$router.push({
        name: "chatRoom",
        params: {
          robotId: this.seriesId
        }
      });
    },
    // 新增问题按钮
    addquest() {
      this.arr = [];
      this.arrquestion = [];
      (this.id = ""),
        (this.problemForm.domains = [
          {
            key: "",
            value: ""
          }
        ]);
      this.problemForm.question = "";
      this.answerForm.domains = [
        {
          key: "",
          value: ""
        }
      ];
      this.addstatus = false;
    },
    // 查询知识库列表
    async getlists() {
      try {
        const res = await getrobotLibrary({
          pageNum: 1,
          pageSize: 999,
          robotId: this.seriesId,
          type: 1
        });
        if (res.code == 200) {
          this.knowledgedata = res.rows;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询官方知识库列表
    async getofficiallists() {
      try {
        const res = await getrobotLibrary({
          pageNum: 1,
          pageSize: 999,
          robotId: this.seriesId,
          type: 2
        });
        if (res.code == 200) {
          this.officialdata = res.rows;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询第三方知识库列表
    async getpartylists() {
      try {
        const res = await getrobotLibrary({
          pageNum: 1,
          pageSize: 999,
          robotId: this.seriesId,
          type: 3
        });
        if (res.code == 200) {
          this.partydata = res.rows;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询问题列表
    async getproblemList() {
      try {
        const res = await problemList({
          id: this.seriesId
        });
        if (res.code == 200) {
          this.problemListData = res.rows;
          this.total = res.total;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 查询已配知识库列表
    async getconfiguredLists() {
      try {
        const res = await getconfiguredList({
          pageNum: 1,
          pageSize: 999,
          robotId: this.seriesId
        });
        if (res.code == 200) {
          this.configured = res.rows;
        }
      } catch (error) {
        console.log(error);
      }
    },
    // 新增问题
    async getaddquestionLists() {
      var similarQuestion = this.arr.map(function(item) {
        return item;
      });
      var answer = this.arrquestion.map(function(item) {
        return item;
      });
      console.log(similarQuestion, answer, "this.total");
      if (this.total <= 9) {
        if (
          similarQuestion.length === 0 ||
          similarQuestion.includes("") ||
          answer.includes("") ||
          answer.length === 0
        ) {
          console.log("有空值");
          Message.error("请填写相似问题或者答案文本");
        } else {
          try {
            const res = await addquestion({
              robotId: this.seriesId,
              question: this.problemForm.question,
              similarQuestion: similarQuestion,
              answer: answer
            });
            if (res.code == 200) {
              Message.success("新增成功");
              this.addstatus = true;
              this.getproblemList();
            } else if (res.code == 500) {
              Message.error(res.msg);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        Message.error("最多新增十条记录");
      }
    },
    // 编辑问题
    async getquestionLists() {
      var similarQuestion = this.arr.map(function(item) {
        return item;
      });
      var answer = this.arrquestion.map(function(item) {
        return item;
      });
      console.log(this.total, "this.total");
      if (this.total <= 9) {
        try {
          const res = await editquestion({
            id: this.id,
            question: this.problemForm.question,
            similarQuestion: similarQuestion,
            answer: answer
          });
          if (res.code == 200) {
            Message.success("编辑成功");
            this.addstatus = true;
            this.getproblemList();
          } else if (res.code == 500) {
            Message.error(res.msg);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        Message.error("最多编辑十条记录");
      }
    },
    // 编辑
    handleClick(id) {
      this.addstatus = false;
      this.id = id;
      getquestion(id).then(res => {
        if (res.code == 200) {
          // this.problemForm.domains = res.data.similarQuestion
          var problem = res.data.similarQuestion;
          var arr = [];
          for (let index = 0; index < problem.length; index++) {
            var obj = {
              value: problem[index],
              key: index
            };
            arr.push(obj);
          }
          var answer = res.data.answer;
          var answerarr = [];
          for (let index = 0; index < answer.length; index++) {
            var obj = {
              value: answer[index],
              key: index
            };
            answerarr.push(obj);
          }
          this.problemForm.domains = arr;
          this.answerForm.domains = answerarr;
          this.problemForm.question = res.data.question;
          var arr1 = res.data.similarQuestion;
          var arr2 = res.data.answer;
          this.arr = [].concat(arr1);
          this.arrquestion = [].concat(arr2);
        }
      });
    },
    // 删除
    deleteClick(row) {
      deleteQuestion(row.id).then(response => {
        if (response.code === 200) {
          Message.success("删除成功");
          this.getproblemList();
        }
      });
    },
    setup() {
      this.getproblemList();
      this.dialogFormVisible = true;
      this.addstatus = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.problemListData);
          if (this.id == "") {
            this.getaddquestionLists();
          } else {
            this.getquestionLists();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置问题
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.arr = [];
    },
    // 重置答案
    resetanswerForm(formName) {
      this.$refs[formName].resetFields();
      this.arrquestion = [];
    },
    // 删除问题
    removeDomain(item) {
      var index = this.problemForm.domains.indexOf(item);
      console.log(index);
      if (index !== -1) {
        this.problemForm.domains.splice(index, 1);
        this.arr.splice(index, 1);
      }
    },
    // 删除答案
    removeAnswer(item) {
      var index = this.answerForm.domains.indexOf(item);
      console.log(index);
      if (index !== -1) {
        this.answerForm.domains.splice(index, 1);
        this.arrquestion.splice(index, 1);
      }
    },
    // 新增问题
    addDomain(e) {
      if (e <= 9) {
        this.problemForm.domains.push({
          value: "",
          key: Date.now()
        });
        this.arr.push("");
        console.log(this.arr);
      } else {
        Message.error("最多添加十个问题~");
      }
    },
    // 新增答案
    addanswer(e) {
      if (e <= 9) {
        this.answerForm.domains.push({
          value: "",
          key: Date.now()
        });
        this.arrquestion.push("");
      } else {
        Message.error("最多添加十个答案~");
      }
    },
    changeNav(ind) {
      this.activeNav = ind;
      this.type = ind;
      switch (ind) {
        case 1:
          this.getlists();
          break;
        case 2:
          this.getofficiallists();
          break;
        case 3:
          this.getpartylists();
          break;
        default:
          break;
      }
    },
    knowledge(i) {
      let arrIndex = this.activeitem.indexOf(i);
      // this.activebase = !this.activebase;
      if (arrIndex > -1) {
        this.spanIndex.splice(arrIndex, 1);
        this.activeitem.splice(arrIndex, 1);
      } else {
        this.spanIndex.push(i);
        this.activeitem.push(i);
      }
    },
    know() {
      console.log(this.activeitem, 54444);
      var obj = {
        libraryId: this.activeitem.length == 0 ? [-1] : this.activeitem,
        robotId: this.seriesId
      };
      addConfiguration(obj).then(res => {
        if (res.code == 200) {
          this.getconfiguredLists();
        }
      });
      this.knowledgebase = false;
    },
    // 知识库配种
    knowledgebasetrue() {
      this.knowledgebase = true;
      var id = this.configured.map(function(item) {
        return item.id;
      });
      this.activeitem = id;
      console.log(id);
    },
    //  取消按钮
    knowledgebasfalse() {
      this.knowledgebase = false;
      this.getconfiguredLists();
    }
  }
};
</script>
<style lang="less" scoped>
.create {
  width: 105px;
  height: 32px;
  line-height: 32px;
  background: #2d3291;
  color: #fff;
  margin-bottom: 20px;
  border-radius: 4px;
  cursor: pointer;
  text-align: center;
}
.placeholder {
  height: 60px;
}
.adpros {
  height: 710px;
}
.submit-box {
  display: flex;
  justify-content: flex-end;
  .cancel {
    background-color: #818181;
    margin-right: 20px;
  }
  .create {
    margin-bottom: 0;
  }
}
.edit {
  color: #2d3291;
  margin: 0 25px;
  font-weight: 400;
  font-size: 14px;
}
.delete {
  color: #ff4a00;
  font-weight: 400;
  margin: 0;
  font-size: 14px;
}
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
    width: 30%;
    height: 120px;
    margin-top: 10px;
    border-radius: 4px;
    margin-right: 10px;
    border: 2px solid #2d3291;
    display: flex;
    justify-content: center;
    align-items: center;
    .card_item {
      width: 80%;
      height: 80px;
      display: flex;
      .round-box {
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .round {
          width: 14px;
          height: 14px;
          border-radius: 12px;
          border: 1px solid #dcdfe6;
        }
      }
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
        color: #999;
        .card_title {
          font-weight: bold;
          color: #333;
          width: 220px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .card_fos {
          width: 220px;
        }
        div {
          line-height: 25px;
        }
      }
    }
  }
  .card_bases {
    width: 30%;
    height: 120px;
    margin-top: 10px;
    border-radius: 4px;
    margin-right: 10px;
    border: 2px solid #dcdfe6;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .card_item {
      width: 100%;
      height: 80px;
      display: flex;
      .round-box {
        width: 40px;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .round {
          width: 14px;
          height: 14px;
          // background: #2d3291;
          border-radius: 16px;
          border: 1px solid #dcdfe6;
        }
        .roundts {
          background: #2d3291;
        }
      }
      .card_img {
        width: 96px;
        height: 68px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .card_fonts {
        font-size: 14px;
        color: #333;
        .card_title {
          font-weight: bold;
          color: #999;
          width: 220px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          word-break: break-all;
        }
        .card_fos {
          width: 220px;
        }
        div {
          line-height: 25px;
        }
      }
    }
  }
  .base_items {
    border: 2px solid #2d3291;
    cursor: pointer;
  }
}
.card_list {
  background: #f0f2f5;
  border: 2px solid #f0f2f5 !important;
  color: #bfbfbf;
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
.answer_box {
  height: 475px;
  overflow: auto;
  position: relative;
}
.el-dialog {
  .basefont {
    font-weight: bold;
    color: #333333;
    font-size: 14px;
    margin-bottom: 22px;
  }
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
      cursor: pointer;
    }
    .active {
      background-color: #fff;
      color: rgba(45, 50, 145, 1);
    }
  }
  .diaContainer {
    border-radius: 2px;
    height: 410px;
  }
}
</style>

<style lang="less">
.serve {
  text-align: right;
  .el-button {
    background: #2d3291;
    border: 1px solid #2d3291;
    width: 102px;
  }
}
.digital-box {
  .el-switch.is-checked .el-switch__core {
    border-color: #2d3291;
    background-color: #2d3291;
  }
}
.el-dialog__body {
  padding: 20px;
}
.el-form-item__content {
  text-align: left;
}
</style>
