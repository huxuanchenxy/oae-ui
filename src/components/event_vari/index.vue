<template>
    <div class="event_vari" >
        <el-tabs :tab-position="tabPosition" style="height: 200px" class="demo-tabs">
            <el-tab-pane label="事件">
                <EventComp/>
            </el-tab-pane>
            <el-tab-pane label="变量">Config</el-tab-pane>
            <el-tab-pane label="内部变量">Role</el-tab-pane>
            <el-tab-pane label="临时变量">Task</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
    import EventComp from "@/components/event_vari/event/index.vue";
    const tabPosition = ref('left')
    const {moduleName}=defineProps(['moduleName'])
    onMounted(() => {
    })
</script>

<style lang="scss" scoped>
    .event_vari {
        border: 1px solid black;
        display: flex;
        .demo-tabs > .el-tabs__content {
            padding: 32px;
            color: #6b778c;
            font-size: 32px;
            font-weight: 600;
        }

        .el-tabs--right .el-tabs__content,
        .el-tabs--left .el-tabs__content {
            height: 100%;
        }
    }
</style>