import {
    createApp
} from 'vue'
import '@/assets/css/style.css'
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';
import 'animate.css'
import App from './App.vue'
import router from './router'
import 'default-passive-events'
//import 'element-plus/theme-chalk/el-loading.css'; 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app
//.use(animated)
    .use(ElementPlus, {
    locale: zhCn,
}).use(router).mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}