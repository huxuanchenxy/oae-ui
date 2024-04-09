<template>
    <div class="event_vari" >
        <div class="menu">
        <el-menu :default-active="$route.path">
            <el-menu-item
            index="/inter/event"
            @click="changeActive('/inter/event')"
            >
            <span>事件</span>
            </el-menu-item>
            <el-menu-item index="/inter/vari" @click="changeActive('/inter/vari')">
            <span>变量</span>
            </el-menu-item>
            <el-menu-item index="/inter/invari" @click="changeActive('/inter/invari')">
            <span>内部变量</span>
            </el-menu-item>
            <el-menu-item index="/inter/tmpvari" @click="changeActive('/inter/tmpvari')">
            <span>临时变量</span>
            </el-menu-item>
        </el-menu>
        </div>
        <!-- 右侧内容展示区域:路由组件展示位置 -->
        <div class="content">
        <!-- 子组件展示结构地方 -->
        <router-view></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from "vue-router";
    //获取路由器
    let $router = useRouter();
    //获取当前路由的信息
    const changeActive = (path: string) => {
    //跳转到对应二级路由
    // $router.push({ path, query: { hoscode: $route.query.hoscode } });
        $router.push({ path});
    };
</script>

<style lang="scss" scoped>
    .event_vari {
        border: 1px solid black;
        display: flex;
        .menu {
            flex: 0.2;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .content {
            flex: 8;
        }
    }
</style>