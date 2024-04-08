import {  loadEnv, defineConfig } from 'vite';
import createPlugins from './vite/plugins';
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
    const env = loadEnv(mode, process.cwd());
    return {
    base: env.VITE_APP_CONTEXT_PATH,
    server: {
        open: true,
        port: 5100,

    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, "src"),
        },

    },
    plugins: createPlugins(env, command === 'build'),
    // 预编译
    optimizeDeps: {
        include: [
            'vue',
            'vue-router',
            'pinia',
            'axios',
            '@vueuse/core',
            'path-to-regexp',
            'echarts',
            '@wangeditor/editor',
            '@wangeditor/editor-for-vue',
            'vue-i18n',
            '@vueup/vue-quill',
            '@iconify/iconify',

            'element-plus/es/components/form/style/css',
            'element-plus/es/components/form-item/style/css',
            'element-plus/es/components/button/style/css',
            'element-plus/es/components/input/style/css',
            'element-plus/es/components/input-number/style/css',
            'element-plus/es/components/switch/style/css',
            'element-plus/es/components/upload/style/css',
            'element-plus/es/components/menu/style/css',
            'element-plus/es/components/col/style/css',
            'element-plus/es/components/icon/style/css',
            'element-plus/es/components/row/style/css',
            'element-plus/es/components/tag/style/css',
            'element-plus/es/components/dialog/style/css',
            'element-plus/es/components/loading/style/css',
            'element-plus/es/components/radio/style/css',
            'element-plus/es/components/radio-group/style/css',
            'element-plus/es/components/popover/style/css',
            'element-plus/es/components/scrollbar/style/css',
            'element-plus/es/components/tooltip/style/css',
            'element-plus/es/components/dropdown/style/css',
            'element-plus/es/components/dropdown-menu/style/css',
            'element-plus/es/components/dropdown-item/style/css',
            'element-plus/es/components/sub-menu/style/css',
            'element-plus/es/components/menu-item/style/css',
            'element-plus/es/components/divider/style/css',
            'element-plus/es/components/card/style/css',
            'element-plus/es/components/link/style/css',
            'element-plus/es/components/breadcrumb/style/css',
            'element-plus/es/components/breadcrumb-item/style/css',
            'element-plus/es/components/table/style/css',
            'element-plus/es/components/tree-select/style/css',
            'element-plus/es/components/table-column/style/css',
            'element-plus/es/components/select/style/css',
            'element-plus/es/components/option/style/css',
            'element-plus/es/components/pagination/style/css',
            'element-plus/es/components/tree/style/css',
            'element-plus/es/components/alert/style/css',
            'element-plus/es/components/checkbox/style/css',
            'element-plus/es/components/date-picker/style/css',
            'element-plus/es/components/transfer/style/css',
            'element-plus/es/components/tabs/style/css',
            'element-plus/es/components/image/style/css',
            'element-plus/es/components/tab-pane/style/css'
        ]
    }
  };
});
