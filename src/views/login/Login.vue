<template>
  <div class="loginBg">
    <div class="login-form-wrappe">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>登录</span>
          </div>
        </template>
        <el-form
          ref="ruleForm"
          size="large"
          :model="temp"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item label="账号" prop="username">
            <el-input
              prefix-icon="User"
              v-model="temp.username"
              placeholder="请输入账号"
              @keyup.enter.native="submitForm(ruleForm)"
            />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              prefix-icon="Lock"
              type="password"
              show-password
              placeholder="请输入密码"
              v-model="temp.password"
              @keyup.enter.native="submitForm(ruleForm)"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click.enter="submitForm(ruleForm)" type="primary">
              登 录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>


<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"; //导入路由
import api from "@/api/loginApi";
import md5 from "md5";
import { menuData } from "@/jslib/menuData.js";
import { keyMd5 } from "@/jslib/common.js";
import { ElLoading, ElMessage } from "element-plus";
const router = useRouter();
const temp = reactive({
  username: "",
  password: "",
}); //<el-icon><UserFilled /></el-icon>
const rules = reactive({
  username: [
    {
      required: true,
      message: "请输入账号",
      trigger: "blur",
    },
    // {
    //   min: 3,
    //   max: 18,
    //   message: "长度为3-18位",
    //   trigger: "blur",
    // },
  ],
  password: [
    {
      required: true,
      message: "请输入密码",
      trigger: "blur",
    },
    // {
    //   min: 3,
    //   max: 18,
    //   message: "长度为3-18位",
    //   trigger: "blur",
    // },
  ],
});
const ruleForm = ref(null);
const submitForm = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      const loading = ElLoading.service({
        lock: true,
        text: "正在登录中……",
        background: "rgba(0, 0, 0, 0.7)",
        fullscreen: true,
      });
      let { username, password } = temp;
      let pwdMd5 = md5(`${password}&key=${keyMd5}`);
      //console.log("pwdmd5", pwdMd5);
      //console.log(username, password);
      let params = {
        username: username,
        password: pwdMd5,
      };
      // api.login(params).then(
      //   (res) => {
      //     console.log("Login---res:", res);
      //     loading.close();
      //     if (res) {
      //       let curUserInfo = res.userInfo;
      //       let curFuncList = res.funcInfo;
      //       let curDeptList = res.deptList;
      //       let curPostList = res.postList;
      //       if (curUserInfo && curFuncList.length > 0) {
      //         sessionStorage.setItem(
      //           "curUserInfo",
      //           JSON.stringify(curUserInfo)
      //         );
      //         sessionStorage.setItem(
      //           "curFuncList",
      //           JSON.stringify(curFuncList)
      //         );
      //         sessionStorage.setItem(
      //           "curDeptList",
      //           JSON.stringify(curDeptList)
      //         );
      //         sessionStorage.setItem(
      //           "curPostList",
      //           JSON.stringify(curPostList)
      //         );
      //         //跳转
      //         router.push("/main");
      //       }
      //     } else {
      //       //console.log("用户名和密码不正确");
      //       ElMessage({
      //         showClose: true,
      //         message: "用户名和密码不正确",
      //         type: "error",
      //       });
      //     }
      //   },
      //   (x) => {
      //     //console.log("xx", x);
      //     loading.close();
      //     ElMessage({
      //       showClose: true,
      //       message: "远程服务器异常，请联系管理员",
      //       type: "error",
      //     });
      //   }
      // );

      
      var res = menuData;
      if (res) {
        let curUserInfo = res.userInfo;
        let curFuncList = res.funcInfo;
        let curDeptList = res.deptList;
        let curPostList = res.postList;
        if (curUserInfo && curFuncList.length > 0) {
          sessionStorage.setItem("curUserInfo", JSON.stringify(curUserInfo));
          sessionStorage.setItem("curFuncList", JSON.stringify(curFuncList));
          sessionStorage.setItem("curDeptList", JSON.stringify(curDeptList));
          sessionStorage.setItem("curPostList", JSON.stringify(curPostList));
          //跳转
          router.push("/main");
        }
      } else {
        //console.log("用户名和密码不正确");
        ElMessage({
          showClose: true,
          message: "用户名和密码不正确",
          type: "error",
        });
      }
    } else {
      //console.log("error submit!!");
      return false;
    }
  });
};
</script>
<style  scoped>
.loginBg {
  width: 100%;
  height: 100%;
  background: url(@/assets/img/bg001.jpg) repeat;
}

.login-form-wrappe {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 560px;
  overflow: hidden;
  background: rgb(255, 255, 255);
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 4px;
}

.login-form-wrappe .box-card {
  width: 100%;
}

.login-form-wrappe .card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-form-wrappe .card-header span {
  position: relative;
  font-size: 32px;
  font-weight: 600;
}

.login-form-wrappe .card-header span::before {
  content: " ";
  position: absolute;
  background-color: rgb(2, 87, 255);
  width: 4px;
  height: 26px;
  top: 50%;
  left: -10px;
  transform: translateY(-40%);
}

.login-form-wrappe .el-form-item {
  margin-top: 25px;
}

.login-form-wrappe .el-form-item:nth-child(2) {
  margin-bottom: 35px;
}

.login-form-wrappe .el-form-item :deep(.el-form-item__label) {
  font-size: 18px;
  justify-content: center;
}

.login-form-wrappe .el-form-item .el-input {
  min-height: 35px;
  width: 85%;
  font-size: 18px;
  /* margin-bottom: 30px; */
}

.login-form-wrappe .el-form-item :deep(.el-input__wrapper) {
  padding: 1px 3px;
}

.login-form-wrappe .el-form-item :deep(.el-input__prefix) {
  font-size: 22px;
}

.login-form-wrappe .el-form-item .el-button {
  min-height: 35px;
  width: 85%;
  margin-bottom: 30px;
  font-size: 18px;
}
</style>