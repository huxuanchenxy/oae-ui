<template>
  <div style="background-color: #def4fd">
    <div style="padding: 10px; display: inline">
      <el-dropdown>
        <el-button class="el-dropdown-link" text size="large" disabled>
          校验
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>全部</el-dropdown-item>
            <el-dropdown-item>应用1</el-dropdown-item>
            <el-dropdown-item>应用2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown>
        <el-button class="el-dropdown-link" text size="large" disabled>
          部署
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>全部</el-dropdown-item>
            <el-dropdown-item>应用1</el-dropdown-item>
            <el-dropdown-item>应用2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button text size="large" disabled>编译</el-button>
      <span style="margin-left: 10px; margin-right: 30px">|</span>
      <el-button-group>
        <el-tooltip effect="light" content="开始" placement="bottom">
          <el-button icon="VideoPlay" disabled />
        </el-tooltip>
        <el-tooltip effect="light" content="暂停" placement="bottom">
          <el-button icon="VideoPause" disabled />
        </el-tooltip>
        <el-tooltip effect="light" content="终止" placement="bottom">
          <el-button icon="Failed" disabled />
        </el-tooltip>
        <el-tooltip effect="light" content="刷新" placement="bottom">
          <el-button icon="RefreshRight" disabled />
        </el-tooltip>
        <el-tooltip effect="light" content="清缓存" placement="bottom">
          <el-button icon="Failed" disabled />
        </el-tooltip>
        <el-tooltip effect="light" content="部署状态" placement="bottom">
          <el-button icon="Failed" disabled />
        </el-tooltip>
        <el-tooltip effect="light" content="在线设备" placement="bottom">
          <el-button icon="Failed" disabled />
        </el-tooltip>
      </el-button-group>
      <span style="margin-left: 30px; margin-right: 30px">|</span>
      <el-button-group>
        <el-tooltip effect="light" content="保存" placement="bottom">
          <el-button @click="saveAllClick"
            ><span class="iconfont">&#xe6a2;</span></el-button
          >
        </el-tooltip>
        <el-tooltip effect="light" content="刷新" placement="bottom">
          <el-button icon="Refresh" @click="initData" />
        </el-tooltip>
        <el-tooltip effect="light" content="撤销" placement="bottom">
          <el-button icon="Back" @click="toolbar.undo()" />
        </el-tooltip>
        <el-tooltip effect="light" content="回退" placement="bottom">
          <el-button icon="Right" @click="toolbar.redo()" />
        </el-tooltip>
      </el-button-group>
    </div>
  </div>
  <div class="wrapper">
    <div
      style="position: relative; height: 100%; flex-grow: 2; overflow: hidden"
    >
      <div id="container" ref="container"></div>
      <div style="position: absolute; top: 0px; left: 6px">
        <el-select
          placeholder="快速定位网络段或设备"
          filterable
          v-model="curDevices.val"
          value-key="id"
          clearable
          @change="setDevicePosition"
          @visible-change="loadDevicesData"
        >
          <el-option
            v-for="option in curDevices.options"
            :key="option.id"
            :label="option.label"
            :value="option.id"
          >
            <span style="float: left">{{ option.label }}</span>
            <span
              style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 12px;
              "
            >
              {{ option.typeShow }}
            </span>
          </el-option>
        </el-select>
      </div>
      <div style="position: absolute; bottom: 6px; right: 10px">
        <div>按住Shift，拖拽画线；松开Shift，直接拖拽节点</div>
        <div>按住Shift，画框或多次单击复选；</div>
      </div>
      <div style="position: absolute; top: 0px; right: 10px">
        <el-card v-if="isCardShow">
          <template #header>
            <div class="card-header">
              <span style="font-size: large; font-weight: bold">{{
                cardData.nameVal
              }}</span>
            </div>
          </template>
          <el-form
            :model="cardData"
            label-width="auto"
            :rules="rules"
            status-icon
            ref="ruleFormRef"
            class="demo-ruleForm"
          >
            <div
              style="max-height: 600px; overflow-y: auto; margin-bottom: 10px"
            >
              <el-form-item :label="cardData.name" prop="nameVal">
                <el-input v-model="cardData.nameVal" />
              </el-form-item>
              <el-form-item :label="cardData.typeName">
                <span>{{ cardData.typeDisplayVal }}</span>
              </el-form-item>
              <el-form-item
                v-for="(item, index) in cardData.items"
                :key="index"
                :label="item.displayName"
              >
                <el-select
                  v-if="item.options !== ''"
                  v-model="item.value"
                  value-key="id"
                  style="width: 100%"
                >
                  <!-- value-key="id"
                  placeholder="Select"
                  $set(item, 'value', item.value);
                  style="width: 240px" -->
                  <el-option
                    v-for="option in item.options"
                    :key="option.id"
                    :label="option.label"
                    :value="option.id"
                  />
                </el-select>
                <el-input-number
                  v-else-if="item.valueRule === 'INT'"
                  v-model="item.value"
                  style="width: 100%"
                />
                <el-input v-else v-model="item.value"></el-input>
              </el-form-item>
            </div>
            <el-form-item :label="cardData.buttonLabel">
              <el-button
                @click="showDialog(cardData.largeType)"
                style="position: absolute; right: 0px"
                >{{ cardData.buttonText }}</el-button
              >
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
    <div :class="{ rightShow: drawer, rightHidden: !drawer }">
      <el-button
        type="primary"
        :title="funcTitle"
        size="small"
        class="func"
        @click="showOrHidden"
      >
        <el-icon v-show="drawer" style="font-size: 14px"
          ><CaretRight
        /></el-icon>
        <el-icon v-show="!drawer" style="font-size: 14px"><CaretLeft /></el-icon
        >设备库
      </el-button>
      <!-- <div class="right"> -->
      <el-card>
        <el-input v-model="filterText" placeholder="Filter keyword" />
        <el-tree
          ref="treeRef"
          style="max-height: 840px; overflow-y: auto"
          accordion
          draggable
          :data="devices"
          :props="defaultProps"
          :filter-node-method="filterNode"
          @node-drag-end="handleDragEnd"
          :allow-drag="allowdrag"
          :allow-drop="
            () => {
              return false;
            }
          "
        >
          <template #default="{ node, data }">
            <img
              v-if="data.images !== '' && data.images.indexOf('.') > 0"
              :src="iconPath + data.images"
              class="icon-tree"
            />
            <span>{{ node.label }}</span>
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
  <el-dialog  :title="dialog_config.title" v-model="dialog_config.visible"  :show-close="false" width="1600">
    <div class="config_upanddown_button">
      <el-button type="primary"><el-icon><Upload /></el-icon></el-button>
      <el-button type="primary"><el-icon><Download /></el-icon></el-button>
    </div>
    <div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="读" name="read">
          <div class="config">
            <div class="config_dml_button">
              <el-button type="primary" @click="insertEvent">新增</el-button>
              <el-button type="primary" :icon="Delete">批量删除</el-button>
            </div>
            <div>
              <vxe-table
                  show-overflow
                  keep-source
                  ref="tableRef"
                  :row-config="{keyField: 'id'}"
                  :column-config="{resizable: true}"
                  :print-config="{}"
                  :export-config="{}"
                  :loading="loading"
                  :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
                  :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                  :data="tableData">
                <vxe-column type="checkbox" width="60"></vxe-column>
                <vxe-column field="name" title="Name"  tree-node :edit-render="{}" >
                  <template #edit="{ row }">
                    <vxe-input v-model="row.name" mode="text"></vxe-input>
                  </template>
                </vxe-column>
                <vxe-column field="size" title="Size" width="100" :edit-render="{}">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.size" mode="text"></vxe-input>
                  </template>
                </vxe-column>
                <vxe-column field="date" title="Date" :edit-render="{}">
                  <template #edit="{ row }">
                    <vxe-input v-model="row.date" type="date" transfer></vxe-input>
                  </template>
                </vxe-column>
                <vxe-column title="操作" width="640">
                  <template #default="{ row }">
                    <vxe-button mode="text" status="primary" @click="insertRow(row, 'current')">新增组内变量</vxe-button>
                    <vxe-button mode="text" status="danger" @click="removeRow(row)">删除节点</vxe-button>
                  </template>
                </vxe-column>
              </vxe-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="写" name="write">111</el-tab-pane>
      </el-tabs>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="saveConfig">确 定</el-button>
        <el-button @click="cancelConfig">取 消</el-button>
      </div>
    </template>
  </el-dialog>
  <div>
    <el-dialog v-model="dialogVisible_res" :show-close="false" width="1600">
      <template #header="">
        <div class="my-header">
          <h1 style="font-size: 20px">{{ cardData.nameVal }}</h1>
          <el-button icon="Plus" @click="addRes" />
        </div>
      </template>
      <el-form
        :model="formRes"
        label-position="top"
        label-width="auto"
        :rules="rulesRes"
        status-icon
        ref="ruleResFormRef"
        class="formRes"
        size="small"
        style="max-height: 600px; overflow-y: auto"
      >
        <el-row v-for="(res, index) in formRes.list" :key="index">
          <el-col :span="2" style="padding-right: 5px">
            <el-form-item
              :label="res.name"
              :rules="rulesRes.nameVal"
              :prop="`list.${index}.nameVal`"
            >
              <el-input v-model="res.nameVal" />
            </el-form-item>
          </el-col>
          <el-col :span="3" style="padding-right: 5px">
            <el-form-item :label="res.typeName">
              <el-select
                v-model="res.typeVal"
                value-key="name"
                v-on:click="lastValue = res.typeVal.index"
                @change="resChanged($event, index)"
                :ref="res.nameVal"
              >
                <el-option
                  v-for="option in res.typeOptions"
                  :class="{ selectDisplayNone: option.disabled }"
                  :key="option.name"
                  :label="option.info.DisplayName"
                  :value="option"
                >
                  <!-- :style="{'display:none': option.disabled}" -->
                  <!-- <span v-if="!option.disabled">{{ option.disabled }}</span> -->
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-row>
              <el-col
                :span="2"
                v-for="(item, index) in res.items"
                :key="index"
                style="padding-right: 5px"
              >
                <el-form-item :label="item.displayName">
                  <el-select
                    v-if="item.options !== ''"
                    v-model="item.value"
                    value-key="id"
                    style="width: 100%"
                  >
                    <el-option
                      v-for="option in item.options"
                      :key="option.id"
                      :label="option.label"
                      :value="option.id"
                    />
                  </el-select>
                  <el-input-number
                    v-else-if="item.valueRule === 'INT'"
                    v-model="item.value"
                    style="width: 100%"
                    :controls="false"
                  />
                  <el-row v-else-if="item.attrName === 'Color'">
                    <el-col :span="16"
                      ><el-input
                        v-model="item.value"
                        style="padding-right: 1px; padding-bottom: 10px"
                    /></el-col>
                    <el-col :span="8"
                      ><el-color-picker v-model="item.value"
                    /></el-col>
                  </el-row>
                  <el-input v-else v-model="item.value" />
                </el-form-item>
              </el-col>
              <el-col
                :span="2"
                v-show="res.buttonText !== ''"
                style="margin-top: 21px"
                ><el-button type="primary" @click="pointTableHandle(res)">{{
                  res.buttonText
                }}</el-button></el-col
              >
            </el-row>
          </el-col>
          <el-col :span="1">
            <el-button
              icon="Delete"
              @click="delRes(index)"
              style="margin-top: 15px"
            />
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible_res = false">取消</el-button>
          <el-button type="primary" @click="saveRes"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
  <div>
    <el-dialog v-model="dialogVisible_seg" :show-close="false" width="500">
      <template #header="">
        <div class="my-header">
          <h1 style="font-size: 20px">{{ cardData.nameVal }}</h1>
        </div>
      </template>
      <el-radio-group v-model="cardData.resource">
        <el-radio
          v-for="(res, index) in embResOptions"
          :key="index"
          :label="res.label"
          >{{ res.text }}</el-radio
        >
      </el-radio-group>
    </el-dialog>
  </div>
  <OPCUA_RES v-if="opcuaPointObj.status" v-model="opcuaPointObj"></OPCUA_RES>
  <MODBUS_RES
    v-if="modbusPointObj.status"
    v-model="modbusPointObj"
  ></MODBUS_RES>

</template>

<script setup lang="ts">
import cache from "@/plugins/cache.ts";
import sysApi from "@/api/sysApi";
import G6 from "@antv/g6";
import { v4 as uuidv4 } from "uuid";
import { baseUrl } from "@/api/baseUrl";
import { ref } from "vue";
import { toRaw } from "@vue/reactivity";
import {
  useDeploymentMenuStore,
  useDeploymentNodeIDStore,
  useDeploymentNodeDragStore,
} from "@/store/deploymentStore.js";
import { segMapDev, getSegMapDev } from "@/utils/segMapDevHelper.js";
import OPCUA_RES from "@/components/pointTable/OPCUA_RES.vue";
import MODBUS_RES from "@/components/pointTable/MODBUS_RES.vue";
import {  VxeTablePropTypes, VxeTableInstance } from 'vxe-table'
import {Delete, Download} from "@element-plus/icons-vue";
const deploymentMenuStore = useDeploymentMenuStore();
const deploymentNodeIDStore = useDeploymentNodeIDStore();
const deploymentNodeDragStore = useDeploymentNodeDragStore();
const menuID = useRoute().params.id;
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const activeName = ref('read')

interface RowVO {
  id: number
  parentId: number | null
  name: string
  type: string
  size: number
  date: string
}

const loading = ref(false)
const tableData = ref<RowVO[]>([])

const tableRef = ref<VxeTableInstance<RowVO>>()
const toolbarRef = ref<VxeToolbarInstance>()

const findList = () => {
  return new Promise(resolve => {
    tableData.value = [
      { id: 10000, parentId: null, name: 'vxe-table test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
      { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
      { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
      { id: 20045, parentId: 24300, name: 'vxe-table test abc4', type: 'html', size: 600, date: '2021-04-01' },
      { id: 10053, parentId: 24300, name: 'vxe-table test abc96', type: 'avi', size: 0, date: '2021-04-01' },
      { id: 24330, parentId: 10053, name: 'vxe-table test abc5', type: 'txt', size: 25, date: '2021-10-01' },
      { id: 21011, parentId: 10053, name: 'Test6', type: 'pdf', size: 512, date: '2020-01-01' },
      { id: 22200, parentId: 10053, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 23666, parentId: null, name: 'Test8', type: 'xlsx', size: 2048, date: '2020-11-01' },
      { id: 23677, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 23671, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 23672, parentId: 23677, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 23688, parentId: 23666, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 23681, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 23682, parentId: 23688, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 24555, parentId: null, name: 'vxe-table test abc9', type: 'avi', size: 224, date: '2020-10-01' },
      { id: 24566, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' },
      { id: 24577, parentId: 24555, name: 'Test7', type: 'js', size: 1024, date: '2021-06-01' }
    ]
  })
}

const searchMethod = () => {
  const $table = tableRef.value
  if ($table) {
    // 清除所有状态
    $table.clearAll()
    return findList()
  }
  return Promise.resolve()
}

const insertRow = async (currRow: RowVO, locat: string) => {
  const $table = tableRef.value
  if ($table) {
    const date = new Date()
    // 如果 null 则插入到目标节点顶部
    // 如果 -1 则插入到目标节点底部
    // 如果 row 则有插入到效的目标节点该行的位置
    const rid = Date.now()
    if (locat === 'current') {
      const record = {
        name: `新数据${rid}`,
        id: rid,
        parentId: currRow.parentId, // 父节点必须与当前行一致
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
      const { row: newRow } = await $table.insertAt(record, currRow)
      await $table.setEditRow(newRow) // 插入子节点
    } else if (locat === 'top') {
      const record = {
        name: `新数据${rid}`,
        id: rid,
        parentId: currRow.id, // 需要指定父节点，自动插入该节点中
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
      const { row: newRow } = await $table.insert(record)
      await $table.setTreeExpand(currRow, true) // 将父节点展开
      await $table.setEditRow(newRow) // 插入子节点
    } else if (locat === 'bottom') {
      const record = {
        name: `新数据${rid}`,
        id: rid,
        parentId: currRow.id, // 需要指定父节点，自动插入该节点中
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
      }
      const { row: newRow } = await $table.insertAt(record, -1)
      await $table.setTreeExpand(currRow, true) // 将父节点展开
      await $table.setEditRow(newRow) // 插入子节点
    }
  }
}
const removeRow = async (row: RowVO) => {
  const $table = tableRef.value
  if ($table) {
    await $table.remove(row)
  }
}

const insertEvent = async () => {
  const $table = tableRef.value
  if ($table) {
    const date = new Date()
    const rid = Date.now()
    const record = {
      name: `新数据${rid}`,
      id: rid,
      parentId: null,
      date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }
    const { row: newRow } = await $table.insert(record)
    await $table.setEditRow(newRow)
  }
}

const getInsertEvent = () => {
  const $table = tableRef.value
  if ($table) {
    const insertRecords = $table.getInsertRecords()
    proxy?.$modal.msgSuccess(`新增：${insertRecords.length}`);
  }
}

const getRemoveEvent = () => {
  const $table = tableRef.value
  if ($table) {
    const removeRecords = $table.getRemoveRecords()
    console.log(removeRecords.length)
  }
}

const getUpdateEvent = () => {
  const $table = tableRef.value
  if ($table) {
    const updateRecords = $table.getUpdateRecords()
    proxy?.$modal.msgSuccess(`更新：${updateRecords.length}`)
  }
}

nextTick(() => {
  // 将表格和工具栏进行关联
  findList()
})
let isCardShow = ref(false);
let devices = ref([]);
let cardData = ref({
  name: "",
  nameVal: "",
  typeName: "",
  typeVal: "",
  typeDisplayVal: "",
  buttonLabel: "", //资源列表、动态接口
  buttonText: "", //编辑、配置
  largeType: "", //target_device、device、segment
  items: [
    {
      attrName: "",
      displayName: "",
      value: "",
      valueRule: "",
      options: [{ id: "", label: "" }],
    },
  ],
});
// 动态接口
let dynamic = ref([
  {
    attrName: "",
    displayName: "",
    value: "",
    valueRule: "",
    options: [{ id: "", label: "" }],
  },
]);
// 由于增加了formRes变量，其实这里不需要ref，暂时不改了
let resources = ref([
  {
    id: "",
    name: "",
    nameVal: "",
    typeName: "",
    typeVal: -1,
    typeOptions: [],
    buttonText: "",
    items: [
      {
        attrName: "",
        displayName: "",
        value: "",
        valueRule: "",
        options: [{ id: "", label: "" }],
      },
    ],
  },
]);
// 为了符合表单验证所定义的格式list:resources
let formRes = ref({ list: [] });
let resourceList = [];
let embResOptions = ref([]);
let dialogVisible_res = ref(false);
let dialogVisible_seg = ref(false);
const dialog_config = reactive<DialogOption>({
  visible: false,
  title: ''
});
// 资源下拉选中改变前的值
let lastValue = -1;

// 设备库
const iconPath = baseUrl + "/devimgs/";
// const iconPath = 'http://10.89.34.70:8081/devimgs/';
const drawer = ref(true);
let funcTitle = ref("隐藏设备库");
const filterText = ref("");
const treeRef = ref();
const defaultProps = {
  children: "children",
  label: (data, node) => {
    // console.log(data)
    if (data.jsonContent !== "") {
      data.info = JSON.parse(data.jsonContent);
      // console.log(data.info)
      return data.info.DisplayName;
    }
    return data.name;
  },
};

// 部署方案动态树
let deploymentMenu = [
  { funcName: "控制器", child: [] },
  { funcName: "网络段", child: [] },
  { funcName: "未分配终端", child: [] },
];
// 图形
const container = ref();
const clickWidth = 3;
const netMaxSize = [150, 30];
const netInsideSize = [150 - clickWidth, 10 - clickWidth];
const leftTreeWidth = 180 + netMaxSize[1] / 2;
const topTitleWidth = 100;
const deviceMaxSize = [80, 100];
const deviceImage = [70, 70];
// true时，delete按钮删除node和edge时无效
let isLeaveCanvas = false;
let isDragDrop = false;
G6.registerNode(
  "segment", // 网络段
  {
    // 绘制逻辑
    draw: (cfg, group) => {
      const keyShape = group.addShape("rect", {
        attrs: {
          width: netMaxSize[0],
          height: netMaxSize[1],
          lineWidth: 1,
          stroke: "#808080", //cfg,color,也可以在创建的时候设置
          fill: "#fff",
        },
        draggable: true,
        name: "rect-max",
      });
      group.addShape("rect", {
        attrs: {
          x: clickWidth / 2,
          y: netMaxSize[1] - netInsideSize[1] - clickWidth / 2,
          width: netInsideSize[0],
          height: netInsideSize[1],
          fill: cfg.color, //"#4CAF50"
        },
        draggable: true,
        name: "rect-inside",
      });
      group.addShape("text", {
        attrs: {
          x: clickWidth / 2,
          y: netMaxSize[1] - netInsideSize[1],
          textAlign: "left",
          // textBaseline: "top",
          text: cfg.label,
          fontSize: 20,
          fill: "#000",
        },
        draggable: true,
        name: "text-left",
      });
      return keyShape;
    },
    // afterDraw: (cfg, group) => {},

    // // 更新逻辑
    // update: (cfg, item) => {},
    // afterUpdate: (cfg, item) => {},

    // // (交互)状态响应逻辑
    setState: (name, value, item) => {
      switchClickStyle(name, value, item);
      // console.log('setState',name, value, item)
    },
  }
  // 'rect' // 继承的内置节点类型名称
);
G6.registerNode(
  "device", // 控制器和现场设备
  {
    // 绘制逻辑
    draw: (cfg, group) => {
      const keyShape = group.addShape("rect", {
        attrs: {
          width: deviceMaxSize[0],
          height: deviceMaxSize[1],
          lineWidth: 1,
          stroke: "#808080", //cfg,color,也可以在创建的时候设置
          fill: "#fff",
        },
        draggable: true,
        name: "rect-max",
      });
      const marginLeft = (deviceMaxSize[0] - deviceImage[0]) / 2;
      group.addShape("image", {
        attrs: {
          x: marginLeft,
          y: marginLeft,
          width: deviceImage[0],
          height: deviceImage[1],
          img: cfg.img,
          // opacity: 1
        },
        draggable: true,
        name: "img-inside",
      });
      group.addShape("text", {
        attrs: {
          x: deviceMaxSize[0] / 2,
          y: marginLeft * 2 + deviceImage[1] + 20, //要考虑字体大小对于位置的影响
          // width: deviceMaxSize[0],
          textAlign: "center",
          // textBaseline: "bottom",
          text: cfg.label,
          fontSize: 20,
          fill: "#000",
        },
        draggable: true,
        name: "text-center",
      });
      // 控制器添加资源时用到，可方块显示全部资源，考虑到不好看，暂时不做

      return keyShape;
    },
    afterDraw: (cfg, group) => {
      // 文字超长时自适应边框
      let width = group.getBBox().width;
      if (width > deviceMaxSize[0]) {
        const shapes = group.get("children");
        shapes[0].attr("width", width);
        shapes[1].attr("x", (width - deviceImage[0]) / 2);
        shapes[2].attr("x", width / 2);
      }
    },

    // // 更新逻辑
    // update: (cfg, item) => {},
    // afterUpdate: (cfg, item) => {},

    // // (交互)状态响应逻辑
    setState: (name, value, item) => {
      switchClickStyle(name, value, item);
      // console.log('setState',name, value, item)
    },
  }
  // 'rect' // 继承的内置节点类型名称
);
const switchClickStyle = (name, value, item) => {
  const group = item.getContainer();
  const shapes = group.get("children");
  const shape = shapes[0];
  if (name === "selected" || name === "highlight") {
    if (value) {
      // 选中样式
      shape.attr({ stroke: "#1E90FF", lineWidth: clickWidth });
    } else {
      shape.attr({ stroke: "#808080", lineWidth: 1 });
    }
  } else if (name === "dark") {
    // 为了挡住中心线，外围框不透明
    if (value) {
      // 选中样式
      shapes[1].attr({ opacity: 0.2 });
      shapes[2].attr({ opacity: 0.2 });
      // shapes.forEach((el) => {el.attr({'opacity': 0.2})})
    } else {
      // shapes.forEach((el) => {el.attr({'opacity': 1})})
      shapes[1].attr({ opacity: 1 });
      shapes[2].attr({ opacity: 1 });
    }
  }
};
// 当前拖入的所有网络段和设备，对应交大部署中的控制器下拉框
let curDevices = ref({
  val: "",
  options: [],
});
let graph;
let curGraphItemBegin;
const cacheKey = "deployment";
let curGraphData;
let deploymentJson;
// 连线时判定是否是网络段连接控制器，是则创建线后，将线存在网络段和控制器中
// 当删除线后，网络段根据是否存在此线判断当前连接资源是否还有效，同时便于撤销回退
// 控制器删除资源时，同样根据线是否存在判断，是否要修正当前网络段所连接的资源
let isSegLinkDev = false;
// 为了利用内置的undo和redo
const toolbar = new G6.ToolBar({ className: "g6-toolbar-display" });
const initData = () => {
  curDevices.value.options = [];
  deploymentJson = cache.local.getJSON(cacheKey);
  if (deploymentJson) {
    curGraphData = deploymentJson;
  }
  if (curGraphData) graph.data(curGraphData);
  graph.render();
};
const getTypeShow = (type) => {
  switch (type) {
    case "segment":
      return "网络段";
    case "device":
      return "控制器";
    case "target_device":
      return "终端设备";
    default:
      return;
  }
};
const initGraph = () => {
  let graphWidth = container.value.offsetWidth;
  let graphHeight = window.innerHeight;
  let minimap = new G6.Minimap({
    size: [graphWidth / 8, graphHeight / 8],
  });
  graph = new G6.Graph({
    linkCenter: true,
    container: "container",
    width: graphWidth,
    height: graphHeight,
    plugins: [minimap, toolbar], //context Menuplugins: [toolbar],minimap
    enabledStack: true,
    modes: {
      default: [
        "zoom-canvas",
        "drag-canvas",
        // 'brush-select',
        "drag-node",
        {
          type: "brush-select",
          trigger: "shift",
          onSelect: (nodes) => {
            isLeaveCanvas = false;
            isCardShow.value = false;
          },
        },
        {
          type: "click-select",
          trigger: "shift",
        },
        {
          type: "create-edge",
          key: "shift",
          trigger: "drag", // 'click' by default. options: 'drag', 'click'
          shouldBegin: (e) => {
            curGraphItemBegin = {
              model: e.item.get("model"),
              edges: e.item.get("edges"),
            };
            // console.log('shouldBegin',curGraphItemBegin)
            return true;
          },
          shouldEnd: (e) => {
            // console.log('shouldEnd',e)
            let model = e.item.get("model");
            let edges = e.item.get("edges");
            let modelBegin = curGraphItemBegin.model;
            let edgesBegin = curGraphItemBegin.edges;
            // console.log(model)
            // 终端设备和控制器的type均为device,同样类型不可互连，控制器和终端设备不可互连，网络段可连多个控制器和终端设备
            if (model.type === modelBegin.type) return false;
            // 两个同样的node之间只允许一条边
            for (let edge of edges) {
              let edgeModel = edge.get("model");
              // 起点和起点相同，终点和终点相同
              if (
                edgeModel.source === modelBegin.id &&
                edgeModel.target === model.id
              )
                return false;
              // 起点和终点相同，终点和起点相同
              if (
                edgeModel.source === model.id &&
                edgeModel.target === modelBegin.id
              )
                return false;
            }
            // 网络段只能连一个控制器
            if (modelBegin.type === "segment" && model.info.Type === "device") {
              if (!isSegLinkDevFun(edgesBegin, modelBegin, model)) return false;
            } else if (
              modelBegin.info.Type === "device" &&
              model.type === "segment"
            ) {
              if (!isSegLinkDevFun(edges, model, modelBegin)) return false;
            }
            // 同一个设备只能连一个网络段，且其中规则符合设备树结构
            if (
              modelBegin.type === "segment" &&
              model.info.Type === "target_device"
            ) {
              if (!isSegLinkTarFun(edges, modelBegin, model)) return false;
            } else if (
              modelBegin.info.Type === "target_device" &&
              model.type === "segment"
            ) {
              if (!isSegLinkTarFun(edgesBegin, model, modelBegin)) return false;
            }
            // curGraphData = graph.save();
            // console.log(curGraphData)
            return true;
          },
        },
      ],
    },
    // defaultNode: {
    //   type: 'rect',
    //   style: {
    //     fill: '#4CAF50',
    //     // stroke: '#ccc',
    //   }
    // },
    defaultEdge: {
      type: "polyline",
      style: {
        stroke: "#4CAF50",
        lineWidth: 2,
        // endArrow: true,
      },
    },
    edgeStateStyles: {
      selected: {
        stroke: "#1E90FF",
        shadowBlur: 0,
      },
      highlight: {
        stroke: "#1E90FF",
        shadowBlur: 0,
      },
      dark: {
        opacity: 0.2,
      },
    },
  });

  // if (curGraphData) graph.data(curGraphData);
  // graph.render();
  //combo的事件
  // graph.on('combo:mouseenter', (evt) => {
  //   const { item } = evt;
  //   graph.setItemState(item, 'active', true);
  // });

  // graph.on('combo:mouseleave', (evt) => {
  //   const { item } = evt;
  //   graph.setItemState(item, 'active', false);
  // });
  // graph.on('combo:click', (evt) => {
  //   const { item } = evt;
  //   graph.setItemState(item, 'selected', true);
  //   showProp.value=2;
  // });

  // //边的事件
  graph.on("edge:click", (evt) => {
    const { item } = evt;
    // let nodes = graph.findAllByState("node", "selected");
    // nodes.forEach((el) => {
    //   el.setItemState('selected',false);
    // })
    item.setState("selected", true);
    isLeaveCanvas = false;
    isCardShow.value = false;
    // showProp.value=3;
    // getEdgesById({id:item.get("id"),from:item.getSource().get("id"),to:item.getTarget().get("id")});
  });

  graph.on("aftercreateedge", (e) => {
    // console.log('aftercreateedge:',e)
    let edge = e.edge;
    let edgeId = edge.get("id");
    let sModel = edge.get("sourceNode").get("model");
    let tModel = edge.get("targetNode").get("model");
    if (isSegLinkDev) {
      sModel.cardInfo.edge = edgeId;
      tModel.cardInfo.edge = edgeId;
      isSegLinkDev = false;
    }
    changeTarToMenuWhenLink(sModel, tModel);
    deploymentMenuStore.deploymentMenu = {
      menuID: menuID,
      child: deploymentMenu,
    };
  });
  //鼠标事件
  graph.on("node:mouseenter", (e) => {});
  graph.on("node:mouseleave", (e) => {});

  // // if create-edge is canceled before ending, update the 'links' on the anchor-point circles
  //   graph.on('afterremoveitem', e => {
  //     if (e.item && e.item.source && e.item.target) {
  //       const sourceNode = graph.findById(e.item.source);
  //       const targetNode = graph.findById(e.item.target);
  //       const { sourceAnchor, targetAnchor } = e.item;
  //       if (sourceNode && !isNaN(sourceAnchor)) {
  //         const sourceAnchorShape = sourceNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === sourceAnchor));
  //         sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1);
  //       }
  //       if (targetNode && !isNaN(targetAnchor)) {
  //         const targetAnchorShape = targetNode.getContainer().find(ele => (ele.get('name') === 'anchor-point' && ele.get('anchorPointIdx') === targetAnchor));
  //         targetAnchorShape.set('links', targetAnchorShape.get('links') - 1);
  //       }
  //     }
  //   })

  // // after clicking on the first node, the edge is created, update the sourceAnchor
  //   graph.on('afteradditem', e => {
  //     if (e.item && e.item.getType() === 'edge') {
  //       graph.updateItem(e.item, {
  //         sourceAnchor: sourceAnchorIdx
  //       });
  //     }
  //   })

  //节点的事件
  graph.on("afteradditem", (e) => {
    const model = e.model; // 获取添加的节点实例
    // console.log('节点被添加:', e)
    if (isDragDrop) {
      isDragDrop = false;
      return;
    }
    if (model.type === "polyline") {
      if (model.source === model.target) return;
      let sModel = e.item.get("sourceNode").get("model");
      let tModel = e.item.get("targetNode").get("model");
      changeTarToMenuWhenLink(sModel, tModel);
      // console.log('节点被添加:', deploymentMenu[2].child);
    } else {
      switch (model.cardInfo.largeType) {
        case "device":
          deploymentMenu[0].child.push({
            funcName: model.cardInfo.nameVal,
            id: model.id,
            bigType: "deployment",
          });
          break;
        case "segment":
          deploymentMenu[1].child.push({
            funcName: model.cardInfo.nameVal,
            id: model.id,
            bigType: "deployment",
          });
          break;
        case "target_device":
          // 实测设备加载完时，线还未加载
          deploymentMenu[2].child.push({
            funcName: model.cardInfo.nameVal,
            id: model.id,
            bigType: "deployment",
            type: "target_device",
            typeName: model.info.Name,
          });
          break;
        default:
          break;
      }
    }
    deploymentMenuStore.deploymentMenu = {
      menuID: menuID,
      child: deploymentMenu,
    };
    // console.log('节点被添加:', deploymentMenu[2].child); // 输出节点的数据
  });
  graph.on("afterremoveitem", (e) => {
    const model = e.item; // 获取添加的节点实例
    // console.log('节点被删除:', e); // 输出节点的数据
    // 在这里可以执行其他逻辑
    if (isDragDrop) {
      isDragDrop = false;
      return;
    }
    if (e.type === "edge") {
      // console.log('节点被删除:', graph.findById(model.source));
      let sNode = graph.findById(model.source);
      let tNode = graph.findById(model.target);
      if (!sNode || !tNode) return;
      let sModel = sNode.get("model");
      let tModel = tNode.get("model");
      let tarModel;
      if (sModel.type === "segment" && tModel.info.Type === "target_device") {
        tarModel = tModel;
      } else if (
        tModel.type === "segment" &&
        sModel.info.Type === "target_device"
      ) {
        tarModel = sModel;
      }
      if (tarModel) {
        delTarFromMenuWhenLink(tarModel);
        deploymentMenu[2].child.push({
          funcName: tarModel.cardInfo.nameVal,
          id: tarModel.id,
          bigType: "deployment",
          type: "target_device",
          typeName: tarModel.info.Name,
        });
      }
    } else {
      // console.log('节点被删除:',model)
      switch (model.cardInfo.largeType) {
        case "device":
          deploymentMenu[0].child = deploymentMenu[0].child.filter((el) => {
            return el.id !== model.id;
          });
          break;
        case "segment":
          let index = deploymentMenu[1].child.findIndex((el) => {
            return el.id === model.id;
          });
          let tars = deploymentMenu[1].child[index].child[0].child;
          tars.forEach((el) => {
            deploymentMenu[2].child.push(el);
          });
          deploymentMenu[1].child.splice(index, 1);
          break;
        case "target_device":
          let oldLen = deploymentMenu[2].child.length;
          deploymentMenu[2].child = deploymentMenu[2].child.filter((el) => {
            return el.id !== model.id;
          });
          // 没有删除，就要从link中删除
          if (deploymentMenu[2].child.length === oldLen) {
            delTarFromMenuWhenLink(model);
          }
          break;
        default:
          break;
      }
    }
    deploymentMenuStore.deploymentMenu = {
      menuID: menuID,
      child: deploymentMenu,
    };
  });
  graph.on("node:click", (evt) => {
    if (!evt.originalEvent.shiftKey) {
      let item = evt.item;
      // console.log('click',evt)
      nodeSelected(item);
    }
  });
  graph.on("node:mousedown", (evt) => {
    if (evt.originalEvent.shiftKey) {
      // console.log('node:mousedown')
      evt.item?.lock();
    }
    isLeaveCanvas = false;
  });
  graph.on("node:mouseup", (evt) => {
    if (evt.originalEvent.shiftKey) {
      evt.item?.unlock();
    }
    isLeaveCanvas = false;
  });
  //   graph.on('node:dblclick', nodeDbClick);
  //   // 监听图数据更新事件
  //   graph.on('afterupdateitem', (e) => {
  //     saveDataToServer();
  //   });
  graph.on("canvas:click", (evt) => {
    isLeaveCanvas = false;
    isCardShow.value = false;
    clearAllStats();
  });
  graph.on("canvas:mouseleave", (evt) => {
    isLeaveCanvas = true;
    // console.log('canvas:mouseleave');
  });
};
const delEdgeByTar = (tarNodeId) => {
  let edges = graph.findById(tarNodeId).get("edges");
  // console.log('delEdgeByTar',edges)
  for (let edge of edges) {
    let sModel = edge.get("sourceNode").get("model");
    let tModel = edge.get("targetNode").get("model");
    if (sModel.type === "segment" || tModel.type === "segment") {
      isDragDrop = true;
      graph.removeItem(edge);
      break;
    }
  }
};
deploymentNodeDragStore.$subscribe((mutate, state) => {
  // console.log("subscribe", mutate);
  let op = state.operation;
  // console.log('deploymentNodeDragStore',mutate.events.key)
  if (mutate.events.key === "value") {
    if (op.op === "removeEdge") {
      delEdgeByTar(op.tarNodeId);
    } else if (op.op === "addEdge") {
      delEdgeByTar(op.model.source);
      isDragDrop = true;
      graph.addItem("edge", op.model);
      // console.log('addEdge')
    }
  }
});
const delTarFromMenuWhenLink = (model) => {
  for (let seg of deploymentMenu[1].child) {
    // debugger
    if (!seg.child || seg.child.length === 0) continue;
    let len = seg.child[0].child.length;
    seg.child[0].child = seg.child[0].child.filter((el) => {
      return el.id !== model.id;
    });
    let newLen = seg.child[0].child.length;
    if (newLen < len) {
      if (newLen === 0) {
        seg.child = [];
      }
      break;
    }
  }
};
const changeTarToMenuWhenLink = (sModel, tModel) => {
  let segModel;
  let tarModel;
  if (sModel.type === "segment" && tModel.info.Type === "target_device") {
    tarModel = tModel;
    segModel = sModel;
  } else if (
    tModel.type === "segment" &&
    sModel.info.Type === "target_device"
  ) {
    tarModel = sModel;
    segModel = tModel;
  }
  if (tarModel) {
    // console.log('tarModel',tarModel);
    // console.log('deploymentMenu[2].child before',deploymentMenu[2].child);
    deploymentMenu[2].child = deploymentMenu[2].child.filter((el) => {
      return el.id !== tarModel.id;
    });
    // console.log('deploymentMenu[2].child after',deploymentMenu[2].child);
    for (let seg of deploymentMenu[1].child) {
      if (seg.id === segModel.id) {
        if (!seg.child || seg.child.length === 0) {
          seg.child = [];
          seg.child.push({
            funcName: "终端设备",
            child: [],
            typeName: segModel.info.Name,
          });
        }
        seg.child[0].child.push({
          funcName: tarModel.cardInfo.nameVal,
          id: tarModel.id,
          bigType: "deployment",
          type: "target_device",
          typeName: tarModel.info.Name,
        });
        break;
      }
    }
  }
};
const isSegLinkTarFun = (edges, segModel, tarModel) => {
  for (let edge of edges) {
    // 同一个设备只能连一个网络段
    let node = edge.get("targetNode");
    if (
      node &&
      (node.get("model").type === "segment" ||
        edge.get("sourceNode").get("model").type === "segment")
    )
      return false;
  }
  // 是否符合规则
  let segName = segModel.info.Name;
  let tarName = tarModel.info.Name;
  if (
    !segMapDev[segName].some((el) => {
      return el.info.Name === tarName;
    })
  )
    return false;
  return true;
};
const isSegLinkDevFun = (edges, segModel, devModel) => {
  for (let edge of edges) {
    let node = edge.get("targetNode");
    if (
      node &&
      (node.get("model").info.Type === "device" ||
        edge.get("sourceNode").get("model").info.Type === "device")
    )
      return false;
  }
  // 组装EMB_RES资源列表，应该写成函数，默认第一个EMB，点击segNode时，判断（连线时没有，后又加上时false）会调用，否则直接赋值即可
  isSegLinkDev = true;
  segModel.cardInfo.resource = setEMBRES(devModel);
  return true;
};
const clearAllStats = () => {
  graph.setAutoPaint(false);
  graph.getNodes().forEach(function (node) {
    let isSelected = getIsSelected(node);
    graph.clearItemStates(node);
    if (isSelected) graph.setItemState(node, "selected", true);
  });
  graph.getEdges().forEach(function (edge) {
    let isSelected = getIsSelected(edge);
    graph.clearItemStates(edge);
    if (isSelected) graph.setItemState(edge, "selected", true);
  });
  graph.paint();
  graph.setAutoPaint(true);
};
const getIsSelected = (elg6) => {
  for (let el of elg6.get("states")) {
    if (el === "selected") {
      return true;
    }
  }
  return false;
};
const setEMBRES = (deviceNodeModel) => {
  for (let res of deviceNodeModel.resources) {
    if (res.typeVal.name === "EMB_RES") {
      return res.id;
    }
  }
};
const nodeSelected = (item) => {
  let model = item.getModel();
  clearAllStats();
  if (model.info.Type === "device" || model.type === "segment") {
    graph.setAutoPaint(false);
    graph.getNodes().forEach((node) => {
      graph.clearItemStates(node);
      graph.setItemState(node, "dark", true);
    });
    graph.setItemState(item, "dark", false);
    graph.setItemState(item, "highlight", true);
    graph.getEdges().forEach((edge) => {
      if (edge.getSource() === item) {
        graph.setItemState(edge.getTarget(), "dark", false);
        graph.setItemState(edge.getTarget(), "highlight", true);
        graph.setItemState(edge, "highlight", true);
        edge.toFront();
      } else if (edge.getTarget() === item) {
        graph.setItemState(edge.getSource(), "dark", false);
        graph.setItemState(edge.getSource(), "highlight", true);
        graph.setItemState(edge, "highlight", true);
        edge.toFront();
      } else {
        graph.setItemState(edge, "dark", true);
        graph.setItemState(edge, "highlight", false);
      }
    });
    graph.paint();
    graph.setAutoPaint(true);
  }
  // console.log(model)
  item.setState("selected", true);
  cardData.value = model.cardInfo;
  isLeaveCanvas = false;
  isCardShow.value = true;
};
// nodeType必须是Seg，Dev,Tar,对应g6的node，生成默认名也用到，规则是前三位+max数字
const addNode = (x, y, data) => {
  let uuid = uuidv4();
  let num = 1;
  let nodeType = "Seg";
  // data.info = JSON.parse(data.jsonContent);
  // console.log(data.info)
  if (data.info.Type === "target_device") {
    nodeType = "Tar";
  } else if (data.info.Type === "device") {
    nodeType = "Dev";
  }
  let icon = data.images;
  let nodes = graph.findAll("node", (node) => {
    return node.get("model").nodeType === nodeType;
  });
  // console.log(nodes)
  if (nodes.length > 0) {
    num =
      Math.max(
        ...nodes.map((node) => {
          let label = node.get("model").label;
          if (label.slice(0, 3) === nodeType) {
            let ret = label.slice(3);
            return parseInt(ret) ? parseInt(ret) : 0;
          }
        })
      ) + 1;
  }
  let node = {
    id: uuid,
    label: nodeType + num,
    x: x,
    y: y,
    // size: netSize,
    // type: type,
    nodeType: nodeType,
    info: data.info,
    cardInfo: {},
  };
  let type;
  if (nodeType === "Dev" || nodeType === "Tar") {
    type = "device";
    node.img = iconPath + icon;
  } else if (nodeType === "Seg") {
    type = "segment";
    node.color = icon; //'#4CAF50'icon
  }
  // 注册的node
  node.type = type;
  node = cardDataInit(node);
  graph.addItem("node", node);
};
// 设备库
const showOrHidden = () => {
  //monacoEditor.layout();
  drawer.value = !drawer.value;
  funcTitle.value = drawer.value ? "隐藏设备库" : "显示设备库";
};
watch(filterText, (val) => {
  treeRef.value.filter(val);
});
const filterNode = (value, data) => {
  if (!value) return true;
  // value = value.toUpperCase();
  // return data.name.includes(value);
  return data.label.includes(value);
};
const allowdrag = (node) => {
  if (node.data.jsonContent === "") return false;
  else return true;
};
const handleDragEnd = (draggingNode, dropNode, dropType, e) => {
  // console.log('屏幕坐标',{x:e.x,y:e.y})
  // console.log('屏幕坐标',{x:e.x - leftTreeWidth,y:e.y - topTitleWidth})
  let viewPos = graph.getPointByClient(e.x, e.y);
  // console.log('视口坐标',viewPos)
  // let canvasPos = graph.getCanvasByPoint(viewPos.x,viewPos.y)
  // console.log('画布坐标',canvasPos)
  addNode(viewPos.x, viewPos.y, draggingNode.data);
};
// 下拉查询并快速定位
const setDevicePosition = (val) => {
  let nodes = graph.findAllByState("node", "selected");
  nodes.forEach((el) => {
    el.setState("selected", false);
  });
  let item = graph.findById(val);
  // console.log(val);
  nodeSelected(item);
  graph.focusItem(item);
};
const loadDevicesData = (val) => {
  if (val) {
    curDevices.value.options = [];
    let nodes = graph.getNodes();
    nodes.forEach((el) => {
      let model = el.get("model");
      curDevices.value.options.push({
        id: model.id,
        label: model.label,
        typeShow: getTypeShow(model.cardInfo.largeType),
      });
    });
  }
};
deploymentNodeIDStore.$subscribe((mutate, state) => {
  // console.log("subscribe", state.nodeId);
  setDevicePosition(state.nodeId);
});
// 资源
const showDialog = (largeType) => {
  if (largeType === "device") {
    sysApi.getResourcesList().then(async (res) => {
      res.splice(0, 1);
      res.forEach((el, index) => {
        el.info = JSON.parse(el.jsonContent);
        el.index = index;
        el.disabled = false;
      });
      resourceList = res;
      // console.log('全资源列表:',res);
      let nodes = graph.findAllByState("node", "selected");
      let tmp = nodes[0].get("model").resources;
      resources.value = tmp ? tmp : [];
      formRes.value = { list: toRaw(resources.value) };
      // console.log('dev资源列表:',res);
      dialogVisible_res.value = true;
    });
  } else if (largeType === "segment") {
    let nodes = graph.findAllByState("node", "selected");
    embResOptions.value = [];
    let node = getEmbResStatus(nodes[0]);
    if (node !== "") getEmbResOptions(node.get("model"));
    dialogVisible_seg.value = true;
  } else if (largeType === "target_device") {
    dialog_config.visible = true;
  }
};
const getEmbResOptions = (model) => {
  // console.log(model)
  model.resources.forEach((el) => {
    if (el.typeVal.name === "EMB_RES") {
      embResOptions.value.push({
        label: el.id,
        text: model.label + "." + el.nameVal,
      });
    }
  });
};
const validateResName = (rule, value, callback) => {
  if (
    resources.value.filter((el) => {
      return el.nameVal === value;
    }).length > 1
  ) {
    callback(new Error("资源名称不可重复"));
  } else callback();
};
const rulesRes = reactive({
  nameVal: [
    { required: true, message: "不能为空", trigger: "change" },
    { validator: validateResName, trigger: "change" },
  ],
});
const addRes = () => {
  let num = 1;
  if (resources.value.length > 0) {
    num =
      Math.max(
        ...resources.value.map((res) => {
          if (res.nameVal.slice(0, 3) === "RES") {
            let ret = res.nameVal.slice(3);
            return parseInt(ret) ? parseInt(ret) : 0;
          }
        })
      ) + 1;
  }
  let resource = {
    id: uuidv4(),
    name: "资源名称",
    nameVal: "RES" + num,
    typeName: "资源类型",
    typeVal: {},
    typeOptions: resourceList,
    buttonText: "",
    items: [],
  };
  resources.value.push(resource);
  // console.log(resources)
};
const delRes = (index) => {
  // console.log(resources.value[index])
  let type = resources.value[index].typeVal;
  if (type.name === "EMB_RES") {
    let nodes = graph.findAllByState("node", "selected");
    let segNode = getEmbResStatus(nodes[0]);
    let segModel = segNode.get("model");
    let model = nodes[0].get("model");
    if (
      segModel !== "" &&
      resources.value[index].id === segModel.cardInfo.resource
    ) {
      segModel.cardInfo.resource = setEMBRES(model);
      graph.refreshItem(segNode);
    }
  }
  let ind = type.index;
  if (ind) resourceList[ind].disabled = false;
  resources.value.splice(index, 1);
};
const resChanged = (value, index) => {
  let val = value.info;
  // console.log(val);
  if (val.Limit !== "0") resourceList[value.index].disabled = true;
  if (lastValue) {
    let preSelected = resourceList[lastValue];
    if (preSelected.info.Limit) preSelected.disabled = false;
  }
  resources.value[index].items = getFormatObj(val.VarDeclaration);
  if (val.ResourceTypeName.DisplayName) {
    resources.value[index].buttonText = val.ResourceTypeName.DisplayName;
  } else {
    resources.value[index].buttonText = "";
  }
  // console.log(resources.value);
};
const saveRes = () => {
  dialogVisible_res.value = false;
  let nodes = graph.findAllByState("node", "selected");
  let model = nodes[0].get("model");
  // console.log('saveRes',formRes.value.list)
  model.resources = formRes.value.list; //toRaw(resources.value);
  let segNode = getEmbResStatus(nodes[0]);
  let segModel = segNode.get("model");
  let embres = setEMBRES(model);
  if (
    embres !== "" &&
    segNode !== "" &&
    (!segModel.cardInfo.resource || segModel.cardInfo.resource === "")
  ) {
    segModel.cardInfo.resource = embres;
    console.log("segModel", segModel);
    graph.refreshItem(segNode);
  }
};
const getEmbResStatus = (node) => {
  let model = node.get("model");
  let edges = node.get("edges");
  let tmp = edges.filter((el) => {
    return el.get("id") === model.cardInfo.edge;
  });
  if (tmp.length > 0) {
    let edge = tmp[0];
    let sNode = edge.get("sourceNode");
    let tNode = edge.get("targetNode");
    let sModel = sNode.get("model");
    if (sModel.id === model.id) return tNode;
    else return sNode;
  }
  return "";
};
// 卡片
const syncNodeName = (name) => {
  let node = graph.findAllByState("node", "selected")[0];
  let oldName = node.get("model").label;
  if (oldName === name) return true;
  let nodes = graph.getNodes();
  if (
    nodes.some((el) => {
      return el.get("model").label === name;
    })
  ) {
    cardData.value.nameVal = oldName;
    return false;
  } else {
    let model = node.get("model");
    model.label = name;
    graph.refreshItem(node);
    switch (model.cardInfo.largeType) {
      case "device":
        for (let el of deploymentMenu[0].child) {
          if (el.id === model.id) {
            el.funcName = name;
            break;
          }
        }
        break;
      case "segment":
        for (let el of deploymentMenu[1].child) {
          if (el.id === model.id) {
            el.funcName = name;
            break;
          }
        }
        break;
      case "target_device":
        let edges = node.get("edges");
        if (edges.length > 0) {
          let sModel = edges[0].get("sourceNode").get("model");
          let tModel = edges[0].get("targetNode").get("model");
          let segModel;
          if (sModel.id === model.id) segModel = tModel;
          else if (tModel.id === model.id) segModel = sModel;
          for (let seg of deploymentMenu[1].child) {
            if (seg.id === segModel.id) {
              for (let tar of seg.child[0].child) {
                if (tar.id === model.id) {
                  tar.funcName = name;
                }
                break;
              }
            }
            break;
          }
        } else {
          for (let tar of deploymentMenu[2].child) {
            if (tar.id === model.id) {
              tar.funcName = name;
            }
            break;
          }
        }
        break;
      default:
        break;
    }
    deploymentMenuStore.deploymentMenu = {
      menuID: menuID,
      child: deploymentMenu,
    };
    return true;
  }
};
const validateName = (rule, value, callback) => {
  if (!syncNodeName(value)) {
    callback(new Error("网络段、控制器和终端设备的名称不可重复"));
  } else callback();
};
const rules = reactive({
  nameVal: [
    { required: true, message: "不能为空", trigger: "change" },
    { validator: validateName, trigger: "change" },
  ],
});
const cardDataInit = (node) => {
  let info = node.info;
  // 组装card
  // cardData.value = {}
  let card = {
    name: "名称",
    nameVal: node.label,
    typeName: "类型",
    typeVal: info.Name,
    typeDisplayVal: info.DisplayName,
    largeType: info.Type === "" ? "segment" : info.Type,
    items: [],
  };
  card.items = getFormatObj(info.VarDeclaration);

  if (info.Type === "target_device") {
    card.name = "终端设备";
    card.typeName = "终端设备类型";
    dynamic.value = getFormatObj(info.ResourceTypeName.VarDeclaration);
    if (dynamic.value.length > 0) {
      card.buttonLabel = "动态接口";
      card.buttonText = "配置";
    }
  } else if (info.Type === "device") {
    card.name = "控制器名称";
    card.typeName = "控制器类型";
    card.buttonLabel = "资源列表";
    card.buttonText = "编辑";
  } else {
    card.name = "网络端名称";
    card.typeName = "网络端类型";
    card.buttonLabel = "设备资源";
    card.buttonText = "编辑";
  }
  node.cardInfo = card;
  return node;
  // console.log('cardDataInit',cardData.value)
};
const getFormatObj = (arr) => {
  let ret = [];
  arr.forEach((el) => {
    if (el.Enabled === "1") {
      let rule = getIntType(el.Type);
      ret.push({
        // attrName: capitalToSmall(el.Name),
        attrName: el.Name,
        displayName: el.DisplayName,
        value:
          rule === "INT" && el.InitialValue === ""
            ? undefined
            : el.InitialValue,
        valueRule: rule,
        options: el.Option ? getOptions(el.Option) : "",
      });
    }
  });
  return ret;
};
const getOptions = (str) => {
  let tmp = str === "" ? "" : str.split(",");
  let options = "";
  if (tmp !== "") {
    options = [];
    tmp.forEach((el) => {
      let obj = el.split(":");
      options.push({ id: obj[0], label: obj[1] });
    });
  }
  return options;
};
const capitalToSmall = (str) => {
  return str.slice(0, 1).toLowerCase() + str.slice(1);
};
const getIntType = (str) => {
  // 暂时只限制所有类似int型为数字，其余均不判断
  // 如果要判断IP，需要添加IP类型，否则无法判断
  // 各种int的最后三位都是INT 所以按照此规则判断
  return str.slice(str.length - 3);
};
const saveAll = () => {
  deploymentJson = graph.save();
  cache.local.setJSON(cacheKey, deploymentJson);
};
const saveAllClick = () => {
  saveAll();
  proxy?.$modal.msgSuccess( "保存成功");
};
// let isKeyDown = true;
const handleKeyDown = (e) => {
  // if (e.key === 'Shift' && isKeyDown) {
  //   graph.setMode('createEdge')
  //   console.log('handleKeyDown')
  //   isKeyDown = false
  // }
  if (e.ctrlKey && e.key === "z" && !isLeaveCanvas) toolbar.undo();
  if (e.ctrlKey && e.key === "y" && !isLeaveCanvas) toolbar.redo();
};
const handleKeyUp = (e) => {
  // if (e.key === 'Shift') {
  //   // graph.setMode('default')
  //   // console.log('handleKeyUp')
  //   // isKeyDown = true
  // } else
  if (e.key === "Delete") {
    let edges = graph.findAllByState("edge", "selected");
    let nodes = graph.findAllByState("node", "selected");
    // console.log(nodes)
    if (nodes.length > 0 && !isLeaveCanvas) {
      nodes.forEach((el) => {
        graph.removeItem(el);
      });
      isCardShow.value = false;
      clearAllStats();
    }
    if (edges.length > 0 && !isLeaveCanvas) {
      edges.forEach((el) => {
        graph.removeItem(el);
      });
      clearAllStats();
    }
    // curGraphData = graph.save();
    // console.log(curGraphData)
    // console.log('Delete')
  }
};
onMounted(() => {
  initGraph();
  initData();
  resources.value = [];
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  sysApi.getAllDevicesList().then(async (res) => {
    devices.value = res;
    // console.log('设备库：',res);
    for (let dev of res) {
      if (dev.name === "网络段") {
        getSegMapDev(dev.children);
        break;
      }
    }
    // console.log(segMapDev);
  });
});
onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("keyup", handleKeyUp);
  saveAll();
});

let opcuaPointObj = ref({
  status: false,
});
let modbusPointObj = ref({
  id: "",
  status: false,
  items: [],
});
const pointTableHandle = (res) => {
  console.log("res", res);
  let resName = res.typeVal.name;
  if (resName == "OPCUA_RES") {
    opcuaPointObj.value.status = true;
  } else if (resName == "MODBUSTCP_RES" || resName == "MODBUSRTU_RES") {
    modbusPointObj.value.id = resName;
    modbusPointObj.value.status = true;
    modbusPointObj.value.items = res.items;
  }
};
const saveConfig=()=>{
  proxy?.$modal.msgSuccess("操作成功");
  dialog_config.visible = false;
}
const cancelConfig=()=>{
  dialog_config.visible = false;
}
</script>

<style lang="scss" scoped>
.icon-tree {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
}
:deep(.g6-minimap) {
  position: absolute;
  left: 6px;
  bottom: 6px;
  background-color: #fff;
}
.formRes :deep(.el-form-item__label) {
  font-size: 10px;
  margin-bottom: 1px !important;
}
:deep(.el-dialog__body) {
  padding-top: 1px;
}
:deep(.el-color-picker__trigger) {
  padding: 0px;
}
:deep(.el-radio-group) {
  display: block;
}
:deep(.el-radio) {
  display: block;
}
.wrapper {
  height: calc(100vh - 110px);
  margin-top: 10px;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
}
.func {
  border-radius: 0;
  position: absolute;
  // margin-left: 0;
  // margin-top: -66px;
  right: 10px;
  top: 73px;
}
.rightShow {
  flex-basis: 280px;
  height: 99%;
  overflow-y: auto;
  margin-right: 10px;
}
.rightHidden {
  flex-basis: 0;
  height: 99%;
  overflow-y: auto;
}
.el-dropdown-link {
  cursor: pointer;
  // color: var(--el-color-primary);
  color: #606266;
  display: flex;
  align-items: center;
}
.selectDisplayNone {
  display: none;
}
.g6-toolbar-display {
  display: none;
}
.config_upanddown_button{
  display: flex;
  justify-content: right;
  align-items: center;
}
.config{
  .config_dml_button{
    padding-bottom: 10px;
    display: flex;
    justify-content: right;
    align-items: center;
  }
}

</style>