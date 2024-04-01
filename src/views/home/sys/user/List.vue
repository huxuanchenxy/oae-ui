<template>
  <div>
    <el-form :inline="true" :model="sysUserListReq" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input
          v-model="sysUserListReq.userLoginName"
          placeholder="请输入账号"
        ></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input
          v-model="sysUserListReq.userName"
          placeholder="请输入姓名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="onSearch"
          >查询</el-button
        >
        <el-button type="primary" :icon="Plus" @click="onNew"
          >新增员工</el-button
        >

       
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 99.9%"
      v-loading="loading"
      :max-height="tableHeight"
      element-loading-text="数据加载中..."
      border
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="userName" show-overflow-tooltip label="姓名">
      </el-table-column>
      <el-table-column prop="imageUrl" label="头像" width="69">
        <template #default="{ row }">
          <el-image
            :preview-src-list="[ImageUrlFilter(row.avatarLinkUrl)]"
            :preview-teleported="true"
            style="
              width: 40px;
              height: 40px;
              border-radius: 25px;
              vertical-align: middle;
            "
            v-if="row.avatarLinkUrl"
            :src="ImageUrlFilter(row.avatarLinkUrl)"
            class="avatar"
          />
        </template>
      </el-table-column>
      <el-table-column prop="userLoginName" label="账号" show-overflow-tooltip>
      </el-table-column>

      <el-table-column prop="jobNumber" show-overflow-tooltip label="工号">
      </el-table-column>
      <el-table-column prop="sex" label="性别" :formatter="sexFormat">
      </el-table-column>
      <el-table-column prop="mobilePhone" show-overflow-tooltip label="手机">
      </el-table-column>
      <el-table-column prop="address" show-overflow-tooltip label="地址">
      </el-table-column>
      <el-table-column prop="status" width="100" label="状态">
        <template #default="scope">
          <!-- <el-link :type="scope.row['status'] == 1 ? 'primary' : 'danger'" @click="scope.row['status'] = true">
                        {{ scope.row['status'] == 1 ? "有效" : "无效" }}
                    </el-link> -->
          <el-popover
            placement="bottom"
            width="230"
            :visible="scope.row['isStatus']"
          >
            <p>
              该员工状态确定要设置<span
                :style="{
                  fontWeight: 'bold',
                  color: scope.row['status'] == 0 ? 'green' : 'red',
                }"
              >
                {{ scope.row["status"] == 0 ? "有效" : "无效" }}</span
              >吗？
            </p>
            <div style="text-align: center; padding-top: 15px">
              <el-button
                size="small"
                text
                @click="onSetStatus(scope.row, false)"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="onSetStatus(scope.row, true)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-link
                :underline="false"
                :title="scope.row['status'] == 1 ? '设置为无效' : '设置为有效'"
                slot="reference"
                @click="scope.row['isStatus'] = true"
              >
                <el-tag
                  class="ml-2"
                  :type="scope.row['status'] == 1 ? 'success' : 'danger'"
                  >{{ scope.row["status"] == 1 ? "有效" : "无效" }}</el-tag
                >
              </el-link>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" width="100" label="排序值">
      </el-table-column>
      <el-table-column
        prop="createDate"
        show-overflow-tooltip
        label="创建时间"
        :formatter="dateFormat"
      >
      </el-table-column>
      <el-table-column label="操作" width="174">
        <template #default="scope">
          <el-link
            :icon="Reading"
            type="primary"
            style="margin-right: 8px"
            @click="onSee(scope.row.id)"
          >
            查看
          </el-link>
          <el-link
            type="primary"
            :icon="Edit"
            style="margin-right: 8px"
            @click="onEdit(scope.row.id)"
            >修改</el-link
          >

          <el-popover
            placement="bottom"
            width="230"
            :visible="scope.row['isDel']"
          >
            <p style="display: flex">
              <span
                style="
                  font-size: 20px;
                  margin-top: -2px;
                  color: rgb(230, 162, 60);
                "
              >
                <el-icon>
                  <Warning /> </el-icon></span
              ><span style="display: inline-block; margin-left: 5px"
                >确定要删除该员工数据吗？</span
              >
            </p>
            <div style="text-align: center; padding-top: 15px">
              <el-button size="small" text @click="onDel(scope.row, false)"
                >取消</el-button
              >
              <el-button
                type="primary"
                size="small"
                @click="onDel(scope.row, true)"
                >确定</el-button
              >
            </div>
            <template #reference>
              <el-link
                :icon="Delete"
                type="danger"
                slot="reference"
                @click="scope.row['isDel'] = true"
                >删除</el-link
              >
            </template>
          </el-popover>
          <!-- <el-popover placement="top" :width="160">
                        <p>Are you sure to delete this?</p>
                        <div style="text-align: right; margin: 0">
                            <el-button size="small" text>cancel</el-button>
                            <el-button size="small" type="primary">confirm</el-button>
                        </div>
                        <template #reference>
                            <el-button>Delete</el-button>
                        </template>
                    </el-popover> -->
          <!-- <el-link type="primary" style="margin-left: 8px" :icon="Share"
            @click="onUserRole(scope.row.id, scope.row.userName)">分配角色
          </el-link> -->
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right; margin-top: 15px">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="sysUserListReq.pageSize"
        :total="totalCount"
      >
      </el-pagination>
    </div>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import api from "@/api/sysApi";
import { baseUrl } from "@/api/baseUrl";
import { pageSize, dateFormat, ElMsg, svg } from "@/jslib/common.js";
import { ref, reactive, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router"; //导入路由
import { statusInitData } from "@/jslib/common";
import { ElMessageBox } from "element-plus";
import {
  Reading,
  Delete,
  Edit,
  Plus,
  Search,
  More,
  Download,
  Share,
  Upload,
} from "@element-plus/icons-vue";
const router = useRouter();
const sysUserListReq = reactive({
  userLoginName: "",
  userName: "",
  pageSize: pageSize,
  pageIndex: 1,
});
let tableData = ref([]);
let totalCount = ref(0);
let loading = ref(false);
let tableHeight = ref(0);
const getPageSize = () => {
  tableHeight.value =
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) - 247;
};
const multipleSelection = ref([]);
const fileTemplateList = ref([]);

const onSearch = () => {
  sysUserListReq.pageIndex = 1;
  getList();
};

const onNew = () => {
  router.push("/useradd");
};

const getList = () => {
  loading.value = true;
  let strRequest = JSON.stringify(sysUserListReq);
  let params = {
    strRequest,
  };
  api.getSysUserList(params).then((res) => {
    console.log("getUserList:::", res);
    tableData.value = res.list.map((obj, index) => {
      obj.index =
        (sysUserListReq.pageIndex - 1) * sysUserListReq.pageSize + index + 1;
      obj.isDel = false;
      obj.isStatus = false;
      return obj;
    });
    totalCount = res.totalCount;
    loading.value = false;
    //console.log("totalCount--------", totalCount, tableData);
  });
};

const handleCurrentChange = (val) => {
  sysUserListReq.pageIndex = val;
  getList();
};

const sexFormat = (row, column) => {
  const daterc = row[column.property];
  if (daterc != null) {
    return daterc == 1 ? "男" : "女";
  }
};

const onSetStatus = (row, isTure) => {
  if (isTure) {
    //console.log("onSetStatus", row, row.status,);
    let value =
      statusInitData[0].value == row.status
        ? statusInitData[1].value
        : statusInitData[0].value;
    let params = {
      id: row.id,
      value,
    };
    api.updateSysUserStatus(params).then((res) => {
      console.log("res", res);
      ElMsg("设置成功");
      // ElMessage({
      //   showClose: true,
      //   message: "设置成功",
      //   type: "success",
      //   center: true,
      // });
      getList();
    });
  }
  row.isStatus = false;
};

const onDel = (row, isTrueDel) => {
  // console.log("row-isDel", row, isDel);

  if (isTrueDel) {
    let params = {
      id: row.id,
    };
    api.delSysUser(params).then((res) => {
      console.log("res", res);
      // ElMessage({
      //   showClose: true,
      //   message: "删除成功",
      //   type: "success",
      //   center: true,
      // });

      ElMsg("删除成功");
      getList();
    });
  }
  row.isDel = false;
};

const onSee = (id) => {
  router.push({
    name: "usersee/:id",
    params: { id: id },
  });
};
const onEdit = (id) => {
  router.push({
    name: "useredit/:id",
    params: { id: id },
  });
};

onMounted(() => {
  // window.onresize = () => {
  //   return (() => {
  //     getPageSize();
  //     })();
  // };
  // getPageSize();
  // getList();
});

watch(
  () => tableHeight,
  (val) => {
    tableHeight.value = val;
  }
);

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log("multipleSelection", multipleSelection.value);
};

const batchDel = () => {
  if (multipleSelection.value.length == 0) {
    // ElMessage({
    //   showClose: true,
    //   message: "请选择需要删除的用户",
    //   type: "error",
    //   center: true,
    // });

    ElMsg("请选择需要删除的员工", "error");
  } else {
    let ids = multipleSelection.value.map((obj) => {
      return obj.id;
    });
    let params = {
      ids: ids.join(","),
    };
    console.log("ids", ids);
    api.batchDelSysUser(params).then((res) => {
      // console.log("res", res);
      // ElMessage({
      //   showClose: true,
      //   message: "批量删除成功",
      //   type: "success",
      //   center: true,
      // });

      ElMsg("批量删除成功");
      getList();
    });
  }
};
const batchUpdateStatus = () => {
  if (multipleSelection.value.length == 0) {
    // ElMessage({
    //   showClose: true,
    //   message: "请选择需要更新状态的用户",
    //   type: "error",
    //   center: true,
    // });
    ElMsg("请选择需要更新状态的员工", "error");
  } else {
    ElMessageBox.confirm("确定要批量更新状态吗?", "确认", {
      distinguishCancelAndClose: true,
      confirmButtonText: "确定",
      cancelButtonText: "取消",
    })
      .then(() => {
        let ids = multipleSelection.value.map((obj) => {
          return obj.id;
        });
        let params = {
          ids: ids.join(","),
        };
        console.log("ids", ids);
        api.batchUpdateSysUserStatus(params).then((res) => {
          console.log("res", res);
          // ElMessage({
          //   showClose: true,
          //   message: "批量更新成功",
          //   type: "success",
          //   center: true,
          // });
          ElMsg("批量更新成功");
          getList();
        });
      })
      .catch((action) => {});
  }
};
const handleTemplateSuccess = (res) => {
  console.log(res);
};

const ImageUrlFilter = computed(() => (item) => {
  return `${baseUrl}/${item}`;
});
</script>

<style  scoped></style>