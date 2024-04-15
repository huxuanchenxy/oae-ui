<template>
    <div class="event">
        <div class="left">
            输入
            <div class="table_out">
                <div>
                    <div class="icon"><el-button type="primary" plain icon="Plus" @click="handleAdd"></el-button></div>
                    <div class="icon"><el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()"></el-button></div>
                    <div class="icon"><el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()"></el-button></div>
                    <div class="icon"><el-button type="success" plain icon="Setting"></el-button></div>
                </div>
                <div class="table_in">
                    <el-table :data="inputEventList" style="width: 100%" height="150"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"  prop="key"/>
                        <el-table-column label="序号"  prop="no"/>
                        <el-table-column label="名称"  prop="text"/>
                        <el-table-column label="关联事件" prop="relateEveName"/>
                        <el-table-column label="数组长度" prop="arrayLength"/>
                        <el-table-column label="类型" prop="type">
                            <template #default="scope">
                                <dict-tag :options="eveType" :value="scope.row.type" />
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
            <div>
                <div class="table_out">
                
                </div>
            </div>
        </div>
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
            <el-form ref="eveInputFormRef" :model="eveInputForm" :rules="eveInputRules" label-width="80px">
                <el-form-item label="名称" prop="text">
                    <el-input v-model="eveInputForm.text" placeholder="请输入名称" />
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
                <el-form-item label="数组长度" prop="arrayLength">
                    <el-input v-model="eveInputForm.arrayLength" placeholder="请输入数组长度" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="eveInputForm.type" placeholder="请输入类型">
                        <el-option v-for="dict in eveType" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="初始值" prop="initVals">
                    <el-input v-model="eveInputForm.initVals" placeholder="请输入初始值" />
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                    <el-input v-model="eveInputForm.comment" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button type="primary" @click="submitEveInputForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="Event" lang="ts">
    import type { EveInputForm,EveInputQuery,EveInputVO} from '@/api/inter/event/type';
    import api from "@/api/inter/event";
    import { Eve } from "@/api/inter/event/types";
    import interInputUtil from "@/utils/cache/inter";
    import { v4 as uuidv4 } from 'uuid';
    import useEveInputStore from "@/store/modules/eveInput.ts";
    const eveInputStore=useEveInputStore();
    const route = useRoute()
    const module=route.params.pid;
    const project="project1";
    const nos = ref<Array<number | string>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const { eveType } = toRefs<any>(proxy?.useDict("eveType"));
    const relateEveList = ref<Eve[]>([]);
    const handleSelectionChange = (selection: EveInputVO[]) => {
        nos.value = selection.map(item => item.no);
        single.value = selection.length != 1;
        multiple.value = !selection.length;
    }
    //初始值
    const initEveInputFormData:EveInputForm = {
        no:undefined,
        key:'',
        text:'',
        relatedEvents:[],
        arrayLength:10,
        type:'',
        initVals:0,
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
    
    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输入事件对话框
    const eveInputFormRef = ref<ElFormInstance>();
    //增加/编辑输入事件对话框双向绑定对象
    // let eveInputForm=reactive({ ...initEveInputFormData });
    // let eveInputRules=reactive({
    //     name: [{ required: true, message: "输入事件名称不能为空", trigger: "blur" }],
    // });
    /** 新增按钮操作 */
    const handleAdd = () => {
        reset();
        dialog.visible = true;
        dialog.title = "添加输入事件";
        relateEveList.value=api.getRelateEveList();
    }
    const handleUpdate = (row?: EveInputVO) => {
        reset();
        const no = row?.no||nos.value[0];
        const res = inputEventList.value[no-1];
        let relatedEventIds=[];
        res.relatedEvents?.forEach(element => {
            relatedEventIds.push(element.id);
        });
        relateEveList.value=api.getRelateEveList();
        eveInputForm.value.relatedEventIds=relatedEventIds;
        Object.assign(eveInputForm.value, res);
        dialog.visible = true;
        dialog.title = "修改输入事件";
    }
    /** 表单重置 */
    const reset = () => {
        eveInputForm.value={ ...initEveInputFormData };
        eveInputFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancel = () => {
        reset();
        dialog.visible = false;
    }
    //输入事件添加/修改
    const submitEveInputForm = () => {
        eveInputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
                eveInputForm.value.no?updateEveInput(eveInputForm.value):addEveInput(eveInputForm.value);
                proxy?.$modal.msgSuccess("操作成功");
                dialog.visible = false;
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
        //找到选择的事件名称，遍历后api里得到的集合后，用name属性获取
        data.no=(inputEventList.value.length+1);
        data.key=key;
        inputEventList.value.push({...data});
        //保存到localstorage里
        interInputUtil.changeInputEvents(project,module,inputEventList.value);
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
        interInputUtil.changeInputEvents(project,module,inputEventList.value);
    };
    onMounted(() => {
        getEveInputList();
    })
    //加载输入事件数据 
    const getEveInputList = () => {
        inputEventList.value=interInputUtil.getInputEvents(project,module);
        inputEventList.value.forEach(data => {
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
    const handleDelete = async (row?: EveInputVO) => {
        const deleteNos = row?.no||nos.value;
        await proxy?.$modal.confirm('是否确认删除序号为"' + deleteNos + '"的数据项？');
        let newList=inputEventList.value.filter(x=>!deleteNos.includes(x.no));
        for (let i=0; i< newList.length; i++){
            newList[i].no=i+1;
        }
        inputEventList.value=[];
        Object.assign(inputEventList.value,newList);
        interInputUtil.changeInputEvents(project,module,inputEventList.value);
        proxy?.$modal.msgSuccess("删除成功");
        eveInputStore.flag=true;
        eveInputStore.flag=false;
    }
</script>

<style lang="scss" scoped>
    .event{
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