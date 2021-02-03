<template>
  <div class="login-box">
    <div class="bg-class">
      <el-card class="card-class">
        <div class="bgcenter">
          <div class="bg-font"><div>Welcome</div></div>
          <div class="bg-form">
            <el-form
              label-position="top"
              label-width="80px"
              :model="formLabelAlign"
              :rules="rules"
              ref="formLabelAlign"
            >
              <el-form-item label="用户名：" prop="username">
                <el-input
                  clearable
                  v-model="formLabelAlign.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码：" prop="password">
                <el-input
                  placeholder="请输入密码"
                  v-model="formLabelAlign.password"
                  show-password
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <button class="bg-login" @click="login('formLabelAlign')">
            登录
          </button>
        </div></el-card
      >
    </div>
  </div>
</template>

<script>
import { Message } from "@/utils/importFile";
import { postlogin } from "@/api/robotCenter";
export default {
  data() {
    return {
      formLabelAlign: {
        username: "admin",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "change" }]
      }
    };
  },

  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          postlogin(this.formLabelAlign).then(res => {
            if (res.code == 200) {
              localStorage.setItem("token", res.token);
              this.$router.push(`/`);
              Message.success("登录成功~");
            } else if (res.code == 500) {
              Message.error(res.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url(../assets/images/background.png) no-repeat;
  background-size: cover;
  .bg-class {
    width: 50%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    .card-class {
      width: 520px;
      height: 700px;
    }
    .bgcenter {
      width: 100%;
      height: 650px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      .bg-form {
        width: 350px;
      }
      .bg-font {
        width: 100%;
        color: #2d3291;
        font-weight: bold;
        font-size: 36px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.bg-login {
  width: 350px;
  height: 55px;
  line-height: 55px;
  margin-top: 30px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  background: #2d3291;
  box-shadow: 0px 0px 5px 0px rgba(15, 33, 108, 0.38);
  border-radius: 4px;
  cursor: pointer;
  border: none;
}
button:focus {
  border: 0 none;
  outline: none;
}
</style>

<style lang="less">
.bg-form {
  .el-form-item__label {
    width: 100%;
    font-weight: bold;
  }
  .el-form-item__label:before {
    display: none;
  }
}
</style>
