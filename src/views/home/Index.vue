<template>
  <div id="module">
    <el-container>
      <NavMenu id="leftMenu" :isCollapse="!isCollapse" />
      <el-container>
        <el-header>
          <!-- <div class="logo"></div> -->
          <div class="center">
            <Tags></Tags>
          </div>
          <div class="right">
            <div style="width: 100px"></div>

            <el-tooltip placement="bottom" effect="light" :offset="-3">
              <template #content>
                <ul class="userUl">
                  <li @click="pCenterVisible = true">个人中心</li>
                  <li @click="resetPwd">修改密码</li>
                  <li>
                    <router-link to="/main">首页</router-link>
                  </li>
                  <li @click="goBack()">注销</li>
                </ul>
              </template>
              <div style="float: left; margin: 6px 15px 0 0">
                <el-avatar
                  style="float: left; cursor: pointer"

                />
                <!-- :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)" -->
                <div style="float: left; color: #fff; margin: 10px 0 0 10px">
                  {{ curUserInfo.userName }}
                </div>
              </div>
            </el-tooltip>

            <!-- <el-button style="margin-top: 9px" class="exit" type="primary">注销</el-button> -->
          </div>
        </el-header>

        <el-main>
          <!-- <div class="top">
            <div class="expand" @click="clickExpand">
              
              <el-icon v-show="isCollapse">
                <Fold />
              </el-icon>
              <el-icon v-show="!isCollapse">
                <Expand />
              </el-icon>
            </div>
            <div class="topBreadcrumb">
              <Breadcrumb />
            </div>
          </div> -->

          <router-view class="routerView" />

          <pwdChangeDialog
            v-model:pwdChangeDialogVisible="pwdChangeDialogVisible"
          ></pwdChangeDialog>

          <el-drawer
            :with-header="true"
            v-model="pCenterVisible"
            size="247"
            :append-to-body="true"
            style="background: #333; color: #fff"
          >
            <div
              style="margin: 0 auto; text-align: center; margin: 0 0 15px -5px"
            >
              <!-- <el-avatar :size="147" :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)" /> -->

              <!-- <el-image
                :preview-src-list="[ImageUrlFilter(curUserInfo.avatarLinkUrl)]"
                :preview-teleported="true"
                style="width: 147px; vertical-align: middle"
                :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)"
                class="avatar"
              /> -->
            </div>
            <div style="margin-left: 5px">
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                class="drawerItem"
              >
                <el-form-item label="姓名：">
                  {{ curUserInfo.userName }}
                </el-form-item>
                <el-form-item label="登录名：">
                  {{ curUserInfo.userLoginName }}
                </el-form-item>
                <el-form-item label="性别：">
                  {{ curUserInfo.sex == 1 ? "男" : "女" }}
                </el-form-item>
                <el-form-item label="工号：">
                  {{ curUserInfo.jobNumber }}
                </el-form-item>
                <el-form-item label="联系电话：">
                  {{ curUserInfo.mobilePhone }}
                </el-form-item>
                <el-form-item label="部门：">
                  <div v-html="deptListStr"></div>
                </el-form-item>
                <el-form-item label="职位：">
                  <div v-html="postListStr"></div>
                </el-form-item>
              </el-form>
            </div>
          </el-drawer>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Tags from "@/components/Tags.vue";
import NavMenu from "@/components/NavMenu.vue"; //导航
//import Breadcrumb from "@/components/Breadcrumb.vue"; //引入组件
import pwdChangeDialog from "../../components/dialog/PwdChange.vue";
import { useRouter } from "vue-router"; //导入路由
//import { Fold, Expand } from "@element-plus/icons-vue";
import { ref, reactive, onMounted, computed } from "vue";
import { baseUrl } from "@/api/baseUrl";
import cache from "@/plugins/cache.ts";
import  {getInitData}  from "@/api/common/init.ts";
const router = useRouter(); //实例化路由
const pwdChangeDialogVisible = ref(false);
const resetPwd = () => {
  pwdChangeDialogVisible.value = true;
};
const pCenterVisible = ref(false);

const formLabelAlign = reactive({
  name: "",
  region: "",
  type: "",
});
const curUserInfo = ref({
  avatarLinkUrl: "",
  sex: 1,
  userLoginName: "",
  userName: "",
  userId: "",
  jobNumber: "",
});

const ImageUrlFilter = computed(() => (item) => {
  return `${baseUrl}/${item}`;
});
//退出
function goBack() {
  router.push("/login");
}
const isCollapse = ref(true);
const clickExpand = () => {
  isCollapse.value = !isCollapse.value;
};
const deptListStr = ref("");
const postListStr = ref("");
const cacheKey="json";
//location.reload();
onMounted(() => {
  let jsonData=cache.local.getJSON(cacheKey);
  if(!jsonData){
    jsonData=getInitData();
  }
  cache.local.setJSON("json", jsonData); //后续从数据库中读取
  // location.reload();
  // router.push("/rolelist");
  // if (window.location.href.indexOf("#reloaded") == -1) {
  //   window.location.href = window.location.href + "#reloaded";
  //   window.location.reload();
  // }
  const curDeptList = JSON.parse(sessionStorage.getItem("curDeptList"));
  if (curDeptList && curDeptList.length > 0) {
    let deptStr = "";
    curDeptList.forEach((obj) => {
      deptStr += obj.orgName + "<br />";
    });
    deptListStr.value = deptStr;
  }

  const curPostList = JSON.parse(sessionStorage.getItem("curPostList"));
  if (curPostList && curPostList.length > 0) {
    let postStr = "";
    curPostList.forEach((obj) => {
      postStr += obj.orgName + "<br />";
    });
    postListStr.value = postStr;
  }

  curUserInfo.value = JSON.parse(sessionStorage.getItem("curUserInfo"));
});
</script>

<style >
.userUl {
  color: #333;
}

.userUl > li {
  padding: 5px;
  cursor: pointer;
}

.userUl > li:hover {
  /* padding: 5px; */
  color: #4290f7;
  font-size: 14px;
  font-weight: bold;
  /* background: #b4d5ff; */
  /* background-color: rgb(236, 245, 255); */
}

.userUl > li > a:hover {
  color: #4290f7;
}

.drawerItem {
  max-width: 470px;
}

.drawerItem .el-form-item__label {
  color: #fff;
}
</style>