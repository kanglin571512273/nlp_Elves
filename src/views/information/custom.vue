<template>
  <div>
    <el-dialog title="个性化配置" width="80%" :visible.sync="dialogFormVisible">
      <div v-show="addstatus">
        <div class="adproblem" @click="addstatus = false">新增</div>
        <el-card class="adpros">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column
              prop="serial"
              label="序号"
              width="80"
            ></el-table-column>
            <el-table-column prop="name" label="问题"></el-table-column>
            <el-table-column prop="id" label="答案"></el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="180"
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="210">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  class="edit"
                  >编辑</el-button
                >
                <el-button type="text" class="delete">删除</el-button>
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
                :prop="'domains.' + index + '.value'"
                :rules="{
                  required: true,
                  message: '问题不能为空',
                  trigger: 'blur'
                }"
              >
                <div class="input_box">
                  <el-input v-model="domain.value"></el-input>
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
              <el-form-item
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
              </el-form-item>
              <el-form-item
                v-for="(domain, index) in answerForm.domains"
                :label="'相似答案' + (index + 1)"
                :key="domain.key"
                :prop="'domains.' + index + '.value'"
                :rules="{
                  required: true,
                  message: '答案不能为空',
                  trigger: 'blur'
                }"
              >
                <div class="input_box">
                  <el-input v-model="domain.value"></el-input>
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
    <div class="digital-box">
      <div class="title">
        对话设置
        <i class="el-icon-question" style="color:#2D3291;"></i>
      </div>
      <div class="types">
        <span class="sapanel">类型：</span>
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
        <i class="el-icon-question" style="color:#2D3291;"></i>
      </div>
      <div>
        <span>推荐反问状态：</span>
        <el-switch v-model="delivery"></el-switch>
      </div>
    </div>
    <div class="digital-box">
      <div class="title">知识库设置</div>
      <div class="configuration" @click="knowledgebase = true">知识库配置</div>
      <div class="card-box">
        <div class="card_items card_list">
          <span>为机器人添加知识库吧，让它可以更加智能～</span>
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
        <div class="card_items" v-for="item in knowledgedata" :key="item.id">
          <div class="card_item">
            <div class="card_img">
              <img :src="item.img" alt="img" />
            </div>
            <div class="card_fonts">
              <div class="card_title">{{ item.title }}</div>
              <div>说明：{{ item.description }}</div>
              <div>时间：{{ item.time }}</div>
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
              <div class="card_items card_list">
                <span>为机器人添加知识库吧，让它可以更加智能～</span>
              </div>
              <div
                class="card_bases"
                :class="{ base_items: spanIndex.indexOf(item.id) > -1 }"
                v-for="item in knowledgedata"
                :key="item.id"
                @click="knowledge(item.id)"
              >
                <div class="card_item">
                  <div class="round-box">
                    <div
                      class="round"
                      :class="{ roundts: spanIndex.indexOf(item.id) > -1 }"
                    ></div>
                  </div>
                  <div class="card_img">
                    <img :src="item.img" alt="img" />
                  </div>
                  <div class="card_fonts">
                    <div class="card_title">{{ item.title }}</div>
                    <div>说明：{{ item.description }}</div>
                    <div>时间：{{ item.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 官方知识库  -->
          <div v-show="activeNav == 2">
            <div class="card-box">
              <div class="card_items card_list">
                <span>为机器人添加知识库吧，让它可以更加智能～</span>
              </div>
              <div
                class="card_bases"
                :class="{ base_items: spanIndex.indexOf(item.id) > -1 }"
                v-for="item in officialdata"
                :key="item.id"
                @click="knowledge(item.id)"
              >
                <div class="card_item">
                  <div class="round-box">
                    <div
                      class="round"
                      :class="{ roundts: spanIndex.indexOf(item.id) > -1 }"
                    ></div>
                  </div>
                  <div class="card_img">
                    <img :src="item.img" alt="img" />
                  </div>
                  <div class="card_fonts">
                    <div class="card_title">{{ item.title }}</div>
                    <div>说明：{{ item.description }}</div>
                    <div>时间：{{ item.time }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 第三方知识库  -->
          <div class="ruleEditForm scrollbar" v-show="activeNav == 3">
            <div class="card-box">
              <div class="card_items card_list">
                <span>为机器人添加知识库吧，让它可以更加智能～</span>
              </div>
              <div
                class="card_bases"
                :class="{ base_items: spanIndex.indexOf(item.id) > -1 }"
                v-for="item in partydata"
                :key="item.id"
                @click="knowledge(item.id)"
              >
                <div class="card_item">
                  <div class="round-box">
                    <div
                      class="round"
                      :class="{ roundts: spanIndex.indexOf(item.id) > -1 }"
                    ></div>
                  </div>
                  <div class="card_img">
                    <img :src="item.img" alt="img" />
                  </div>
                  <div class="card_fonts">
                    <div class="card_title">{{ item.title }}</div>
                    <div>说明：{{ item.description }}</div>
                    <div>时间：{{ item.time }}</div>
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
          <div class="create cancel" @click="knowledgebase = false">取 消</div>
          <div class="create" @click="know">确 定</div>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "@/utils/importFile";
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
      activebase: null,
      spanIndex: [],
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
      },
      knowledgedata: [
        {
          id: 1,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
        },
        {
          id: 2,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/10/23/17/52/fox-5679446__340.png"
        },
        {
          id: 3,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2019/12/11/01/51/skating-4687221__340.png"
        },
        {
          id: 4,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/02/17/15/05/market-4856748__340.jpg"
        }
      ],
      officialdata: [
        {
          id: 1,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
        },
        {
          id: 2,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/11/02/13/15/reindeer-5706627__340.png"
        },
        {
          id: 3,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
        },
        {
          id: 4,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/09/04/20/09/cartoon-5544856__340.jpg"
        }
      ],
      partydata: [
        {
          id: 1,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/05/04/23/06/plant-5131048__340.jpg"
        },
        {
          id: 2,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/06/26/00/25/summer-5341326__340.jpg"
        },
        {
          id: 3,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/05/20/03/50/gears-5193383__340.png"
        },
        {
          id: 4,
          title: "农行知识库",
          description: "理财知识库",
          time: "2021-01-13 12:12:12",
          img:
            "https://cdn.pixabay.com/photo/2020/10/04/09/27/halloween-5625737__340.png"
        }
      ]
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
    // 重置问题
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 重置答案
    resetanswerForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 删除问题
    removeDomain(item) {
      var index = this.problemForm.domains.indexOf(item);
      if (index !== -1) {
        this.problemForm.domains.splice(index, 1);
      }
    },
    // 删除答案
    removeAnswer(item) {
      var index = this.answerForm.domains.indexOf(item);
      if (index !== -1) {
        this.answerForm.domains.splice(index, 1);
      }
    },
    // 新增问题
    addDomain(e) {
      if (e <= 9) {
        this.problemForm.domains.push({
          value: "",
          key: Date.now()
        });
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
      } else {
        Message.error("最多添加十个答案~");
      }
    },
    changeNav(ind) {
      this.activeNav = ind;
    },
    knowledge(i) {
      let arrIndex = this.spanIndex.indexOf(i);
      // this.activebase = !this.activebase;
      if (arrIndex > -1) {
        this.spanIndex.splice(arrIndex, 1);
      } else {
        this.spanIndex.push(i);
      }
    },
    know() {
      this.knowledgebase = false;
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
  height: 475px;
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
        }
        div {
          line-height: 28px;
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
        }
        div {
          line-height: 28px;
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
