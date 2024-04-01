<template>
  <div id="avatarImg" style="position: absolute; width: 178px; height: 178px">
    <el-upload
      class="avatar-uploader"
      :action="actionAvatarUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :disabled="formDisabled"
      :data="uploadData"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="avatarLinkUrl" :src="avatarLinkUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"> <Plus />照片</el-icon>
    </el-upload>
  </div>
  <el-row style="margin-left: 180px">
    <el-col :span="24">
      <el-form
        label-width="100px"
        size="large"
        :rules="rules"
        :model="obj.data"
        ref="ruleForm"
        :disabled="formDisabled"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="obj.data.userName" placeholder="请输入姓名" />
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-form-item label="账号" prop="userLoginName">
              <el-input
                v-model="obj.data.userLoginName"
                placeholder="请输入账号"
              />
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-form-item label="性别">
              <!-- <el-select v-model="obj.sex" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in sexArray" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-radio-group v-model="obj.data.sex" style="width: 100%">
                <el-radio
                  v-for="sex in sexInitData"
                  :key="sex.name"
                  :label="sex.value"
                  size="large"
                  border
                  >{{ sex.name }}</el-radio
                >
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="密码" prop="originalPwd">
              <el-input
                v-model="obj.data.originalPwd"
                placeholder="请输入密码"
                show-password
              />
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="6">
            <!-- < el - form - item label =" 确认密码">
                        <el-input v-model=" obj.originalPwd " />
                        </> -->
            <el-form-item label="出生日期" prop="birthday">
              <el-date-picker
                id="dateBirthday"
                style="width: 100%"
                v-model="obj.data.birthday"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="6">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="obj.data.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="工号" prop="jobNumber">
              <el-input v-model="obj.data.jobNumber" placeholder="请输入工号" />
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="6">
            <el-form-item label="固定电话">
              <el-input v-model="obj.data.phone" placeholder="请输入固定电话" />
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="6">
            <el-form-item label="用户排序值" prop="orderNum">
              <el-input-number
                placeholder="请输入排序值"
                controls-position="right"
                style="width: 100%"
                v-model="obj.data.orderNum"
                :min="0"
              >
              </el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="手机号">
              <el-input
                v-model="obj.data.mobilePhone"
                placeholder="请输入手机号"
              />
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="14">
            <el-form-item label="家庭地址">
              <el-input
                v-model="obj.data.address"
                placeholder="请输入家庭地址"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="用户状态">
              <!-- <el-select v-model="obj.status" placeholder="请选择" style="width: 100%">
                <el-option v-for="item in statusArray" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select> -->
              <el-radio-group v-model="obj.data.status" style="width: 100%">
                <el-radio
                  v-for="status in statusInitData"
                  :key="status.name"
                  :label="status.value"
                  size="large"
                  border
                  >{{ status.name }}</el-radio
                >
                <!-- <el-radio label="0" size="large" border>无效</el-radio> -->
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :offset="2" :span="14">
            <el-form-item label="所属部门">
              <el-cascader
                class="userInfo"
                separator=" > "
                size="large"
                placeholder="请选择部门"
                v-model="obj.data.parentIdTreeArrayDept"
                :options="optionsDept"
                :props="props1"
                style="width: 100%"
                :show-all-levels="false"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="入职日期">
              <el-date-picker
                id="dateEntryDate"
                style="width: 100%"
                v-model="obj.data.strEntryDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="14">
            <el-form-item label="所属职位">
              <el-cascader
                class="userInfo"
                placeholder="请选择职位"
                size="large"
                separator=" > "
                v-model="obj.data.parentIdTreeArrayPost"
                :options="optionsPost"
                :props="props1"
                style="width: 100%"
                :show-all-levels="false"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="离职日期">
              <el-date-picker
                id="dateDepartDate"
                style="width: 100%"
                v-model="obj.data.strDepartDate"
                type="date"
                value-format="YYYY-MM-DD"
                placeholder="请选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :offset="2" :span="14">
            <el-form-item label="系统所属角色">
              <el-cascader
                class="userInfo"
                separator=" > "
                size="large"
                placeholder="请选择角色"
                v-model="obj.data.parentIdTreeArrayRole"
                :options="optionsRole"
                :props="props1"
                style="width: 100%"
                :show-all-levels="false"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-col>
  </el-row>
  <!-- <el-divider /> -->
  <el-row>
    <el-col>
      <el-divider>
        <el-button
          size="large"
          v-show="!formDisabled"
          type="primary"
          @click="save(ruleForm)"
          >保存</el-button
        >
        <el-button size="large" @click="back()">返回</el-button>
      </el-divider>
    </el-col>
  </el-row>
</template>
  
<script  setup>
import { useRouter, useRoute } from "vue-router"; //导入路由
import { reactive, ref, onMounted, computed } from "vue";
import { baseUrl } from "@/api/baseUrl";
// import { ElLoading } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import {
  sexInitData,
  statusInitData,
  ElMsg,
  CusElLoading,
} from "@/jslib/common";
import api from "@/api/sysApi";
import orgApi from "@/api/orgApi";
const router = useRouter();
const route = useRoute();
//let queryObj=ref({});
let actionAvatarUrl = `${baseUrl}/File/UploadFile`;
const obj = reactive({
  data: {
    id: "",
    userLoginName: "",
    userName: "",
    jobNumber: "",
    password: "",
    originalPwd: "",
    mobilePhone: "",
    phone: "",
    email: "",
    address: "",
    sex: sexInitData[0].value,
    birthday: "",
    status: statusInitData[0].value,
    orderNum: 10,
    avatarSourceName: "",
    avatarFullUrl: "",
    avatarLinkUrl: "",
    parentIdTreeArrayDept: [], //[['1', '2'], ['1', '4', '6']],
    parentIdTreeArrayPost: [],
    parentIdTreeArrayRole: [],
    deptIds: "",
    postIds: "",
    roleIds: "",
    strEntryDate: "",
    strDepartDate: "",
  },
});
let formDisabled = ref(false);

//校验规则
//自定义验证密码
// const checkPassword = (rule, value, callback) => {
//   if (!value) {
//     return callback(new Error('请输入确认密码'))
//   }
//   if (value != userForm.value.password) {
//     return callback(new Error('两次密码不一致'))
//   }
//   callback();
// }

const validateUserLoginName = (rule, value, callback) => {
  if (value !== "") {
    let params = {
      name: value,
      type: 1,
      id: obj.data.id,
    };
    api.validateSysUser(params).then(async (res) => {
      //console.log("validate api",res)
      if (res) {
        await callback();
      } else {
        await callback(new Error("账号已存在"));
      }
    });
  } else {
    callback(new Error("请输入账号"));
  }
};
// const checkMobilePhone = (rule, value, callback) => {
//   if (!/^1[23456789]\d{9}$/.test(value)) {
//     callback(new Error("手机号必须为长度11位的数字"));
//   } else {
//     callback();
//   }
// };

//验证邮箱
const checkEmail = (rule, value, callback) => {
  //console.log("checkEmail", value);
  if (value) {
    //console.log("checkEmail……", value);
    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!reg.test(value)) {
      callback(new Error("邮箱地址格式不对"));
    } else {
      callback();
    }
  } else {
    callback();
  }
};

let rules = {
  userLoginName: [
    { required: true, message: "请输入账号", trigger: "blur" },
    { validator: validateUserLoginName, trigger: "blur" },
    // {
    //   min: 3,
    //   //max: 18,
    //   message: "长度在3个字符以上",
    //   trigger: "blur",
    // },
  ],
  userName: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    // {
    //   min: 3,
    //   //max: 18,
    //   message: "长度在3个字符以上",
    //   trigger: "blur",
    // },
  ],
  originalPwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    // {
    //   min: 6,
    //   //max: 18,
    //   message: "长度在6个字符以上",
    //   trigger: "blur",
    // },
  ],
  birthday: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
  jobNumber: [{ required: true, message: "请输入工号", trigger: "blur" }],
  orderNum: [{ required: true, message: "请输入排序值", trigger: "blur" }],
  email: [{ validator: checkEmail, trigger: "blur" }],
};
let avatarLinkUrl = ref("");

const uploadData = computed(() => {
  return {
    type: "avatarImage",
  };
});
//文件上传成功后
const handleAvatarSuccess = (res) => {
  if (res.isSuccess) {
    obj.data.avatarSourceName = res.data.sourceFileName;
    obj.data.avatarFullUrl = res.data.fullFilePath;
    if (res.data.linkFilePath) {
      avatarLinkUrl.value = `${baseUrl}/${res.data.linkFilePath}`;
    }
    obj.data.avatarLinkUrl = res.data.linkFilePath;
  } else {
    ElMsg(res.message, "error");
  }
  //console.log("obj.avatarFullUrl---1", obj.avatarFullUrl);
};
//文件上传前触发
const beforeAvatarUpload = () => {};

const back = () => {
  router.push("/userlist");
};
const ruleForm = ref(null);
const save = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      obj.data.deptIds = "";
      obj.data.parentIdTreeArrayDept?.forEach((o) => {
        obj.data.deptIds += o[o.length - 1] + ",";
      });
      obj.data.postIds = "";
      obj.data.parentIdTreeArrayPost?.forEach((o) => {
        obj.data.postIds += o[o.length - 1] + ",";
      });
      obj.data.roleIds = obj.data.parentIdTreeArrayRole.join();
      console.log("obj.data", obj.data);
      let cusLoading = CusElLoading();
      api.saveSysUser(obj.data).then((res) => {
        cusLoading.close();
        if (res.isSuccess) {
          ElMsg("保存成功");
          if (obj.id == "") {
            initData();
          }
        } else {
          res?.data.forEach((element) => {
            ElMsg(element, "error");
          });
        }
      });
    } else {
      return false;
    }
  });
};
const initData = () => {
  obj.data = {
    id: "",
    userLoginName: "",
    userName: "",
    password: "",
    jobNumber: "",
    originalPwd: "",
    mobilePhone: "",
    phone: "",
    email: "",
    address: "",
    sex: sexInitData[0].value,
    birthday: "",
    status: statusInitData[0].value,
    orderNum: 10,
    avatarSourceName: "",
    avatarFullUrl: "",
    avatarLinkUrl: "",
    parentIdTreeArrayDept: [],
    parentIdTreeArrayPost: [],
    parentIdTreeArrayRole: [],
    deptIds: "",
    postIds: "",
    roleIds: "",
    strEntryDate: "",
    strDepartDate: "",
  };
};
const optionsDept = ref([]);
const optionsPost = ref([]);
const optionsRole = ref([]);
const props1 = {
  checkStrictly: true,
  multiple: true,
  expandTrigger: "hover",
};
onMounted(() => {
  orgApi.getDeptForTree().then((res) => {
    //console.log("tree res:", res);
    optionsDept.value = res;
  });
  orgApi.getPostForTree().then((res) => {
    //console.log("tree res:", res);
    optionsPost.value = res;
  });

  api.getRoleForTree().then((res) => {
    //console.log("tree res:", res);
    optionsRole.value = res;
  });

  let id = route.params?.id;
  if (id) {
    let cusLoading = CusElLoading("数据加载中……");
    obj.id = route.params.id;
    let params = {
      id: id,
    };
    api.getSysUser(params).then((res) => {
      obj.data = res;
      if (res.avatarLinkUrl) {
        avatarLinkUrl.value = `${baseUrl}/${res.avatarLinkUrl}`;
      }
      let deptIds = obj.data.deptIds;
      let postIds = obj.data.postIds;
      let roleIds = obj.data.roleIds;
      obj.data.deptIds = "";
      obj.data.postIds = "";
      obj.data.roleIds = "";
      obj.data.parentIdTreeArrayDept = [];
      obj.data.parentIdTreeArrayPost = [];
      obj.data.parentIdTreeArrayRole = [];
      if (deptIds && deptIds != "") {
        var deptArrays = deptIds.split(";");
        deptArrays.forEach((ele) => {
          let dept2Array = ele.split(",");
          obj.data.parentIdTreeArrayDept.push(dept2Array);
        });

        console.log(
          "obj.data.parentIdTreeArrayDept",
          obj.data.parentIdTreeArrayDept
        );
      }
      if (postIds && postIds != "") {
        var postArrays = postIds.split(";");
        postArrays.forEach((ele) => {
          let post2Array = ele.split(",");
          obj.data.parentIdTreeArrayPost.push(post2Array);
        });
      }
      if (roleIds && roleIds != "") {
        obj.data.parentIdTreeArrayRole = roleIds.split(";");
      }
      cusLoading.close();
    });

    if (route.name.indexOf("usersee") != -1) {
      formDisabled.value = true;
    }
  }
});
</script>
<style  scoped>
#avatarImg .avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

#avatarImg .avatar-uploader :deep(.el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

#avatarImg .avatar-uploader :deep(.el-upload:hover) {
  border-color: var(--el-color-primary);
}

#avatarImg :deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.userInfo .el-tag.el-tag--info {
  color: #409eff;
}
</style>