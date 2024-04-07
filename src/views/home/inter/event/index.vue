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
                    <el-table :data="inputEventArr" style="width: 100%" height="200">
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
    import type { Eve} from '@/api/inter/event/type';
    import { ref,reactive,getCurrentInstance,onMounted } from "vue";
    import  cache  from "@/plugins/cache.ts";
    const { proxy } = getCurrentInstance() as ComponentInternalInstance;
    //初始值
    const initEveInputFormData:Eve = {
        no:undefined,
        name:'',
        relateEve:'',
        arrLen:10,
        eveType:'',
        initVal:0,
        remark:''
    }
    //输入事件列表
    let inputEventArr=ref<Eve>([]);
    
    const dialog = reactive<DialogOption>({
        visible: false,
        title: ''
    });
    //增加/编辑输入事件对话框
    const eveInputFormRef = ref<ElFormInstance>();
    //增加/编辑输入事件对话框双向绑定对象
    let eveInputForm=reactive({ ...initEveInputFormData });
    let eveInputRules=reactive({
        name: [{ required: true, message: "输入事件名称不能为空", trigger: "blur" }],
    });
    /** 新增按钮操作 */
    const handleAdd = () => {
        reset();
        dialog.visible = true;
        dialog.title = "添加输入事件";
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
    //输入事件添加/修改
    const submitEveInputForm = () => {
        eveInputFormRef.value?.validate((valid: boolean) => {
            if (valid) {
                // updateType(form.value) : await addType(form.value);
                // proxy?.$modal.msgSuccess("操作成功");
                if(!inputEventArr.value){
                    inputEventArr.value=new Array();
                }
                inputEventArr.value.push({...eveInputForm});
                console.log(inputEventArr.value)
                //保存到localstorage里
                cache.local.setJSON('inputEventArr',inputEventArr.value)
                dialog.visible = false;
                // getList();
            }
        });
    }
    onMounted(() => {
        getEveInputList();
    })
    //加载输入事件数据
    const getEveInputList = () => {
        inputEventArr.value=cache.local.getJSON('inputEventArr');
        console.log(inputEventArr.value);
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