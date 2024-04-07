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
                    <el-table :data="inputEventList" style="width: 100%" height="200"  @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="55"  />
                        <el-table-column label="序号"  prop="no"/>
                        <el-table-column label="名称"  prop="name"/>
                        <el-table-column label="关联事件" prop="relateEve"/>
                        <el-table-column label="数组长度" prop="arrLen"/>
                        <el-table-column label="类型" prop="eveType"/>
                        <el-table-column label="初始值" prop="initVal"/>
                        <el-table-column label="注释" prop="remark"/>
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
                <el-form-item label="名称" prop="name">
                    <el-input v-model="eveInputForm.name" placeholder="请输入名称" />
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input v-model="eveInputForm.remark" type="textarea" placeholder="请输入内容"/>
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

<script setup lang="ts">
    import type { EveInputForm,EveInputQuery} from '@/api/inter/event/type';
    import { ref,reactive,getCurrentInstance,onMounted ,toRefs} from "vue";
    import  cache  from "@/plugins/cache.ts";
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const ids = ref<Array<number | string>>([]);
    const single = ref(true);
    const multiple = ref(true);
    const handleSelectionChange = (selection: EveInputForm[]) => {
        ids.value = selection.map(item => item.no);
        single.value = selection.length != 1;
        multiple.value = !selection.length;
    }
    //初始值
    const initEveInputFormData:EveInputForm = {
        no:undefined,
        name:'',
        relateEve:'',
        arrLen:10,
        eveType:'',
        initVal:0,
        remark:''
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
    const { queryParams, eveInputForm, eveInputRules } = toRefs(eveInputData);
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
    }
    const handleUpdate = (row?: EveInputForm) => {
        reset();
        const no = row?.no||ids.value[0];
        const res = inputEventList.value[no-1];
        Object.assign(eveInputForm.value, res);
        dialog.visible = true;
        dialog.title = "修改字典类型";
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
                // proxy?.$modal.msgSuccess("操作成功");
                dialog.visible = false;
                // getList();
            }
        });
    }
    const addEveInput=(data:EveInputForm)=>{
        if(!inputEventList.value){
            inputEventList.value=new Array();
        }
        data.no=(inputEventList.value.length+1);
        inputEventList.value.push({...data});
        //保存到localstorage里
        cache.local.setJSON('inputEventArr',inputEventList.value)
    }
    const updateEveInput=(data:EveInputForm)=>{
        inputEventList.value.splice(data.no-1,1,{...data})
        //保存到localstorage里
        cache.local.setJSON('inputEventArr',inputEventList.value)
    };
    onMounted(() => {
        getEveInputList();
    })
    //加载输入事件数据
    const getEveInputList = () => {
        inputEventList.value=cache.local.getJSON('inputEventArr');
        console.log(inputEventList.value);
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
                border: 1px solid #ccc;
                margin-top:10px;
                height: 200px;
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