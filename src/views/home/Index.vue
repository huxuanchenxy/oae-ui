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
                  :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)"
                />
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
import  cache  from "@/plugins/cache.ts";
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
//location.reload();
onMounted(() => {
  const jsonData=[{
  "project":"project1",
	"name": "mokuaiyi",
	"namespace": "Light",
	"folder": "",
	"type": "BasicFunctionBlock",
	"properties": {
		"comment": "Basic Function Block Type",
		"auth": {
			"standard": "61499-2",
			"classification": "",
			"application_area": "",
			"function": "",
			"type": "",
			"describe": ""
		},
		"compile_information": [],
		"version_information": [{
			"organization": "YY Automation",
			"version": "0.1",
			"author": "WD",
			"date": "2017-03-03",
			"note": ""
		}]
	},
	"interface": {
		"input_events": [{
			"key": "12e4d89f-1711-4ba6-a21d-c5a2cebb2547",
			"raw_key": "",
			"text": "INIT",
			"comment": "",
			"type": "EVENT",
      "relatedEvents":[{id:2,name:'事件2'},{id:3,name:'事件3'},]
		}],
		"output_events": [{
			"key": "cd5a4d2e-d47b-44f4-996c-5f66dfe5d508",
			"raw_key": "",
			"text": "INITO",
			"comment": "",
			"type": "EVENT"
		}],
		"inputs": [],
		"outputs": [{
			"key": "829199a3-58be-4544-98e1-eaebf7748551",
			"text": "Mode_O",
			"comment": "",
			"type": "DINT",
			"initVals": "",
			"max": "",
			"min": "",
			"step": "",
			"arrayLength": "1",
			"relatedEvents": ["cd5a4d2e-d47b-44f4-996c-5f66dfe5d508"]
		}, {
			"key": "64b72443-6578-4291-b85f-233a156d8485",
			"text": "SF4_ALM",
			"comment": "",
			"type": "DINT",
			"initVals": "",
			"max": "",
			"min": "",
			"step": "",
			"arrayLength": "1",
			"relatedEvents": ["cd5a4d2e-d47b-44f4-996c-5f66dfe5d508"]
		}, {
			"key": "021a9fb5-fbe2-490b-bf0f-3193dac424bb",
			"text": "TUNE_OPCUA",
			"comment": "",
			"type": "DINT",
			"initVals": "",
			"max": "",
			"min": "",
			"step": "",
			"arrayLength": "1",
			"relatedEvents": ["cd5a4d2e-d47b-44f4-996c-5f66dfe5d508"]
		}, {
			"key": "40a25f03-c3a8-4d91-8ace-7ea83c08c665",
			"text": "TUNE_O",
			"comment": "",
			"type": "DINT",
			"initVals": "",
			"max": "",
			"min": "",
			"step": "",
			"arrayLength": "1",
			"relatedEvents": ["cd5a4d2e-d47b-44f4-996c-5f66dfe5d508"]
		}],
		"internals": [],
		"temps": [{
			"key": "d395ed96-cb33-4f4d-8352-2e251389f782",
			"text": "i",
			"comment": "",
			"type": "DINT",
			"initVals": "",
			"max": "",
			"min": "",
			"step": "",
			"arrayLength": "1"
		}]
	},
	"ecc": {
		"linkDataArray": [{
			"from": "3",
			"to": "1",
			"event_condition": "1",
			"priority": 1,
			"guard_condition": "",
			"comment": ""
		}, {
			"from": "1",
			"to": "3",
			"event_condition": "12e4d89f-1711-4ba6-a21d-c5a2cebb2547",
			"priority": 1,
			"guard_condition": "",
			"comment": ""
		}],
		"nodeDataArray": [{
			"key": "1",
			"text": "START",
			"comment": "",
			"loc": "-184 -33.999969482421875"
		}, {
			"key": "3",
			"text": "INIT",
			"comment": "",
			"table": [{
				"algorithm": "cafe10f0-951a-4c24-b5bf-15d7b78cf4a2",
				"output_event": "cd5a4d2e-d47b-44f4-996c-5f66dfe5d508"
			}],
			"loc": "-219 205.99996948242188"
		}]
	},
	"panel": {
		"children": null,
		"data": {
			"graph": null,
			"paper": null
		}
	},
	"html": {
		"data": "",
		"children": null
	},
	"algorithms": [{
		"key": "cafe10f0-951a-4c24-b5bf-15d7b78cf4a2",
		"text": "INIT",
		"comment": "",
		"content": "Mode_O := SF4_ALM;\r\nSF4_ALM := 0;\r\nTUNE_O := TUNE_OPCUA;\r\nTUNE_OPCUA := 0;",
		"type": "ST",
		"lines": [{
			"branches": [{
				"comps": []
			}],
			"comment": ""
		}]
	}],
	"id": "09c98578-4b43-4c45-b29e-8abb8799f360",
	"dynamic": false,
	"lock": false,
	"updated_time": 1710213247000
}]
  cache.local.setJSON("json",jsonData)//后续从数据库中读取
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