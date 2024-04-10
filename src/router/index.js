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
                    group: '/main'
                },
                component: () =>
                    import ('../views/home/main/Index.vue')

            },

            {
                "path": "/xmcs",
                "name": "xmcs",
                "meta": {
                    "id": "4907628fe8ce",
                    "title": "项目测试",
                    "group": "xmcs"
                },

                "children": [{
                    "path": "/mk/:pid/:id",
                    "name": "mk",
                    "meta": {
                        "id": "49etce",
                        "title": "模块一",

                    },
                    component: () =>
                        import ('../views/home/project/module/Module.vue'),
                    "children": [{
                            "path": "/jiekou/:pid/:id",
                            "name": "jiekou",
                            "meta": {
                                "id": "1536a8ce",
                                "title": "接口",

                            },
                            component: () =>
                                import ('../views/home/project/module/cusinterface/Cusinterface.vue')
                        },
                        {
                            "path": "/suanfa/:pid/:id",
                            "name": "suanfa",
                            "meta": {
                                "id": "5860ab8ce",
                                "title": "算法",

                            },
                            component: () =>
                                import ('../views/home/project/module/algorithm/Algorithm.vue')
                        },
                        {
                            "path": "/ecc/:pid/:id",
                            "name": "ecc",
                            "meta": {
                                "id": "4907a8ce",
                                "title": "ECC",
                                "group": "xmcs"
                            },
                            component: () =>
                                import ('../views/home/project/module/ecc/Ecc.vue')
                        }
                    ]
                }]
            },

            {
                path: '/inter', //  
                name: '接口',
                meta: {
                    id: "inter",
                    title: '接口',
                    group: '/inter'
                },
                component: () =>
                    import ('@/views/inter/main/index.vue'),
                children: [{
                        path: 'event', //  
                        name: 'event',
                        component: () =>
                            import ('@/views/inter/event/index.vue')
                    },
                    {
                        path: 'vari', //  
                        name: 'vari',
                        component: () =>
                            import ('@/views/inter/vari/index.vue')
                    },
                    {
                        path: 'invari', //  
                        name: 'invari',
                        component: () =>
                            import ('@/views/inter/invari/index.vue')
                    },
                    {
                        path: 'tmpvari', //  
                        name: 'tmpvari',
                        component: () =>
                            import ('@/views/inter/tmpvari/index.vue')
                    }
                ]
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
    var res = menuData;
    if (res) {
        let curUserInfo = res.userInfo;
        let curFuncList = res.funcInfo;
        let curDeptList = res.deptList;
        let curPostList = res.postList;
        if (curUserInfo && curFuncList.length > 0) {
            sessionStorage.setItem("curUserInfo", JSON.stringify(curUserInfo));
            sessionStorage.setItem("curFuncList", JSON.stringify(curFuncList));
            sessionStorage.setItem("curDeptList", JSON.stringify(curDeptList));
            sessionStorage.setItem("curPostList", JSON.stringify(curPostList));
            //console.log("curUserInfo………………")
            //跳转
            //router.push("/main");
        }
    }

    //console.log("to,from:", to, from); 
    var curUserInfo = sessionStorage.getItem("curUserInfo");
    if (!curUserInfo || curUserInfo == "null") {
        if (to.path !== "/login") {
            next('/login');
        }
    }
    if (to.path == "/login") {
        //console.log("to.path login")
        sessionStorage.setItem("curUserInfo", null);
        sessionStorage.setItem("curFuncList", null);
    }

    next();
})

export default router