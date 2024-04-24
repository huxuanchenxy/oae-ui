import  cache  from "@/plugins/cache.ts";
import {getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/common/common.ts";
import  {cacheKey,getInitData,getInitArr}  from "@/api/common/init.ts";
export const changeLinkData=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.ecc.linkDataArray=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}