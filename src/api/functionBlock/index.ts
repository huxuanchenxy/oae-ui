import  cache  from "@/plugins/cache.ts";
import {getJsonAll,getCurrentObj,changeData}  from "@/utils/cache/common";
import {FunctionBlock} from "./types";
const listFunctionBlocks=((project,module):FunctionBlock[]=>{
    let jsonAll = getJsonAll(project, module);
    let systemConfig=jsonAll.filter(x=>x.type=="SystemConfiguration");
    if (systemConfig&&systemConfig.applications){
        return systemConfig.applications[0].fbbs;
    }else{
        return null;
    }
});
export const getOneFunctionBlock=((id:string,project,module)=>{
    let fbbs=listFunctionBlocks(project,module);
    if (!fbbs){
        return null;
    }
    let fbb=fbbs.filter(x=>{x.raw_id==id})
    return fbb;
});
