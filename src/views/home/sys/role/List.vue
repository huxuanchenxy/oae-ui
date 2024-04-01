<template>
  <div>
    <el-form :inline="true" :model="listReq" class="demo-form-inline">
      <el-form-item label="角色名">
        <el-input
          v-model="listReq.roleName"
          placeholder="请输入角色名"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :icon="Search" @click="onSearch"
          >查询</el-button
        >
        <el-button type="primary" :icon="Plus" @click="onNew"
          >新建角色</el-button
        >

         
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 99.9%"
      v-loading="loading"
      element-loading-text="数据加载中..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection"> </el-table-column>
      <el-table-column prop="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="roleName" label="角色名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="status" width="100" label="状态">
        <template #default="scope">
          <el-popover
            placement="bottom"
            width="230"
            :visible="scope.row['isStatus']"
          >
            <p>
              该角色状态确定要设置<span
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
          <!-- <el-link type="primary" :icon="Share" style="margin-right: 8px"
                        @click="onUserRole(scope.row.id, scope.row.userName)">分配功能
                    </el-link> -->
          <el-popover
            placement="bottom"
            width="210"
            :visible="scope.row['isDel']"
          >
            <p>确定要删除该角色数据吗？</p>
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
        </template>
      </el-table-column>
    </el-table>
    <div style="float: right; margin-top: 15px">
      <el-pagination
        background
        layout="total,prev, pager, next"
        @current-change="handleCurrentChange"
        :page-size="listReq.pageSize"
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
import { pageSize, dateFormat, ElMsg, svg } from "@/jslib/common.js";
import { ref, reactive, onMounted } from "vue";
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
  Share,
} from "@element-plus/icons-vue";
const router = useRouter();
const listReq = reactive({
  roleName: "",
  pageSize: pageSize,
  pageIndex: 1,
});
let tableData = ref([]);
let totalCount = ref(0);
let loading = ref(false);
const multipleSelection = ref([]);

const onSearch = () => {
  listReq.pageIndex = 1;
  getList();
};

const onNew = () => {
  router.push("/roleadd");
};

const getList = () => {
  loading.value = true;
  let strRequest = JSON.stringify(listReq);
  let params = {
    strRequest,
  };
  api.getSysRoleList(params).then((res) => {
    tableData.value = res.list.map((obj, index) => {
      obj.index = (listReq.pageIndex - 1) * listReq.pageSize + index + 1;
      obj.isDel = false;
      obj.isStatus = false;
      return obj;
    });
    totalCount = res.totalCount;
    loading.value = false;
  });
};

const handleCurrentChange = (val) => {
  listReq.pageIndex = val;
  getList();
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
    api.updateSysRoleStatus(params).then((res) => {
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
  if (isTrueDel) {
    let params = {
      id: row.id,
    };
    api.delSysRole(params).then((res) => {
      console.log("res", res);
      ElMsg("删除成功");
      getList();
    });
  }
  row.isDel = false;
};

const onSee = (id) => {
  router.push({
    name: "rolesee/:id",
    params: { id: id },
  });
};
const onEdit = (id) => {
  router.push({
    name: "roleedit/:id",
    params: { id: id },
  });
};

onMounted(() => {
  //getList();
});

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
  console.log("multipleSelection", multipleSelection.value);
};

const batchDel = () => {
  if (multipleSelection.value.length == 0) {
    ElMsg("请选择需要删除的角色", "error");
  } else {
    let ids = multipleSelection.value.map((obj) => {
      return obj.id;
    });
    let params = {
      ids: ids.join(","),
    };
    //console.log("ids", ids);
    api.batchDelSysRole(params).then((res) => {
      ElMsg("批量删除成功");
      getList();
    });
  }
};
const batchUpdateStatus = () => {
  if (multipleSelection.value.length == 0) {
    ElMsg("请选择需要更新状态的角色", "error");
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
          ElMsg("批量更新成功");
          getList();
        });
      })
      .catch((action) => {});
  }
};
</script>
  
<style  scoped></style>