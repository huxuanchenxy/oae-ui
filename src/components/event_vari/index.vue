<template>
    <div class="event_vari" >
        <el-tabs :tab-position="tabPosition" style="height: 200px" class="tabs">
            <el-tab-pane label="事件">
                <EventComp/>
            </el-tab-pane>
            <el-tab-pane label="变量">
                <VariComp/>
            </el-tab-pane>
            <el-tab-pane label="内部变量">
              <InVariComp/>
            </el-tab-pane>
            <el-tab-pane label="临时变量">
              <TempVariComp/>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
    import EventComp from "@/components/event_vari/event/index.vue";
    import VariComp from "@/components/event_vari/vari/index.vue";
    import InVariComp from "@/components/event_vari/invari/index.vue";
    import TempVariComp from "@/components/event_vari/tempvari/index.vue";
    const tabPosition = ref('left')
    onMounted(() => {
    })
</script>

<style lang="scss" scoped>
    .event_vari {
        display: flex;
        .tabs{
            width: 100%;
        }
        .tabs > .el-tabs__content {
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