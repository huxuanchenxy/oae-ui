<template>
  <div id="module">
    <el-container>
      <!-- <NavMenu id="leftMenu" :isCollapse="!isCollapse" /> -->
      <!-- <NavTree ref="childTreeRef"></NavTree> -->
      <NavTree></NavTree>

      <el-container>
        <el-header>
          <div style="position: absolute; top: 6px">
            <div style="margin-left: 6px">
              <el-button
                type="primary"
                plain="false"
                size="small"
                @click="save()"
              >
                <span class="iconfont">&#xe6a2;</span
                ><span style="font-size: 12px; margin: 0 0 0 4px">保存</span>
              </el-button>
            </div>
          </div>
          <!-- <div class="logo"></div> -->
          <div class="center">
            <Tags></Tags>
          </div>
          <!-- <div class="right" style="display: none">
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
                <el-avatar style="float: left; cursor: pointer" /> -->
          <!-- :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)" -->
          <!-- <div style="float: left; color: #fff; margin: 10px 0 0 10px">
                  {{ curUserInfo?.userName }}
                </div>
              </div>
            </el-tooltip> -->

          <!-- <el-button style="margin-top: 9px" class="exit" type="primary">注销</el-button> -->
          <!-- </div> -->
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

          <!-- <pwdChangeDialog
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
            > -->
          <!-- <el-avatar :size="147" :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)" /> -->

          <!-- <el-image
                :preview-src-list="[ImageUrlFilter(curUserInfo.avatarLinkUrl)]"
                :preview-teleported="true"
                style="width: 147px; vertical-align: middle"
                :src="ImageUrlFilter(curUserInfo.avatarLinkUrl)"
                class="avatar"
              /> -->
          <!-- </div>
            <div style="margin-left: 5px">
              <el-form
                label-width="100px"
                :model="formLabelAlign"
                class="drawerItem"
              >
                <el-form-item label="姓名：">
                  {{ curUserInfo?.userName }}
                </el-form-item>
                <el-form-item label="登录名：">
                  {{ curUserInfo?.userLoginName }}
                </el-form-item>
                <el-form-item label="性别：">
                  {{ curUserInfo?.sex == 1 ? "男" : "女" }}
                </el-form-item>
                <el-form-item label="工号：">
                  {{ curUserInfo?.jobNumber }}
                </el-form-item>
                <el-form-item label="联系电话：">
                  {{ curUserInfo?.mobilePhone }}
                </el-form-item>
                <el-form-item label="部门：">
                  <div v-html="deptListStr"></div>
                </el-form-item>
                <el-form-item label="职位：">
                  <div v-html="postListStr"></div>
                </el-form-item>
              </el-form>
            </div>
          </el-drawer>-->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import Tags from "@/components/Tags.vue";
import NavTree from "@/components/NavTree.vue";
import cache from "@/plugins/cache.ts";
import sysApi from "@/api/sysApi";

onMounted(() => {});

const save = () => {
  // var aa1 = {
  //   namespace: "Light",
  //   folder: "",
  //   type: "BasicFunctionBlock",
  //   properties: {
  //     comment: " ",
  //     auth: {},
  //     compile_information: [],
  //     version_information: [{}],
  //   },
  //   interface: {
  //     input_events: [],
  //     output_events: [],
  //     inputs: [],
  //     outputs: [],
  //     internals: [],
  //     temps: [],
  //   },
  //   ecc: {},

  //   algorithms: [],
  //   dynamic: false,
  //   lock: false,
  //   updated_time: 1710213247000,
  //   id: "",
  // };

  // var json = [
  //   {
  //     id: 4,
  //     name: "模块一",
  //     nameSpace: "111",
  //     type: "",
  //     properties: JSON.stringify(aa1.properties),
  //     algorithms: JSON.stringify(aa1.algorithms),
  //     interface: JSON.stringify(aa1.interface),
  //     ecc: JSON.stringify(aa1.ecc),
  //   },
  //   {
  //     id: 8,
  //     name: "模块二",
  //     nameSpace: "",
  //     type: "",
  //     properties: JSON.stringify(aa1.properties),
  //     algorithms: JSON.stringify(aa1.algorithms),
  //     interface: JSON.stringify(aa1.interface),
  //     ecc: JSON.stringify(aa1.ecc),
  //   },
  // ];
  const cacheKey = "json";
  let cacheJson = cache.local.getJSON(cacheKey);
  if (cacheJson) {
    cacheJson.forEach((j) => {
      j.properties = JSON.stringify(j.properties);
      j.algorithms = JSON.stringify(j.algorithms);
      j.interface = JSON.stringify(j.interface);
      j.ecc = JSON.stringify(j.ecc);
    });
    sysApi.saveAll(cacheJson).then((res) => {
      //console.log("saveAll:::", res);
      ElMessage({
        message: "保存成功",
        type: "success",
      });
    });
  }
  // sysApi.saveAll(json).then((res) => {
  //   console.log("saveAll:::", res);
  // });
};
</script>

<style >
</style>