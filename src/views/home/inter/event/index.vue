<template>
    <div class="event">
        <div class="left">
            输入
            <div class="table_out">
                <div>
                    <div class="icon"><el-icon><Plus @click="handleAdd()"/></el-icon></div>
                    <div class="icon"><el-icon><Close /></el-icon></div>
                    <div class="icon"><el-icon><EditPen /></el-icon></div>
                    <div class="icon"><el-icon><Setting /></el-icon></div>
                </div>
                <div class="table_in">
                    <el-table :data="inputEventArr" style="width: 100%">
                        <el-table-column label="序号"  prop="no">
                        
                        </el-table-column>
                        <el-table-column label="名称"  prop="name">
                        </el-table-column>
                        <el-table-column label="关联事件">
                        
                        </el-table-column>
                        <el-table-column label="数组长度">
                        
                        </el-table-column>
                        <el-table-column label="类型">
                            
                        </el-table-column>
                        <el-table-column label="初始值">
                        
                        </el-table-column>
                        <el-table-column label="注释">
                            
                        </el-table-column>
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
            <el-input v-model="eveInputForm.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
            <el-button type="primary" @click="submitForm">确 定</el-button>
            <el-button @click="cancel">取 消</el-button>
            </div>
        </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
    import type { Eve} from '@/api/inter/event/type';
    import { ref,reactive,getCurrentInstance,onMounted } from "vue";
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    const initEveInputFormData: DictTypeForm = {
        no: undefined,
        name: '',
        remark: ''
    }
    let inputEventArr:Eve[]=[];
    
    const initData=()=>{
        for(let i=0;i<2;i++){
        inputEventArr.push(
            {
                no:i+1,
                name:'name1',
                event:'',
                arrLen:10,
                eventType:'',
                initVal:0,
                commit:''
            }
        )
    }
    }
    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    const eveInputFormRef = ref<ElFormInstance>();
    let eveInputForm=reactive({ ...initEveInputFormData });
    let eveInputRules=reactive({
        name: [{ required: true, message: "输入事件名称不能为空", trigger: "blur" }],
    });
    /** 新增按钮操作 */
    const handleAdd = () => {
        reset();
        dialog.visible = true;
        dialog.title = "添加字典类型";
    }
        /** 表单重置 */
    const reset = () => {
        eveInputForm.value = { ...initEveInputFormData };
        eveInputFormRef.value?.resetFields();
    }
    /** 取消按钮 */
    const cancel = () => {
        reset();
        dialog.visible = false;
    }
    const submitForm = () => {
        eveInputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
                // updateType(form.value) : await addType(form.value);
                console.log(proxy);
                console.log(proxy?.$modal);
                proxy?.$modal.msgSuccess("操作成功");
                dialog.visible = false;
                // getList();
            }
        });
    }
    onMounted(() => {
        getList();
    })
    const getList = () => {
        initData();
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