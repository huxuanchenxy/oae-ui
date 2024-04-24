 export const pagetagsStore = defineStore("pagetagsStore", {
     state: () => ({
         TagArrs: [],
         TagModuleArrs: []
     }),
     getters: {

     },
     actions: {
         //添加选项卡
         AddTag(tag) {
             if (this.TagArrs.length > 0) {
                 this.TagArrs.forEach(e => e.effect = "plain");
             }
             if (this.TagArrs.filter(item => item.path.indexOf(tag.path) > -1).length == 0) {
                 this.TagArrs.push(tag);
             } else {
                 let obj = this.TagArrs.find(item => item.path == tag.path);
                 if (obj) {
                     obj.effect = "dark";
                 }
             }
         },
         GetTagModule(param) {
             //console.log("pageTags", param);
             let moduleList = [];
             const curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"))
             let objFunc = curFuncList.find((obj) => obj.id == param.id);
             let parentId = param.pid;
             if (objFunc.funcLevelId == 3) {
                 parentId = param.id;
             }
             if (objFunc.funcLevelId == 5) {
                 let pObj = curFuncList.find((obj) => obj.id == parentId);
                 //let ppObj = funcList.find((obj) => obj.id == pObj.funcParentId);
                 parentId = pObj.funcParentId;
             }

             let listTemp = curFuncList.filter((obj) => obj.funcParentId == parentId);
             moduleList = JSON.parse(JSON.stringify(listTemp));
             moduleList.forEach(
                 (l) => {
                     if (l.funcName == "算法") {
                         let algorList = curFuncList.filter((obj) => obj.funcParentId == l.id);
                         if (algorList.length > 0) {
                             let cAlgor = algorList.find(x => x.id == param.id);
                             if (cAlgor) {
                                 l.funcUrl = `${cAlgor.funcUrl}/${cAlgor.funcParentId}/${cAlgor.id}`;
                             } else {
                                 let objAlgor = algorList[0]
                                 l.funcUrl = `${objAlgor.funcUrl}/${objAlgor.funcParentId}/${objAlgor.id}`
                             }
                         } else {
                             l.funcUrl = "";
                         }
                     } else {
                         l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.id}`;
                     }
                     l.funcStatus = "plain"
                 }
             );
             this.TagModuleArrs = moduleList;
         },
         ChangeTagModuleStatus(path) {
             this.TagModuleArrs.forEach(l => {
                 l.funcStatus = "plain"
                 if (l.funcUrl == path) {
                     l.funcStatus = "dark"
                 }
             })
         }
     },
 })