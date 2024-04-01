<template>
  <el-row>
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
            <el-form-item label="角色名称" prop="roleName">
              <el-input
                v-model="obj.data.roleName"
                placeholder="请输入角色名称"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <el-form-item label="角色描述">
              <el-input
                v-model="obj.data.roleDesc"
                placeholder="请输入角色描述"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="6">
          <el-form-item label="排序值" prop="orderNum">
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
      </el-form>
    </el-col>
  </el-row>

  <el-card
    class="box-card"
    :style="{ margin: '0 auto', width: '96%', height: cardHeight + 'px' }"
  >
    <template #header>
      <div class="card-header">
        <span style="font-weight: bold">设置菜单权限</span>
      </div>
    </template>
    <el-table
      ref="xTable"
      :data="tableData"
      highlight-current-row
      style="width: 99.9%"
      v-loading="funcTbloading"
      row-key="id"
      @selectionChange="selectionChange"
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
    </el-table>
  </el-card>

  <el-row style="margin-top: 40px">
    <el-col :offset="10" :span="6">
      <el-button
        size="large"
        v-show="!formDisabled"
        type="primary"
        @click="save(ruleForm)"
        >保存</el-button
      >
      <el-button size="large" @click="back()">返回</el-button>
    </el-col>
  </el-row>
</template>
    
<script  setup>
import { useRouter, useRoute } from "vue-router"; //导入路由
import { reactive, ref, onMounted, watch, nextTick } from "vue";
import { CusElLoading, ElMsg, svg } from "@/jslib/common";
import api from "@/api/sysApi";
const router = useRouter();
const route = useRoute();
const obj = reactive({
  data: {
    id: "",
    roleName: "",
    roleDesc: "",
    status: 1,
    orderNum: 10,
    funcIds: [],
  },
});
let formDisabled = ref(false);
const validateName = (rule, value, callback) => {
  if (value !== "") {
    let params = {
      name: value,
      id: obj.data.id,
    };
    api.validateSysUser(params).then(async (res) => {
      if (res) {
        await callback();
      } else {
        await callback(new Error("角色名称已存在"));
      }
    });
  } else {
    callback(new Error("请输入角色名称"));
  }
};

let rules = {
  roleName: [
    { required: true, message: "请输入角色名称", trigger: "blur" },
    { validator: validateName, trigger: "blur" },
    {
      min: 3,
      //max: 18,
      message: "长度在3个字符以上",
      trigger: "blur",
    },
  ],
  orderNum: [{ required: true, message: "请输入排序值", trigger: "blur" }],
};

const multipleSelection = ref([]);

const back = () => {
  router.push("/rolelist");
  //console.log("back", multipleSelection.value);
  //test xTable.value.toggleRowSelection(tableData.value[0]);
};
const ruleForm = ref(null);
const save = (formEl) => {
  formEl.validate((valid) => {
    if (valid) {
      let cusLoading = CusElLoading();
      console.log("multipleSelection.value:::", multipleSelection.value);
      multipleSelection.value.forEach((m) => {
        console.log("foreach---", obj.data);
        console.log("foreach---", obj.data.funcIds);
        obj.data.funcIds.push(m.id);
      });
      console.log("save---", obj.data.funcIds);

      api.saveSysRole(obj.data).then((res) => {
        cusLoading.close();
        console.log("result:::", res);
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
    roleName: "",
    roleDesc: "",
    status: 1,
    orderNum: 10,
    funcIds: [],
  };
};

const cardHeight = ref(0);
let tableHeight = ref(0);
const getPageSize = () => {
  cardHeight.value =
    (window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight) - 417;
  tableHeight.value = cardHeight.value - 74;
};

const xTable = ref();

const selectionChange = (val) => {
  //console.log("val--val", val)
  multipleSelection.value = val;
};

let expands = ref([]);
let tableData = ref([]);
let funcTbloading = ref(false);
const getFuncList = () => {
  funcTbloading.value = true;
  let params = {
    name: "",
  };
  api.getFuncList(params).then((res) => {
    tableData.value = formartTableData(res);
    funcTbloading.value = false;
    let id = route.params?.id;
    if (id) {
      params = {
        id,
      };
      api.getFuncIdsByRoleId(params).then((res) => {
        //console.log("res-id", res);
        let existIds = res;
        nextTick(() => {
          //xTable.value.toggleRowSelection(tableData.value[1].children[0], true);
          formartTableDataCheck(tableData.value, existIds);
        });
      });
    }
    //console.log("abc", tableData.value);
    console.log("abcq2", multipleSelection.value);
    //console.log("abcq211", tableData.value[1]);
  });
};

const formartTableDataCheck = (list, existIds) => {
  list.map((obj) => {
    let bFlag = existIds.some((val) => {
      return val == obj.id;
    });
    if (bFlag) {
      multipleSelection.value.push(obj);
    }
    xTable.value.toggleRowSelection(obj, bFlag);

    if (obj.children?.length > 0) {
      formartTableDataCheck(obj.children, existIds);
    }
  });
};

const formartTableData = (list) => {
  return list.map((obj) => {
    // obj.isDel = false;
    // obj.isStatus = false;
    if (obj.levelId < 3) {
      expands.value.push(obj.id);
    }
    if (obj.children?.length > 0) {
      formartTableData(obj.children);
    }
    return obj;
  });
};

onMounted(() => {
  window.onresize = () => {
    return (() => {
      getPageSize();
    })();
  };

  getPageSize();

  getFuncList();

  let id = route.params?.id;
  if (id) {
    let cusLoading = CusElLoading();
    obj.id = route.params.id;
    let params = {
      id: id,
    };
    api.getSysRole(params).then((res) => {
      //console.log("resGET:", res);
      obj.data = res;
      obj.data.funcIds = [];
      cusLoading.close();
    });
    if (route.name.indexOf("rolesee") != -1) {
      formDisabled.value = true;
    }
  }
});

watch(
  () => tableHeight,
  (val) => {
    tableHeight.value = val;
  },
  () => cardHeight,
  (val) => {
    cardHeight.value = val;
  }
);
</script>
<style scoped></style>