import { createApp } from 'vue';
import 'uno.css';
import '@/assets/css/style.css'
import '@/assets/iconfont/iconfont.css';
import '@/assets/iconfont/iconfont.js';
import 'animate.css'
import App from './App.vue'
import router from './router'
// import 'default-passive-events'
//import 'element-plus/theme-chalk/el-loading.css'; 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import store from './store';

// 注册插件
import plugins from './plugins/index'; // plugins
// 预设动画
import animate from './animate';
// svg图标
// import 'virtual:svg-icons-register';
import ElementIcons from '@/plugins/svgicon';
import { useDict } from '@/utils/dict';
const app = createApp(App);
app.config.globalProperties.animate = animate;
app.config.globalProperties.useDict = useDict;
app.use(ElementPlus, {
    locale: zhCn,
});
app.use(ElementIcons);
app.use(router);
app.use(store);
app.use(plugins);
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}