<template>
    <div style="position: absolute; width: 178px; height: 178px">
        <el-upload class="avatar-uploader" :action="actionAvatarUrl" :show-file-list="false"
            :on-success="handleAvatarSuccess" :disabled="formDisabled" :before-upload="beforeAvatarUpload">
            <img v-if="avatarLinkUrl" :src="avatarLinkUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />照片
            </el-icon>
        </el-upload>
    </div>
    <el-row style="margin-left: 180px">
        <el-col :span="24">
            <el-form label-width="100px" size="large" :rules="rules" :model="obj.data" ref="ruleForm"
                :disabled="formDisabled">
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="账号" prop="userLoginName">
                            <el-input v-model="obj.data.userLoginName" placeholder="请输入账号" />
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="6">
                        <el-form-item label="姓名" prop="userName">
                            <el-input v-model="obj.data.userName" placeholder="请输入姓名" />
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="6">
                        <el-form-item label="性别" prop="sex">
                            <!-- <el-select v-model="obj.sex" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in sexArray" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                            <el-radio-group v-model="obj.data.sex" style="width: 100%">
                                <el-radio v-for="sex in sexInitData" :key="sex.name" :label="sex.value" size="large"
                                    border>{{ sex.name
                                    }}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item label="密码" prop="password">
                            <el-input v-model="obj.data.password" placeholder="请输入密码" show-password />
                        </el-form-item>
                    </el-col>

                    <el-col :offset="2" :span="6">
                        <!-- < el - form - item label =" 确认密码">
                          <el-input v-model=" obj.originalPwd " />
                          </> -->
                        <el-form-item label="出生日期" prop="birthday">
                            <el-date-picker id="dateBirthday" style="width: 100%" v-model="obj.data.birthday" type="date"
                                value-format="YYYY-MM-DD" placeholder="请选择日期">
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
                    <el-col :span="7">
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
                            <el-input-number placeholder="请输入排序值" controls-position="right" style="width: 100%"
                                v-model="obj.data.orderNum" :min="0">
                            </el-input-number>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="手机号">
                            <el-input v-model="obj.data.mobilePhone" placeholder="请输入手机号" />
                        </el-form-item>
                    </el-col>
                    <el-col :offset="2" :span="14">
                        <el-form-item label="家庭地址">
                            <el-input v-model="obj.data.address" placeholder="请输入家庭地址" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="7">
                        <el-form-item label="用户状态" prop="status">
                            <!-- <el-select v-model="obj.status" placeholder="请选择" style="width: 100%">
                  <el-option v-for="item in statusArray" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select> -->
                            <el-radio-group v-model="obj.data.status" style="width: 100%">
                                <el-radio v-for="status in statusInitData" :key="status.name" :label="status.value"
                                    size="large" border>{{
                                        status.name }}</el-radio>
                                <!-- <el-radio label="0" size="large" border>无效</el-radio> -->
                            </el-radio-group>
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
                <el-button size="large" v-show="!formDisabled" type="primary" @click="save(ruleForm)">保存</el-button>
                <el-button size="large" @click="back()">返回</el-button>
            </el-divider>
        </el-col>
    </el-row>
</template>
    
<script  setup>
import { useRouter, useRoute } from "vue-router"; //导入路由
import { reactive, ref, onMounted } from "vue";
import { baseUrl } from "@/api/baseUrl";
import { ElLoading } from "element-plus";
import { sexInitData, statusInitData, ElMsg } from "@/jslib/common";
import api from "@/api/sysApi";
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

//验证邮箱
const checkEmail = (rule, value, callback) => {
    console.log("checkEmail", value);
    if (value) {
        //   callback(new Error('请正确填写邮箱'));
        // } else {
        //正则表达式校验是否是邮箱的格式  ----xxxx   @163.com     @qq.com....
        var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (!reg.test(value)) {
            callback(new Error('邮箱地址格式不对'));
        }
        else {
            callback();
        }
    }
}

let rules = {
    userLoginName: [
        { required: true, message: "请输入账号", trigger: "blur" },
        {
            min: 3,
            //max: 18,
            message: "长度在3个字符以上",
            trigger: "blur",
        },
    ],
    userName: [
        { required: true, message: "请输入姓名", trigger: "blur" },
        {
            min: 3,
            //max: 18,
            message: "长度在3个字符以上",
            trigger: "blur",
        },
    ],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        {
            min: 6,
            //max: 18,
            message: "长度在6个字符以上",
            trigger: "blur",
        },
    ],
    status: [{ required: true, message: "请选择状态", trigger: "change" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    birthday: [{ required: true, message: "请选择出生日期", trigger: "blur" }],
    jobNumber: [{ required: true, message: "请输入工号", trigger: "blur" }],
    orderNum: [{ required: true, message: "请输入排序值", trigger: "blur" }],
    email: [{ validator: checkEmail, trigger: 'blur' }],

};
let avatarLinkUrl = ref("");
//文件上传成功后
const handleAvatarSuccess = (res) => {
    obj.data.avatarSourceName = res.data.sourceFileName;
    obj.data.avatarFullUrl = res.data.fullFilePath;
    if (res.data.linkFilePath) {
        avatarLinkUrl.value = `${baseUrl}/${res.data.linkFilePath}`;
    }
    obj.data.avatarLinkUrl = res.data.linkFilePath;
    //console.log("obj.avatarFullUrl---1", obj.avatarFullUrl);
};
//文件上传前触发
const beforeAvatarUpload = () => { };

const back = () => {
    router.push("/userlist");
};
const ruleForm = ref(null);
const save = (formEl) => {
    formEl.validate((valid) => {
        if (valid) {
            // console.log("this.obj:", obj);
            // console.log("this.obj.sex:", obj.sex);
            const loading = ElLoading.service({
                lock: true,
                text: "数据保存中……",
                background: "rgba(0, 0, 0, 0.7)",
                fullscreen: true,
            });
            //console.log("obj.avatarFullUrl---222", obj.avatarFullUrl);
            api.saveSysUser(obj.data).then((res) => {
                loading.close();
                console.log("result:::", res);
                if (res.isSuccess) {
                    // ElMessage({
                    //   showClose: true,
                    //   message: "保存成功",
                    //   type: "success",
                    //   center: true,
                    // });
                    ElMsg("保存成功");
                    if (obj.id == "") {
                        initData();
                    }
                } else {
                    // ElMessage({
                    //   showClose: true,
                    //   message: res.message,
                    //   type: "error",
                    //   center: true,
                    // });
                    res?.data.forEach(element => {
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
    // obj.id = "";
    // obj.userLoginName = "";
    // obj.userName = "";
    // obj.password = "";
    // obj.originalPwd = "";
    // obj.mobilePhone = "";
    // obj.phone = "";
    // obj.email = "";
    // obj.address = "";
    // obj.sex = sexInitData[0].value;
    // obj.birthday = "";
    // obj.status = statusInitData[0].value;
    // obj.orderNum = 10;
    // obj.avatarSourceName = "";
    // obj.avatarFullUrl = "";
    // obj.avatarLinkUrl = "";
    // avatarLinkUrl.value = "";

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
    };
};

onMounted(() => {
    // console.log("adasfd", route.name);
    // console.log("fdad", route.params);
    let id = route.params?.id;
    //console.log("-id-", id);
    if (id) {
        obj.id = route.params.id;
        let params = {
            id: id,
        };
        api.getSysUser(params).then((res) => {
            //console.log("resGET:", res);
            obj.data = res;
            //console.log("this is Obj", obj);
            //console.log(`${baseUrl}/${obj.data.avatarLinkUrl}`);
            if (res.data.linkFilePath) {
                avatarLinkUrl.value = `${baseUrl}/${res.data.linkFilePath}`;
            }
            //avatarLinkUrl.value = `${baseUrl}/${obj.data.avatarLinkUrl}`;
        });

        if (route.name.indexOf("usersee") != -1) {
            formDisabled.value = true;
        }
    }
    //  else if(route.name.indexOf("")){
    //  }
});
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader :deep(.el-upload) {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}</style>