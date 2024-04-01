import {
    createRouter,
    createWebHashHistory
} from 'vue-router'
// import store from '../store/index'
// import dealWithRoute from "./dealWithRoute";
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
        path: '/home', //路径
        name: 'home', //名字 唯一
        meta: {
            id: "home",
            title: '上海电气-工控IDE',
            group: '/home'
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
                    import ('../views/home/main/Main.vue')
            }

        ]
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () =>
            import ('../views/404.vue')
    }
]

let curFuncListStr = sessionStorage.getItem("curFuncList");
if (curFuncListStr && curFuncListStr != "null") {
    const curFuncList = JSON.parse(curFuncListStr);
    let arrayRoutes = [];
    // 读取所有节点下的文件
    const m =
        import.meta.glob(['../views/*.vue', '../views/*/*.vue', '../views/*/*/*.vue', '../views/*/*/*/*.vue'])
    let localArr = []
    for (var it in m) {
        localArr.push({ filepath: it, component: m[it] })
    }
    if (curFuncList) {
        const listOneFuncList = curFuncList.filter((obj) => {
            return obj.funcLevel == 1;
        });
        listOneFuncList.map((entity) => {
            entity.child = curFuncList.filter((obj) => {
                return obj.funcParentId == entity.funcId && obj.funcLevel == 2;
            });
            if (entity.child) {
                entity.child.map(e => {
                    e.child = curFuncList.filter((o) => {
                        return o.funcParentId == e.funcId && o.funcLevel == 3;
                    });
                })
            }
        });

        listOneFuncList.forEach((obj) => {
            if (localArr.find(s => s.filepath.indexOf(obj.pageAddress) > -1)) {
                var funcObj = {
                    path: obj.funcUrl, // '/sys',  
                    name: obj.funcUrl.substr(1), //'/sys',
                    meta: {
                        id: obj.funcId,
                        title: obj.funcShowName,
                        group: obj.sameGroup
                    },
                    redirect: obj.redirectUrl,
                    // component: () =>
                    //     import( /* @vite-ignore */ `${obj.pageAddress}.vue`),
                    component: localArr.find(s => s.filepath.indexOf(obj.pageAddress) > -1).component
                };
                funcObj.children = [];
            }
            if (obj.child) {
                obj.child.forEach((objChild) => {
                    if (localArr.find(s => s.filepath.indexOf(objChild.pageAddress) > -1)) {
                        var childObj = {
                            path: objChild.funcUrl,
                            name: objChild.funcUrl.substr(1),
                            meta: {
                                id: objChild.funcId,
                                title: objChild.funcShowName,
                                group: objChild.sameGroup
                            },
                            redirect: objChild.redirectUrl,
                            // component: () =>
                            //     import( /* @vite-ignore */ `${objChild.pageAddress}.vue`)
                            component: localArr.find(s => s.filepath.indexOf(objChild.pageAddress) > -1).component
                        };
                        childObj.children = [];
                    }
                    if (objChild.child) {
                        objChild.child.forEach((objChildThree) => {
                            if (localArr.find(s => s.filepath.indexOf(objChildThree.pageAddress) > -1)) {
                                //console.log("----", localArr.find(s => s.filepath.indexOf(objChildThree.pageAddress) > -1));
                                var childObjThree = {
                                    path: objChildThree.funcUrl,
                                    name: objChildThree.funcUrl.substr(1),
                                    meta: {
                                        id: objChildThree.funcId,
                                        title: objChildThree.funcShowName,
                                        group: objChildThree.sameGroup
                                    },
                                    // component: () =>
                                    //     import ( /* @vite-ignore */ `${objChildThree.pageAddress}.vue`)
                                    component: localArr.find(s => s.filepath.indexOf(objChildThree.pageAddress) > -1).component
                                };
                                childObj.children.push(childObjThree);
                            }
                        });
                    }
                    funcObj.children.push(childObj);
                })
            }
            arrayRoutes.push(funcObj);
        });
    }
    routes[2].children = routes[2].children.concat(arrayRoutes);
    console.log("routes", routes);
}
const router = createRouter({
        history: createWebHashHistory(), //hash
        routes
    })
    //路由拦截
router.beforeEach((to, from, next) => {
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



// //路由拦截
// let listOneFuncList = [];
// router.beforeEach((to, from, next) => {
//     console.log("to,from:", to, from);
//     if (!sessionStorage.getItem("curUserInfo")) {
//         if (to.path !== "/login") {
//             next('/login');
//         }

//     } else if (listOneFuncList.length == 0) {
//         console.log("listOneFuncList", listOneFuncList)
//         let curFuncList = JSON.parse(sessionStorage.getItem("curFuncList"));
//         if (curFuncList) {
//             listOneFuncList = curFuncList.filter((obj) => {
//                 return obj.funcLevel == 1;
//             });
//             listOneFuncList.map((entity) => {
//                 entity.child = curFuncList.filter((obj) => {
//                     return obj.funcParentId == entity.funcId && obj.funcLevel == 2;
//                 });
//             });
//             console.log("listOneFuncList--2", listOneFuncList)
//             dealWithRoute(listOneFuncList)
//             next({
//                 ...to,
//                 replace: true
//             })

//         }
//     }
//     next();
// })



export default router