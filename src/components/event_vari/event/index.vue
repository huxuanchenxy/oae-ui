<template>
    <div class="event">
        <div class="left">
            输入
            <div class="table_out">
                <div>
                    <div class="icon"><el-button type="primary" plain icon="Plus" @click="handleAddInput"></el-button></div>
                    <div class="icon"><el-button type="success" plain icon="Edit" :disabled="singleInput" @click="handleUpdateInput()"></el-button></div>
                    <div class="icon"><el-button type="danger" plain icon="Delete" :disabled="multipleInput" @click="handleDeleteInput()"></el-button></div>
                    <div class="icon"><el-button type="success" plain icon="Setting"></el-button></div>
                </div>
                <div class="table_in">
                    <el-table :data="inputEventList" style="width: 100%" height="150"  @selection-change="handleSelectionChangeInput">
                        <el-table-column type="selection" width="55"  prop="key"/>
                        <el-table-column label="序号"  prop="no"/>
                        <el-table-column label="名称"  prop="text"/>
                        <el-table-column label="类型" prop="type">
                            <template #default="scope">
                                <dict-tag :options="eveType" :value="scope.row.type" />
                            </template>
                        </el-table-column>
                        <el-table-column label="关联事件" width="180"  prop="relateEveName"/>
                        <el-table-column label="注释" prop="comment"/>
                    </el-table>
                </div>
            </div>
        </div>
        <div class="right">
            输出
            <div class="table_out">
                <div>
                    <div class="icon"><el-button type="primary" plain icon="Plus" @click="handleAddOutput"></el-button></div>
                    <div class="icon"><el-button type="success" plain icon="Edit" :disabled="singleOutput" @click="handleUpdateOutput()"></el-button></div>
                    <div class="icon"><el-button type="danger" plain icon="Delete" :disabled="multipleOutput" @click="handleDeleteOutput()"></el-button></div>
                    <div class="icon"><el-button type="success" plain icon="Setting"></el-button></div>
                </div>
                <div class="table_in">
                    <el-table :data="outputEventList" style="width: 100%" height="150"  @selection-change="handleSelectionChangeOutput">
                        <el-table-column type="selection" width="55"  prop="key"/>
                        <el-table-column label="序号"  prop="no"/>
                        <el-table-column label="名称"  prop="text"/>
                        <el-table-column label="类型" prop="type">
                            <template #default="scope">
                                <dict-tag :options="eveType" :value="scope.row.type" />
                            </template>
                        </el-table-column>
                        <el-table-column label="关联事件" prop="relateEveName" width="180" />
                        <el-table-column label="注释" prop="comment"/>
                    </el-table>
                </div>
            </div>
        </div>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="dialogInput.title" v-model="dialogInput.visible" width="500px" append-to-body>
            <el-form ref="eveInputFormRef" :model="eveInputForm" :rules="eveInputRules" label-width="80px">
                <el-form-item label="名称" prop="text">
                    <el-input v-model="eveInputForm.text" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="eveInputForm.type" placeholder="请输入类型">
                        <el-option v-for="dict in eveType" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联事件">
                    <el-select v-model="eveInputForm.relatedEventIds" multiple placeholder="请选择关联事件">
                        <el-option
                        v-for="item in relateEveList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注释" prop="comment">
                    <el-input v-model="eveInputForm.comment" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button type="primary" @click="submitEveInputForm">确 定</el-button>
                <el-button @click="cancelInput">取 消</el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="dialogOutput.title" v-model="dialogOutput.visible" width="500px" append-to-body>
            <el-form ref="eveOutputFormRef" :model="eveOutputForm" :rules="eveOutputRules" label-width="80px">
                <el-form-item label="名称" prop="text">
                    <el-input v-model="eveOutputForm.text" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="eveOutputForm.type" placeholder="请输入类型">
                        <el-option v-for="dict in eveType" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="关联事件">
                    <el-select v-model="eveOutputForm.relatedEventIds" multiple placeholder="请选择关联事件">
                        <el-option
                        v-for="item in relateEveList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="注释" prop="comment">
                    <el-input v-model="eveOutputForm.comment" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button type="primary" @click="submitEveOutputForm">确 定</el-button>
                <el-button @click="cancelOutput">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="Event" lang="ts">
    import type { EveInputForm,EveInputQuery,EveInputVO,EveOutputForm,EveOutputQuery,EveOutputVO} from '@/api/inter/event/type';
    import {getRelateEveList,getInputEvents,getOutputEvents} from "@/api/inter/event";
    import { Eve } from "@/api/inter/event/types";
    import {changeInputEvents,changeOutputEvents} from "@/utils/cache/inter";
    import { v4 as uuidv4 } from 'uuid';
    import useEveInputStore from "@/store/modules/eveInput.ts";
    import useEveOutputStore from "@/store/modules/eveOutput.ts";
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const { eveType } = toRefs<any>(proxy?.useDict("eveType"));
    const relateEveList = ref<Eve[]>([]);
    const route = useRoute()
    const module=route.params.cid;
    const project="project1";
    //----输入变量开始
    const eveInputStore=useEveInputStore();
    const nosInput = ref<Array<number | string>>([]);
    const singleInput = ref(true);
    const multipleInput = ref(true);
    const handleSelectionChangeInput = (selection: EveInputVO[]) => {
        nosInput.value = selection.map(item => item.no);
        singleInput.value = selection.length != 1;
        multipleInput.value = !selection.length;
    }
    //----输入变量结束
    //----输出变量开始
    const eveOutputStore=useEveOutputStore();
    const nosOutput = ref<Array<number | string>>([]);
    const singleOutput = ref(true);
    const multipleOutput = ref(true);
    const handleSelectionChangeOutput = (selection: EveOutputVO[]) => {
        nosOutput.value = selection.map(item => item.no);
        singleOutput.value = selection.length != 1;
        multipleOutput.value = !selection.length;
    }
    //----输出变量结束
    //----输入函数开始
    //初始值
    const initEveInputFormData:EveInputForm = {
        no:undefined,
        key:'',
        text:'',
        relatedEvents:[],
        type:'',
        comment:''
    }
    const eveInputData = reactive<PageData<EveInputForm, EveInputQuery>>({
        eveInputForm: { ...initEveInputFormData },
        queryParams: {
            // pageNum: 1,
            // pageSize: 10,
        },
        eveInputRules: {
            name: [{ required: true, message: "输入事件名称不能为空", trigger: "blur" }],
        },
    });
    //内部属性不是响应式，需要用toRefs把属性也变成响应式
    const {  eveInputForm, eveInputRules } = toRefs(eveInputData);
    //输入事件列表
    const inputEventList = ref<EveInputForm[]>([]);
    
    const dialogInput = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输入事件对话框
    const eveInputFormRef = ref<ElFormInstance>();
    /** 新增按钮操作 */
    const handleAddInput = () => {
        resetInput();
        dialogInput.visible = true;
        dialogInput.title = "添加输入事件";
        relateEveList.value=getRelateEveList();
    }
    const handleUpdateInput = (row?: EveInputVO) => {
        resetInput();
        const no = row?.no||nosInput.value[0];
        const res = inputEventList.value[no-1];
        let relatedEventIds=[];
        res.relatedEvents?.forEach(element => {
            relatedEventIds.push(element.id);
        });
        relateEveList.value=getRelateEveList();
        eveInputForm.value.relatedEventIds=relatedEventIds;
        Object.assign(eveInputForm.value, res);
        dialogInput.visible = true;
        dialogInput.title = "修改输入事件";
    }
    /** 表单重置 */
    const resetInput = () => {
        eveInputForm.value={ ...initEveInputFormData };
        eveInputFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancelInput = () => {
        resetInput();
        dialogInput.visible = false;
    }
    //输入事件添加/修改
    const submitEveInputForm = () => {
        eveInputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
                eveInputForm.value.no?updateEveInput(eveInputForm.value):addEveInput(eveInputForm.value);
                proxy?.$modal.msgSuccess("操作成功");
                dialogInput.visible = false;
                eveInputStore.flag=true;
                eveInputStore.flag=false;
            }  
        });
    }
    const addEveInput=(data:EveInputForm)=>{ 
        uuidv4(); 
        let relateEveName="";
        let key = uuidv4()
        if(!inputEventList.value){
            inputEventList.value=new Array();
        }
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents?.forEach(element => {
            eventsVo.push({id:element,name:""})
        });
        eventsVo.forEach(relateEve => {
            relateEveList.value.forEach( dict=> {
                if(dict.id==relateEve.id){
                    relateEve.name=dict.name;
                    relateEveName+=dict.name+",";
                }
            });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        //找到选择的事件名称，遍历后api里得到的集合后，用name属性获取
        data.no=(inputEventList.value.length+1);
        data.key=key;
        inputEventList.value.push({...data});
        //保存到localstorage里
        changeInputEvents(project,module,inputEventList.value);
    }
    const updateEveInput=(data:EveInputForm)=>{
        let relateEveName="";
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents.forEach(element => {
            eventsVo.push({id:element,name:""})
        });
        
        eventsVo.forEach(relateEve => {
            relateEveList.value.forEach( dict=> {
                if(dict.id==relateEve.id){
                    relateEve.name=dict.name;
                    relateEveName+=dict.name+",";
                }
            });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        inputEventList.value.splice(data.no-1,1,{...data})
        //保存到localstorage里
        changeInputEvents(project,module,inputEventList.value);
    };
    //加载输入事件数据 
    const getEveInputList = () => {
        inputEventList.value=getInputEvents(project,module);
        inputEventList.value?.forEach(data => {
            let relateEveName="";
            let relatedEvents=data.relatedEvents
            if(relatedEvents){
                relatedEvents?.forEach(eve => {
                    relateEveName+=eve.name+",";
                });
                relateEveName=relateEveName.substring(0,relateEveName.length-1);
                data.relateEveName=relateEveName;
            }
        });
    }
    const handleDeleteInput = async (row?: EveInputVO) => {
        const deleteNos = row?.no||nosInput.value;
        await proxy?.$modal.confirm('是否确认删除序号为"' + deleteNos + '"的数据项？');
        let newList=inputEventList.value.filter(x=>!deleteNos.includes(x.no));
        for (let i=0; i< newList.length; i++){
            newList[i].no=i+1;
        }
        inputEventList.value=[];
        Object.assign(inputEventList.value,newList);
        changeInputEvents(project,module,inputEventList.value);
        proxy?.$modal.msgSuccess("删除成功");
        eveInputStore.flag=true;
        eveInputStore.flag=false;
    }
    //----输入函数结束
    //----输出函数开始
    //初始值
    const initEveOutputFormData:EveOutputForm = {
        no:undefined,
        key:'',
        text:'',
        relatedEvents:[],
        type:'',
        comment:''
    }
    const eveOutputData = reactive<PageData<EveOutputForm, EveOutputQuery>>({
        eveOutputForm: { ...initEveOutputFormData },
        queryParams: {
            // pageNum: 1,
            // pageSize: 10,
        },
        eveOutputRules: {
            name: [{ required: true, message: "输出事件名称不能为空", trigger: "blur" }],
        },
    });
    //内部属性不是响应式，需要用toRefs把属性也变成响应式
    const {  eveOutputForm, eveOutputRules } = toRefs(eveOutputData);
    //输出事件列表
    const outputEventList = ref<EveOutputForm[]>([]);
    
    const dialogOutput = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输出事件对话框
    const eveOutputFormRef = ref<ElFormInstance>();
    /** 新增按钮操作 */
    const handleAddOutput = () => {
        resetOutput();
        dialogOutput.visible = true;
        dialogOutput.title = "添加输出事件";
        relateEveList.value=getRelateEveList();
    }
    const handleUpdateOutput = (row?: EveOutputVO) => {
        resetOutput();
        const no = row?.no||nosOutput.value[0];
        const res = outputEventList.value[no-1];
        let relatedEventIds=[];
        res.relatedEvents?.forEach(element => {
            relatedEventIds.push(element.id);
        });
        relateEveList.value=getRelateEveList();
        eveOutputForm.value.relatedEventIds=relatedEventIds;
        Object.assign(eveOutputForm.value, res);
        dialogOutput.visible = true;
        dialogOutput.title = "修改输出事件";
    }
    /** 表单重置 */
    const resetOutput = () => {
        eveOutputForm.value={ ...initEveOutputFormData };
        eveOutputFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancelOutput = () => {
        resetOutput();
        dialogOutput.visible = false;
    }
    //输出事件添加/修改
    const submitEveOutputForm = () => {
        eveOutputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
                eveOutputForm.value.no?updateEveOutput(eveOutputForm.value):addEveOutput(eveOutputForm.value);
                proxy?.$modal.msgSuccess("操作成功");
                dialogOutput.visible = false;
                eveOutputStore.flag=true;
                eveOutputStore.flag=false;
            }  
        });
    }
    const addEveOutput=(data:EveOutputForm)=>{ 
        uuidv4(); 
        let relateEveName="";
        let key = uuidv4()
        if(!outputEventList.value){
            outputEventList.value=new Array();
        }
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents?.forEach(element => {
            eventsVo.push({id:element,name:""})
        });
        eventsVo.forEach(relateEve => {
            relateEveList.value.forEach( dict=> {
                if(dict.id==relateEve.id){
                    relateEve.name=dict.name;
                    relateEveName+=dict.name+",";
                }
            });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        //找到选择的事件名称，遍历后api里得到的集合后，用name属性获取
        data.no=(outputEventList.value.length+1);
        data.key=key;
        outputEventList.value.push({...data});
        //保存到localstorage里
        changeOutputEvents(project,module,outputEventList.value);
    }
    const updateEveOutput=(data:EveOutputForm)=>{
        let relateEveName="";
        let dataRelatedEvents=data.relatedEventIds;
        let eventsVo:Eve=[];
        dataRelatedEvents.forEach(element => {
            eventsVo.push({id:element,name:""})
        });
        eventsVo.forEach(relateEve => {
            relateEveList.value.forEach( dict=> {
                if(dict.id==relateEve.id){
                    relateEve.name=dict.name;
                    relateEveName+=dict.name+",";
                }
            });
        });
        data.relatedEvents=eventsVo;
        relateEveName=relateEveName.substring(0,relateEveName.length-1);
        data.relateEveName=relateEveName;
        outputEventList.value.splice(data.no-1,1,{...data})
        //保存到localstorage里
        changeOutputEvents(project,module,outputEventList.value);
    };
    //加载输出事件数据 
    const getEveOutputList = () => {
        outputEventList.value=getOutputEvents(project,module);
        outputEventList.value?.forEach(data => {
            let relateEveName="";
            let relatedEvents=data.relatedEvents
            if(relatedEvents){
                relatedEvents.forEach(eve => {
                    relateEveName+=eve.name+",";
                });
                relateEveName=relateEveName.substring(0,relateEveName.length-1);
                data.relateEveName=relateEveName;
            }
        });
    }
    const handleDeleteOutput = async (row?: EveOutputVO) => {
        const deleteNos = row?.no||nosOutput.value;
        await proxy?.$modal.confirm('是否确认删除序号为"' + deleteNos + '"的数据项？');
        let newList=outputEventList.value.filter(x=>!deleteNos.includes(x.no));
        for (let i=0; i< newList.length; i++){
            newList[i].no=i+1;
        }
        outputEventList.value=[];
        Object.assign(outputEventList.value,newList);
        changeOutputEvents(project,module,outputEventList.value);
        proxy?.$modal.msgSuccess("删除成功");
        eveOutputStore.flag=true;
        eveOutputStore.flag=false;
    }
    //----输出函数结束
    onMounted(() => {
        getEveInputList();
        getEveOutputList();
    })
</script>

<style lang="scss" scoped>
    .event{
        display: flex;
        margin-left:20px;
        justify-content: space-between;
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