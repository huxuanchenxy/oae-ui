<template>
    <div class="vari">
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
                    <el-table :data="tempVariList" style="width: 100%" height="150"  @selection-change="handleSelectionChange">
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
        <!-- 添加或修改参数配置对话框 -->
        <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
            <el-form ref="tempVariFormRef" :model="tempVariForm" :rules="tempVariRules" label-width="80px">
                <el-form-item label="名称" prop="text">
                    <el-input v-model="tempVariForm.text" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="数组长度" prop="arrayLength">
                    <el-input v-model="tempVariForm.arrayLength" placeholder="请输入数组长度" />
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select v-model="tempVariForm.type" placeholder="请输入类型">
                        <el-option v-for="dict in variType" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="初始值" prop="initVals">
                    <el-input v-model="tempVariForm.initVals" placeholder="请输入初始值" />
                </el-form-item>
                <el-form-item label="备注" prop="comment">
                    <el-input v-model="tempVariForm.comment" type="textarea" placeholder="请输入内容"/>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                <el-button type="primary" @click="submitTempVariForm">确 定</el-button>
                <el-button @click="cancel">取 消</el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup name="TempVari" lang="ts">
    import type { TempVariForm,TempVariQuery,TempVariVO} from '@/api/inter/tempvari/type';
    import interUtil from "@/utils/cache/inter";
    import { v4 as uuidv4 } from 'uuid';
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const { variType } = toRefs<any>(proxy?.useDict("variType"));
    const route = useRoute()
    const module=route.params.pid;
    const project="project1";
    const nos = ref<Array<number | string>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const handleSelectionChange = (selection: TempVariVO[]) => {
        nos.value = selection.map(item => item.no);
        single.value = selection.length != 1;
        multiple.value = !selection.length;
    }
    //初始值
    const initTempVariFormData:TempVariForm = {
        no:undefined,
        key:'',
        text:'',
        arrayLength:10,
        type:'',
        initVals:0,
        comment:''
    }
    const tempVariData = reactive<PageData<TempVariForm, TempVariQuery>>({
        tempVariForm: { ...initTempVariFormData },
        queryParams: {
            // pageNum: 1,
            // pageSize: 10,
        },
      tempVariRules: {
            name: [{ required: true, message: "输入内部变量名称不能为空", trigger: "blur" }],
        },
    });
    //内部属性不是响应式，需要用toRefs把属性也变成响应式
    const {  tempVariForm, tempVariRules } = toRefs(tempVariData);
    //输入事件列表
    const tempVariList = ref<TempVariForm[]>([]);
    
    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输入事件对话框
    const tempVariFormRef = ref<ElFormInstance>();
    /** 新增按钮操作 */
    const handleAdd = () => {
        reset();
        dialog.visible = true;
        dialog.title = "添加输入内部变量";
    }
    const handleUpdate= (row?: TempVariVO) => {
        reset();
        const no = row?.no||nos.value[0];
        const res = tempVariList.value[no-1];
        Object.assign(tempVariForm.value, res);
        dialog.visible = true;
        dialog.title = "修改输入内部变量";
    }
    /** 表单重置 */
    const reset = () => {
        tempVariForm.value={ ...initTempVariFormData };
        tempVariFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancel = () => {
        reset();
        dialog.visible = false;
    }
    //输入事件添加/修改
    const submitTempVariForm = () => {
        tempVariFormRef.value?.validate((valid: boolean) => {
            if (valid) {
                tempVariForm.value.no?updateVariInput(tempVariForm.value):addVariInput(tempVariForm.value);
                proxy?.$modal.msgSuccess("操作成功");
                dialog.visible = false;
            }
        });
    }
    const addVariInput=(data:TempVariForm)=>{ 
        uuidv4();
        let key = uuidv4()
        if(!tempVariList.value){
            tempVariList.value=new Array();
        }
        //找到选择的事件名称，遍历后api里得到的集合后，用name属性获取
        data.no=(tempVariList.value.length+1);
        data.key=key;
        tempVariList.value.push({...data});
        //保存到localstorage里
        interUtil.changeTempVaris(project,module,tempVariList.value);
    }
    const updateVariInput=(data:TempVariForm)=>{
        tempVariList.value.splice(data.no-1,1,{...data})
        //保存到localstorage里
        interUtil.changeTempVaris(project,module,tempVariList.value);
    };
    //加载输入事件数据 
    const getTempVariList = () => {
        tempVariList.value=interUtil.getInputVaris(project,module);
    }
    const handleDelete = async (row?: TempVariVO) => {
        const deleteNos = row?.no||nos.value;
        await proxy?.$modal.confirm('是否确认删除序号为"' + deleteNos + '"的数据项？');
        let newList=tempVariList.value.filter(x=>!deleteNos.includes(x.no));
        for (let i=0; i< newList.length; i++){
            newList[i].no=i+1;
        }
        tempVariList.value=[];
        Object.assign(tempVariList.value,newList);
        interUtil.changeTempVaris(project,module,tempVariList.value);
        proxy?.$modal.msgSuccess("删除成功");
    }
    onMounted(() => {
        getTempVariList();
    })
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