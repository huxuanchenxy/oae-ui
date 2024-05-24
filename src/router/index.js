import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
import { menuData } from "@/jslib/menuData.js";

const routes = [{
        path: '/',
        redirect: '/main' //重定向
    },
    {
        path: '/login',
        name: 'login',
        component: () =>
            import ('../views/login/Login.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta: {
            id: "home",
            title: '上海电气-工控IDE',

        },
        redirect: '/main', //重定向
        component: () =>
            import ('../views/home/Index.vue'),
        children: [{
                path: '/main', //  
                name: 'main',
                meta: {
                    id: "main",
                    title: '首页',
                },
                component: () =>
                    import ('../views/home/main/Index.vue')

            },
            {
                //TODO 测试用，后续删除
                path: '/functionBlock',
                component: () =>
                    import ('../views/home/project/functionblock/index.vue')
            },
            {
                "path": "/module/:pid/:id",
                "name": "module",
                "meta": {
                    "id": "module",
                },
                component: () =>
                    import ('../views/home/project/module/Module.vue'),
            },
            {
                "path": "/module/:pid/:id/:type",
                "name": "module2",
                "meta": {
                    "id": "module2",
                },
                component: () =>
                    import ('../views/home/project/module/Module.vue'),
            },
            {
                "path": "/module/:pid/:id/:type/:algorithms",
                "name": "module3",
                "meta": {
                    "id": "module3",
                },
                component: () =>
                    import ('../views/home/project/module/Module.vue'),
            },
            {
                "path": "/deploymentplan",
                "name": "deploymentplan",

                component: () =>
                    import ('../views/home/project/Deploymentplan.vue'),
            },
            {
                "path": "/applications",
                "name": "applications",
                component: () =>
                    import ('../views/home/project/Applications.vue'),
            },
        ]
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () =>
            import ('../views/404.vue')
    }
]

const router = createRouter({
        history: createWebHashHistory(), //hash
        routes
    })
    //路由拦截
router.beforeEach((to, from, next) => {
    //console.log("menuData:::", menuData)
    // var res = menuData;
    // if (res) {
    //     let curUserInfo = res.userInfo;
    //     let curFuncList = res.funcInfo;
    //     let curDeptList = res.deptList;
    //     let curPostList = res.postList;
    //     if (curUserInfo && curFuncList.length > 0) {
    //         sessionStorage.setItem("curUserInfo", JSON.stringify(curUserInfo));
    //         sessionStorage.setItem("curFuncList", JSON.stringify(curFuncList));
    //         sessionStorage.setItem("curDeptList", JSON.stringify(curDeptList));
    //         sessionStorage.setItem("curPostList", JSON.stringify(curPostList));
    //         //console.log("curUserInfo………………")
    //         //跳转
    //         //router.push("/main");
    //     }
    // }

    //console.log("to,from:", to, from); 
    // var curUserInfo = sessionStorage.getItem("curUserInfo");
    // if (!curUserInfo || curUserInfo == "null") {
    //     if (to.path !== "/login") {
    //         next('/login');
    //     }
    // }
    // if (to.path == "/login") {
    //     //console.log("to.path login")
    //     sessionStorage.setItem("curUserInfo", null);
    //     sessionStorage.setItem("curFuncList", null);
    // }

    next();
})

export default router