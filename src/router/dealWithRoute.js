//处理树形数据
//dealWithRoute.js 
import router from './index';
//import { RouterView } from "vue-router";
const dealWithRoute = (data, parent = 'home') => {
    for (let item of data) {
        //多级菜单
        if (item.child && item.child.length > 0) {
            router.addRoute(parent, {
                path: item.funcUrl,
                name: item.funcUrl.substr(1),
                //component: RouterView,
                component: () =>
                    import ( /* @vite-ignore */ `${item.pageAddress}.vue`),
                meta: {
                    title: item.funcShowName,

                }
            })
            dealWithRoute(item.child, item.funcUrl.split('/')[1])

        } else { //一级菜单
            router.addRoute(parent, {
                path: item.funcUrl,
                name: item.funcUrl.substr(1),
                //component: () => import(`../views/${item.component}`),
                component: () =>
                    import ( /* @vite-ignore */ `${item.pageAddress}.vue`),
                meta: {
                    title: item.funcShowName,
                }
            });
        }
    }
};
//console.log(dealWithRoute);
export default dealWithRoute;