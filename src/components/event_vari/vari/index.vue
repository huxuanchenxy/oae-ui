<template>
    <div class="vari">
        <div class="left">
            输入
            <div class="table_out">
                <div>
                    <div class="icon"><el-button  size="small" type="primary" plain icon="Plus" @click="handleAddInput"></el-button></div>
                    <div class="icon"><el-button size="small"  type="success" plain icon="Edit" :disabled="singleInput" @click="handleUpdateInput()"></el-button></div>
                    <div class="icon"><el-button  size="small" type="danger" plain icon="Delete" :disabled="multipleInput" @click="handleDeleteInput()"></el-button></div>
                    <div class="icon"><el-button  size="small" type="success" plain icon="Setting"></el-button></div>
                </div>
                <div class="table_in">
                    <el-table :data="inputVariList" style="width: 100%" height="150"  @selection-change="handleSelectionChangeInput">
                        <el-table-column type="selection" width="55"  prop="key"/>
                        <el-table-column label="序号"  prop="no"/>
                        <el-table-column label="名称"   width="100" prop="text"/>
                        <el-table-column label="关联事件" width="150"  prop="relateEveName"/>
                        <el-table-column label="数组长度" prop="arrayLength"/>
                        <el-table-column label="类型" prop="type">
                            <template #default="scope">
                                <dict-tag :options="variType" :value="scope.row.type" />
                            </template>
                        </el-table-column>
                        <el-table-column label="初始值" prop="initVals"/>
                        <el-table-column label="注释" prop="comment"/>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="right">
            输出
            <div class="table_out">
                <div>
                    <div class="icon"><el-button  size="small" type="primary" plain icon="Plus" @click="handleAddOutput"></el-button></div>
                    <div class="icon"><el-button  size="small" type="success" plain icon="Edit" :disabled="singleOutput" @click="handleUpdateOutput()"></el-button></div>
                    <div class="icon"><el-button  size="small" type="danger" plain icon="Delete" :disabled="multipleOutput" @click="handleDeleteOutput()"></el-button></div>
                    <div class="icon"><el-button  size="small" type="success" plain icon="Setting"></el-button></div>
                </div>
                <div class="table_in">
                    <el-table :data="outputVariList" style="width: 100%" height="150"  @selection-change="handleSelectionChangeOutput">
                        <el-table-column type="selection" width="55"  prop="key"/>
                        <el-table-column label="序号"  prop="no"/>
                        <el-table-column label="名称" width="100"   prop="text"/>
                        <el-table-column label="关联事件"  width="150"  prop="relateEveName"/>
                        <el-table-column label="数组长度" prop="arrayLength"/>
                        <el-table-column label="类型" prop="type">
                            <template #default="scope">
                                <dict-tag :options="variType" :value="scope.row.type" />
                            </template>
                        </el-table-column>
                        <el-table-column label="初始值" prop="initVals"/>
                        <el-table-column label="注释" prop="comment"/>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="dialogInput.title" v-model="dialogInput.visible" width="500px"  :modal-append-to-body="false">
            <el-form ref="variInputFormRef" :model="variInputForm" :rules="variInputRules" label-width="80px">
                <el-form-item label="名称" prop="text">
                    <el-input v-model="variInputForm.text" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="关联事件">
                    <el-select v-model="variInputForm.relatedEventIds" multiple placeholder="请选择关联事件" :teleported="false">
                        <el-option
                        v-for="item in relateEveList"
                        :key="item.key"
                        :label="item.text"
                        :value="item.key"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数组长度" prop="arrayLength">
                    <el-input v-model="variInputForm.arrayLength" placeholder="请输入数组长度" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="variInputForm.type" placeholder="请输入类型" :teleported="false">
                        <el-option v-for="dict in variType" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="初始值" prop="initVals">
                    <el-input v-model="variInputForm.initVals" placeholder="请输入初始值" />
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                    <el-input v-model="variInputForm.comment" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button type="primary" @click="submitVariInputForm">确 定</el-button>
                <el-button @click="cancelInput">取 消</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="dialogOutput.title" v-model="dialogOutput.visible" width="500px"  :modal-append-to-body="false">
            <el-form ref="variOutputFormRef" :model="variOutputForm" :rules="variOutputRules" label-width="80px">
                <el-form-item label="名称" prop="text">
                    <el-input v-model="variOutputForm.text" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="关联事件">
                    <el-select v-model="variOutputForm.relatedEventIds" multiple placeholder="请选择关联事件" :teleported="false">
                      <el-option
                          v-for="item in relateEveList"
                          :key="item.key"
                          :label="item.text"
                          :value="item.key"
                      ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="数组长度" prop="arrayLength">
                    <el-input v-model="variOutputForm.arrayLength" placeholder="请输入数组长度" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="variOutputForm.type" placeholder="请输入类型" :teleported="false">
                        <el-option v-for="dict in variType" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="初始值" prop="initVals">
                    <el-input v-model="variOutputForm.initVals" placeholder="请输入初始值" />
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                    <el-input v-model="variOutputForm.comment" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button type="primary" @click="submitVariOutputForm">确 定</el-button>
                <el-button @click="cancelOutput">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="Vari" lang="ts">
    import type { VariInputForm,VariInputQuery,VariInputVO,VariOutputForm,VariOutputQuery,VariOutputVO} from '@/api/inter/vari/type';
    import {getRelateEveList,getInputEvents,getOutputEvents} from "@/api/inter/event";
    import {getInputVaris,getOutputVaris} from "@/api/inter/vari";
    import { Eve } from "@/api/inter/event/types";
    import {changeInputVaris,changeOutputVaris} from "@/utils/cache/inter";
    import { v4 as uuidv4 } from 'uuid';
    import useVariInputStore from "@/store/modules/variInput.ts";
    import useVariOutputStore from "@/store/modules/variOutput.ts";
    import {watch} from "vue";
    import useBottomContentStore from "@/store/modules/bottomContent.ts";
    const bottomContentStore=useBottomContentStore();
    let bottomDiv;
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const { variType } = toRefs<any>(proxy?.useDict("variType"));
    const relateEveList = ref<Eve[]>([]);
    const route = useRoute()
    let module=route.params.id;
    const project="project1";
    //----输入变量开始
    const variInputStore=useVariInputStore();
    const nosInput = ref<Array<number | string>>([]);
    const singleInput = ref(true);
    const multipleInput = ref(true);
    const handleSelectionChangeInput = (selection: VariInputVO[]) => {
        nosInput.value = selection.map(item => item.no);
        singleInput.value = selection.length != 1;
        multipleInput.value = !selection.length;
    }
    //----输入变量结束
    //----输出变量开始
    const variOutputStore=useVariOutputStore();
    const nosOutput = ref<Array<number | string>>([]);
    const singleOutput = ref(true);
    const multipleOutput = ref(true);
    const handleSelectionChangeOutput = (selection: VariOutputVO[]) => {
        nosOutput.value = selection.map(item => item.no);
        singleOutput.value = selection.length != 1;
        multipleOutput.value = !selection.length;
    }
    //----输出变量结束
    //----输入函数开始
    //初始值
    const initVariInputFormData:VariInputForm = {
        no:undefined,
        key:'',
        text:'',
        relatedEvents:[],
        arrayLength:10,
        type:'',
        initVals:0,
        comment:''
    }
    const variInputData = reactive<PageData<VariInputForm, VariInputQuery>>({
        variInputForm: { ...initVariInputFormData },
        queryParams: {
            // pageNum: 1,
            // pageSize: 10,
        },
        variInputRules: {
          text: [{ required: true, message: "输入变量名称不能为空", trigger: "blur" },{ pattern: /([a-z])([a-z1-9])*(_([a-z1-9]+))*/, message: "请输入正确的变量名", trigger: "blur" }]
        },
    });
    //内部属性不是响应式，需要用toRefs把属性也变成响应式
    const {  variInputForm, variInputRules } = toRefs(variInputData);
    //输入事件列表
    const inputVariList = ref<VariInputForm[]>([]);
    
    const dialogInput = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输入事件对话框
    const variInputFormRef = ref<ElFormInstance>();
    /** 新增按钮操作 */
    const handleAddInput = () => {
        resetInput();
        dialogInput.visible = true;
        dialogInput.title = "添加输入事件";
        relateEveList.value=getInputEvents(project,module);
    }
    const handleUpdateInput = (row?: VariInputVO) => {
        resetInput();
        const no = row?.no||nosInput.value[0];
        const res = inputVariList.value[no-1];
        let relatedEventIds=[];
        res.relatedEvents?.forEach(element => {
          relatedEventIds.push(element.id);
        });
        relateEveList.value=getInputEvents(project,module);
        variInputForm.value.relatedEventIds=relatedEventIds;
        Object.assign(variInputForm.value, res);
        dialogInput.visible = true;
        dialogInput.title = "修改输入事件";
    }
    /** 表单重置 */
    const resetInput = () => {
        variInputForm.value={ ...initVariInputFormData };
        variInputFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancelInput = () => {
        resetInput();
        dialogInput.visible = false;
    }
    //输入事件添加/修改
    const submitVariInputForm = () => {
        variInputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
              variInputForm.value.no?updateVariInput(variInputForm.value):addVariInput(variInputForm.value);
              proxy?.$modal.msgSuccessWithAppendTo("操作成功",bottomDiv);
              dialogInput.visible = false;
              variInputStore.flag=true;
              variInputStore.flag=false;
            }  
        });
    }
    const addVariInput=(data:VariInputForm)=>{ 
        uuidv4();
        let relateEveName="";
        let key = uuidv4()
        if(!inputVariList.value){
            inputVariList.value=new Array();
        }
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents?.forEach(element => {
          eventsVo.push({key:element,text:""})
        });
        eventsVo.forEach(relateEve => {
          relateEveList.value.forEach( dict=> {
            if(dict.key==relateEve.key){
              relateEve.text=dict.text;
              relateEveName+=dict.text+",";
            }
          });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        //找到选择的事件名称，遍历后api里得到的集合后，用name属性获取
        data.no=(inputVariList.value.length+1);
        data.key=key;
        inputVariList.value.push({...data});
        //保存到localstorage里
        changeInputVaris(project,module,inputVariList.value);
    }
    const updateVariInput=(data:VariInputForm)=>{
        let relateEveName="";
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents.forEach(element => {
          eventsVo.push({key:element,text:""})
        });
        eventsVo.forEach(relateEve => {
          relateEveList.value.forEach( dict=> {
            if(dict.key==relateEve.key){
              relateEve.text=dict.text;
              relateEveName+=dict.text+",";
            }
          });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        inputVariList.value.splice(data.no-1,1,{...data})
        //保存到localstorage里
        changeInputVaris(project,module,inputVariList.value);
    };
    //加载输入事件数据 
    const getVariInputList = () => {
        inputVariList.value=getInputVaris(project,module);
        inputVariList.value?.forEach(data => {
            let relateEveName="";
            let relatedEvents=data.relatedEvents
            if(relatedEvents){
              relatedEvents.forEach(eve => {
                relateEveName+=eve.text+",";
              });
              relateEveName=relateEveName.substring(0,relateEveName.length-1);
              data.relateEveName=relateEveName;
            }
        });
    }
    const handleDeleteInput = async (row?: VariInputVO) => {
      const deleteNos = row?.no||nosInput.value;
      await proxy?.$modal.confirm('是否确认删除序号为"' + deleteNos + '"的数据项？');
      let newList=inputVariList.value.filter(x=>!deleteNos.includes(x.no));
      for (let i=0; i< newList.length; i++){
          newList[i].no=i+1;
      }
      inputVariList.value=[];
      Object.assign(inputVariList.value,newList);
      changeInputVaris(project,module,inputVariList.value);
      proxy?.$modal.msgSuccessWithAppendTo("删除成功",bottomDiv);
      variInputStore.flag=true;
      variInputStore.flag=false;
    }
    //----输入函数结束
    //----输出函数开始
    //初始值
    const initVariOutputFormData:VariOutputForm = {
        no:undefined,
        key:'',
        text:'',
      relatedEvents:[],
        arrayLength:10,
        type:'',
        initVals:0,
        comment:''
    }
    const variOutputData = reactive<PageData<VariOutputForm, VariOutputQuery>>({
        variOutputForm: { ...initVariOutputFormData },
        queryParams: {
            // pageNum: 1,
            // pageSize: 10,
        },
        variOutputRules: {
          text: [{ required: true, message: "输出变量名称不能为空", trigger: "blur" },{ pattern: /([a-z])([a-z1-9])*(_([a-z1-9]+))*/, message: "请输入正确的变量名", trigger: "blur" }]
        },
    });
    //内部属性不是响应式，需要用toRefs把属性也变成响应式
    const {  variOutputForm, variOutputRules } = toRefs(variOutputData);
    //输出事件列表
    const outputVariList = ref<VariOutputForm[]>([]);
    
    const dialogOutput = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输出事件对话框
    const variOutputFormRef = ref<ElFormInstance>();
    /** 新增按钮操作 */
    const handleAddOutput = () => {
        resetOutput();
        dialogOutput.visible = true;
        dialogOutput.title = "添加输出事件";
        relateEveList.value=getOutputEvents(project,module);
    }
    const handleUpdateOutput = (row?: VariOutputVO) => {
        resetOutput();
        const no = row?.no||nosOutput.value[0];
        const res = outputVariList.value[no-1];
        let relatedEventIds=[];
        res.relatedEvents?.forEach(element => {
          relatedEventIds.push(element.id);
        });
        relateEveList.value=getOutputEvents(project,module);
        variOutputForm.value.relatedEventIds=relatedEventIds;
        Object.assign(variOutputForm.value, res);
        dialogOutput.visible = true;
        dialogOutput.title = "修改输出事件";
    }
    /** 表单重置 */
    const resetOutput = () => {
        variOutputForm.value={ ...initVariOutputFormData };
        variOutputFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancelOutput = () => {
        resetOutput();
        dialogOutput.visible = false;
    }
    //输出事件添加/修改
    const submitVariOutputForm = () => {
        variOutputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
              variOutputForm.value.no?updateVariOutput(variOutputForm.value):addVariOutput(variOutputForm.value);
              proxy?.$modal.msgSuccessWithAppendTo("操作成功",bottomDiv);
              dialogOutput.visible = false;
              variOutputStore.flag=true;
              variOutputStore.flag=false;
            }  
        });
    }
    const addVariOutput=(data:VariOutputForm)=>{ 
        uuidv4();
        let relateEveName="";
        let key = uuidv4()
        if(!outputVariList.value){
            outputVariList.value=new Array();
        }
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents?.forEach(element => {
          eventsVo.push({key:element,text:""})
        });
        eventsVo.forEach(relateEve => {
          relateEveList.value.forEach( dict=> {
            if(dict.key==relateEve.key){
              relateEve.text=dict.text;
              relateEveName+=dict.text+",";
            }
          });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        //找到选择的事件名称，遍历后api里得到的集合后，用name属性获取
        data.no=(outputVariList.value.length+1);
        data.key=key;
        outputVariList.value.push({...data});
        //保存到localstorage里
        changeOutputVaris(project,module,outputVariList.value);
    }
    const updateVariOutput=(data:VariOutputForm)=>{
        let relateEveName="";
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents.forEach(element => {
          eventsVo.push({key:element,text:""})
        });
        eventsVo.forEach(relateEve => {
          relateEveList.value.forEach( dict=> {
            if(dict.key==relateEve.key){
              relateEve.text=dict.text;
              relateEveName+=dict.text+",";
            }
          });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        outputVariList.value.splice(data.no-1,1,{...data})
        //保存到localstorage里
        changeOutputVaris(project,module,outputVariList.value);
    };
    //加载输出事件数据 
    const getVariOutputList = () => {
        outputVariList.value=getOutputVaris(project,module);
        outputVariList.value?.forEach(data => {
            let relateEveName="";
            let relatedEvents=data.relatedEvents
            if(relatedEvents){
              relatedEvents.forEach(eve => {
                relateEveName+=eve.text+",";
              });
              relateEveName=relateEveName.substring(0,relateEveName.length-1);
              data.relateEveName=relateEveName;
            }
        });
    }
    const handleDeleteOutput = async (row?: VariOutputVO) => {
      const deleteNos = row?.no||nosOutput.value;
      await proxy?.$modal.confirm('是否确认删除序号为"' + deleteNos + '"的数据项？');
      let newList=outputVariList.value.filter(x=>!deleteNos.includes(x.no));
      for (let i=0; i< newList.length; i++){
          newList[i].no=i+1;
      }
      outputVariList.value=[];
      Object.assign(outputVariList.value,newList);
      changeOutputVaris(project,module,outputVariList.value);
      proxy?.$modal.msgSuccessWithAppendTo("删除成功",bottomDiv);
      variOutputStore.flag=true;
      variOutputStore.flag=false;
    }
    //----输出函数结束
    onMounted(() => {
      initData();
    })
    const initData=(()=>{
      module=route.params.id;
      getVariInputList();
      getVariOutputList();
      bottomDiv=bottomContentStore.getBottomDiv();
    })
    watch(() => route.params.id, (newVal, oldVal) => {
      initData();
    });
</script>

<style lang="scss" scoped>
    .vari{
        display: flex;
        margin-left:20px;
        .left{
            flex:0.5;
            margin-right: 20px;
            .table_out{
                margin-top:10px;
                height: 100%;
                display: flex;
                .icon{
                    width:30px;
                    height:30px;
                }
            }
            .table_in{
                margin-left:20px;
            }
        }
        .right{
            flex:0.5;
            margin-right: 20px;
            .table_out{
                margin-top:10px;
                height: 100%;
                display: flex;
                .icon{
                    width:30;
                    height:30px;
                }
            }
            .table_in{
                margin-left:20px;
            }
        }
    }
</style>