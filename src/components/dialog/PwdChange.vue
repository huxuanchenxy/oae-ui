<template>
  <el-dialog
    :model-value="pwdChangeDialogVisible"
    :append-to-body="true"
    :before-close="handleClose"
    title="修改密码"
    width="30%"
  >
    <!-- 
      -->
    <el-form
      style="padding: 0 10px"
      :model="dataForm"
      :rules="dataRule"
      ref="dataFormRef"
      label-width="110px"
      label-position="left"
    >
      <el-form-item label="账号" prop="userName">
        {{ curUserInfo.userLoginName }}
      </el-form-item>
      <el-form-item label="旧密码" prop="password">
        <el-input
          show-password
          v-model="dataForm.password"
          type="password"
          placeholder="请输入旧密码"
        />
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input
          show-password
          v-model="dataForm.newPassword"
          type="password"
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="确认新密码" prop="newPassword2">
        <el-input
          show-password
          v-model="dataForm.newPassword2"
          type="password"
          placeholder="请再次输入新密码"
        />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel" class="bluePrimary">取消</el-button>
      <el-button type="primary" @click="submit(dataFormRef)">确定</el-button>
    </span>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMsg, CusElLoading } from "@/jslib/common";
import api from "@/api/sysApi";
//从父组件接收传过来的值
defineProps(["pwdChangeDialogVisible"]);
//更新子组件的值回传给父组件
const emits = defineEmits(["update:pwdChangeDialogVisible"]);
const handleClose = () => {
  //console.log("1");
  init();
  emits("update:pwdChangeDialogVisible", false);
};

const cancel = () => {
  init();
  emits("update:pwdChangeDialogVisible", false);
};

const init = () => {
  dataForm.value.password = "";
  dataForm.value.newPassword = "";
  dataForm.value.newPassword2 = "";
};
const dataFormRef = ref(null);
const submit = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      let params = {
        oripwd: dataForm.value.newPassword,
        id: curUserInfo.value.userId,
      };
      let cusLoading = CusElLoading();
      api.updatePwd(params).then(async (res) => {
        init();
        if (res > 0) {
          ElMsg("密码修改成功");
        } else {
          ElMsg("密码修改错误");
        }
        cusLoading.close();
      });
    }
  });
};

const dataForm = ref({
  username: "",
  password: "",
  newPassword: "",
  newPassword2: "",
});

const curUserInfo = ref({
  userLoginName: "",
  userName: "",
  userId: "",
});

// let validate = (rule, value, callback) => {
//   let reg = new RegExp(
//     "^[a-zA-Z](?![0-9]+$)(?![^0-9]+$)(?![a-zA-Z]+$)(?![a-zA-Z0-9]+$)[a-zA-Z0-9\\S]{7,16}$"
//   );
//   //console.log(reg.test(value));
//   if (!reg.test(value)) {
//     reg.lastIndex = 0;
//     callback(
//       new Error(
//         "密码长度最少8位，必须由字母数字和特殊字符组合,且必须由字母开头"
//       )
//     );
//   } else {
//     reg.lastIndex = 0;
//     callback();
//   }
// };

let checkTwoPwd = (rule, value, callback) => {
  //console.log("rule:::", rule);
  if (value != "") {
    if (
      rule.field == "newPassword" &&
      dataForm.value.newPassword2 != "" &&
      dataForm.value.newPassword2 != value
    ) {
      callback(new Error("新密码2次输入不一致,请重新输入"));
    } else if (
      rule.field == "newPassword2" &&
      dataForm.value.newPassword != "" &&
      dataForm.value.newPassword != value
    ) {
      callback(new Error("新密码2次输入不一致,请重新输入"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

const validateYpwd = (rule, value, callback) => {
  if (value !== "") {
    let params = {
      oripwd: value,
      id: curUserInfo.value.userId,
    };
    api.validatePwd(params).then(async (res) => {
      //console.log("validate api", res);
      if (res == 1) {
        await callback();
      } else {
        await callback(new Error("原密码输入不正确"));
      }
    });
  } else {
    callback(new Error("请输入账号"));
  }
};

let dataRule = {
  //   newPassword: [
  //     {
  //       validator: validate,
  //       trigger: "blur",
  //     },
  //   ],validateYpwd
  password: [
    { required: true, message: "请输入旧密码", trigger: "blur" },
    { validator: validateYpwd, trigger: "blur" },
  ],
  newPassword: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    // { validator: checkTwoPwd, trigger: "blur" },
  ],
  newPassword2: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: checkTwoPwd, trigger: "blur" },
  ],
};
onMounted(async () => {
  curUserInfo.value = JSON.parse(sessionStorage.getItem("curUserInfo"));
});
</script>

<style lang="scss" scoped></style>