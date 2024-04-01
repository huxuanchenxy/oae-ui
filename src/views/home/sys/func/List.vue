<template id="tempDept">
  <el-card class="box-card">
    <!-- <template #header>
            <div class="card-header">
                <span style="font-weight: bold;font-size:16px;">江苏徐沛工程建设有限公司</span>
                <span style="font-size: 12px; margin-left: 20px; color: rgb(69, 74, 91);">在这里创建、编辑组织部门信息</span>
            </div>
        </template> -->
    <el-form :inline="true" :model="obj" class="demo-form-inline">
      <!-- <el-form-item>
                <el-button type="primary" :icon="Plus" @click="onNew">添加部门</el-button>
                  <el-button type="primary" @click="onNew">组织总览图</el-button> 
            </el-form-item> -->
      <div style="float: left">
        <el-form-item style="margin-right: 8px">
          <el-input
            style="width: 274px"
            v-model="obj.name"
            placeholder="请输入菜单名称或显示名称进行查询"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-right: 1px">
          <el-button :icon="Search" circle @click="onSearch" />
        </el-form-item>
      </div>
    </el-form>
    <el-table
      :data="tableData"
      highlight-current-row
      style="width: 99.9%"
      v-loading="loading"
      row-key="id"
      :max-height="tableHeight"
      :tree-props="{ children: 'children' }"
      :expand-row-keys="expands"
      element-loading-text="数据加载中..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="funcName" label="菜单名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="showName" show-overflow-tooltip label="显示名称">
      </el-table-column>
      <el-table-column prop="levelId" show-overflow-tooltip label="菜单级别">
      </el-table-column>
      <el-table-column
        prop="isShowMenu"
        show-overflow-tooltip
        label="是否显示前台"
      >
      </el-table-column>
      <el-table-column prop="funcUrl" show-overflow-tooltip label="链接Url">
      </el-table-column>
      <el-table-column
        prop="pageAddress"
        show-overflow-tooltip
        label="前台页面地址"
      >
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
              该部门状态确定要设置<span
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
      <!-- <el-table-column label="操作" width="174">
                <template #default="scope">
                    <el-link :icon="Reading" type="primary" style="margin-right: 8px" @click="onSee(scope.row.id)">
                        查看
                    </el-link>
                    <el-link type="primary" :icon="Edit" style="margin-right: 8px"
                        @click="onEdit(scope.row.id)">修改</el-link>

                    <el-popover placement="bottom" width="220" :visible="scope.row['isDel']">
                        <p style="display:flex"><span style="font-size:20px;margin-top:-2px; color:rgb(230,162,60);">
                                <el-icon>
                                    <Warning />
                                </el-icon></span><span style="display:inline-block; margin-left:5px;">确定要删除该部门数据吗？</span>
                        </p>
                        <div style="text-align: center; padding-top: 15px">
                            <el-button size="small" text @click="onDel(scope.row, false)">取消</el-button>
                            <el-button type="primary" size="small" @click="onDel(scope.row, true)">确定</el-button>
                        </div>
                        <template #reference>
                            <el-link :icon="Delete" type="danger" slot="reference"
                                @click="scope.row['isDel'] = true">删除</el-link>
                        </template>
                    </el-popover> 
                </template>
            </el-table-column> -->
    </el-table>
  </el-card>
</template>

<script setup>
import api from "@/api/sysApi";
import { ElMsg, svg } from "@/jslib/common.js";
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter } from "vue-router"; //导入路由
import { statusInitData } from "@/jslib/common";
// import { ElMessageBox } from "element-plus";
import { Reading, Delete, Edit, Plus, Search } from "@element-plus/icons-vue";
let tableHeight = ref(0);
const getPageSize = () => {
  tableHeight.value =
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) - 247;
};
const router = useRouter();
const obj = reactive({
  name: "",
});

let tableData = ref([]);
let loading = ref(false);

const onSearch = () => {
  //obj.pageIndex = 1;
  getList();
};
let expands = ref([]);
// const onNew = () => {
//     router.push("/deptadd");
// };

const getList = () => {
  loading.value = true;
  let params = {
    name: obj.name,
  };
  api.getFuncList(params).then((res) => {
    tableData.value = formartTableData(res);
    loading.value = false;
    console.log("totalCount--------", tableData);
  });
};

const formartTableData = (list) => {
  return list.map((obj) => {
    obj.isDel = false;
    obj.isStatus = false;
    if (obj.levelId < 3) {
      expands.value.push(obj.id);
    }
    if (obj.children?.length > 0) {
      formartTableData(obj.children);
    }
    return obj;
  });
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
    api.updateDeptStatus(params).then((res) => {
      console.log("res", res);
      ElMsg("设置成功");
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
    api.delDept(params).then((res) => {
      console.log("res", res);
      ElMsg("删除成功");
      getList();
    });
  }
  row.isDel = false;
};

const onSee = (id) => {
  router.push({
    name: "deptsee/:id",
    params: { id: id },
  });
};
const onEdit = (id) => {
  router.push({
    name: "deptedit/:id",
    params: { id: id },
  });
};

onMounted(() => {
  // window.onresize = () => {
  //   return (() => {
  //     getPageSize();
  //   })();
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
</script>

<style scoped></style>