import { createStore } from 'vuex'
import { funcList } from "@/jslib/common";

const store = createStore({
    state() {
        return {
            TagArrs: [],
            TagModuleArrs: []
        }
    },
    mutations: {
        //添加选项卡
        AddTag(state, tag) {
            if (state.TagArrs.length > 0) {
                state.TagArrs.forEach(e => e.effect = "plain");
            }
            if (state.TagArrs.filter(item => item.path.indexOf(tag.path) > -1).length == 0) {
                state.TagArrs.push(tag)

            } else {
                var obj = state.TagArrs.find(item => item.path == tag.path);

                if (obj) {
                    obj.effect = "dark";
                }
            }
        },
        GetTagModule(state, param) {
            let moduleList = []; //ref([]);  
            //console.log("param:::", param)
            const curFuncList = JSON.parse(sessionStorage.getItem("curFuncList"))
                //    JSON.parse(JSON.stringify(funcList))

            let objFunc = curFuncList.find((obj) => obj.funcId == param.id);
            let parentId = param.pid;
            if (objFunc.funcLevel == 3) {
                parentId = param.id;
            }
            let listTemp = curFuncList.filter((obj) => obj.funcParentId == parentId);

            moduleList = JSON.parse(JSON.stringify(listTemp));
            moduleList.map(
                (l) => {
                    l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.funcId}`;
                    l.funcStatus = "plain"
                }
            );
            state.TagModuleArrs = moduleList;
        },
        ChangeTagModuleStatus(state, path) {
            state.TagModuleArrs.forEach(l => {
                l.funcStatus = "plain"
                if (l.funcUrl == path) {
                    l.funcStatus = "dark"
                }
            })
        }

    }
})
export default store