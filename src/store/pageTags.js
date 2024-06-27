 export const pagetagsStore = defineStore("pagetagsStore", {
     state: () => ({
         TagArrs: [],
         TagModuleArrs: [],
         CurTag:{}
     }),
     getters: {

     },
     actions: {
         //添加选项卡
         AddTag(tag) {
             if (this.TagArrs.length > 0) {
                 this.TagArrs.forEach(e => {e.effect = "plain";e.selected =0;});
             }

             if (this.TagArrs.filter(item => item.path == (tag.path)).length == 0) {
                 tag.index = this.TagArrs.length+1;
                 tag.selected =1;
                 this.TagArrs.push(tag);
                 this.CurTag = tag;
                 console.log(this.TagArrs);
             } else {
                console.log("enter click");
                 let obj = this.TagArrs.find(item => item.path == tag.path);
                 
                 if (obj !== undefined) {    
                     obj.effect = "dark";
                     obj.selected = 1;
                     this.CurTag = obj;
                 }
                 console.log(obj);
             }
         },
         //  GetTagModule(param) {
         //      //console.log("pageTags", param);
         //      let moduleList = [];
         //      const curFuncList = JSON.parse(sessionStorage.getItem("curFuncLists"))
         //      let objFunc = curFuncList.find((obj) => obj.id == param.id);
         //      let parentId = param.pid;
         //      if (objFunc.funcLevelId == 3) {
         //          parentId = param.id;
         //      }
         //      if (objFunc.funcLevelId == 5) {
         //          let pObj = curFuncList.find((obj) => obj.id == parentId);
         //          //let ppObj = funcList.find((obj) => obj.id == pObj.funcParentId);
         //          parentId = pObj.funcParentId;
         //      }

         //      let listTemp = curFuncList.filter((obj) => obj.funcParentId == parentId);
         //      moduleList = JSON.parse(JSON.stringify(listTemp));
         //      moduleList.forEach(
         //          (l) => {
         //              if (l.funcName == "算法") {
         //                  let algorList = curFuncList.filter((obj) => obj.funcParentId == l.id);
         //                  if (algorList.length > 0) {
         //                      let cAlgor = algorList.find(x => x.id == param.id);
         //                      if (cAlgor) {
         //                          l.funcUrl = `${cAlgor.funcUrl}/${cAlgor.funcParentId}/${cAlgor.id}`;
         //                      } else {
         //                          let objAlgor = algorList[0]
         //                          l.funcUrl = `${objAlgor.funcUrl}/${objAlgor.funcParentId}/${objAlgor.id}`
         //                      }
         //                  } else {
         //                      l.funcUrl = "";
         //                  }
         //              } else {
         //                  l.funcUrl = `${l.funcUrl}/${l.funcParentId}/${l.id}`;
         //              }
         //              l.funcStatus = "plain"
         //          }
         //      );
         //      this.TagModuleArrs = moduleList;
         //  },
         //  ChangeTagModuleStatus(path) {
         //      this.TagModuleArrs.forEach(l => {
         //          l.funcStatus = "plain"
         //          if (l.funcUrl == path) {
         //              l.funcStatus = "dark"
         //          }
         //      })
         //  }
     },
 })