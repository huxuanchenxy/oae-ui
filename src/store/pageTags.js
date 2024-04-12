 export const pagetagsStore = defineStore("pagetagsStore", {
     state: () => ({
         TagArrs: [],
         TagModuleArrs: []
     }),
     getters: {

     },
     actions: {
         // addCount(v) {
         //     this.title += v;
         //     this.count += v;
         // },
         //添加选项卡
         AddTag(tag) {
             if (this.TagArrs.length > 0) {
                 this.TagArrs.forEach(e => e.effect = "plain");
             }
             if (this.TagArrs.filter(item => item.path.indexOf(tag.path) > -1).length == 0) {
                 this.TagArrs.push(tag)

             } else {
                 let obj = this.TagArrs.find(item => item.path == tag.path);
                 if (obj) {
                     obj.effect = "dark";
                 }
             }
         },
         GetTagModule(param) {
             let moduleList = [];
             const curFuncList = JSON.parse(sessionStorage.getItem("curFuncList"))
                 //JSON.parse(JSON.stringify(funcList))

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