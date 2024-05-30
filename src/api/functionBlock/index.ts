import  cache  from "@/plugins/cache.ts";
import {getJsonAll,cacheKey}  from "@/utils/cache/systemConfig";
import {FunctionBlock} from "./types";

/**
 * 找出所有的fbbs
 */
const listFunctionBlocks=((project,module):FunctionBlock[]=>{
    let jsonAll = getJsonAll(project, module);
    let systemConfig=jsonAll.find(x=>x.type=="SystemConfiguration");
    if (systemConfig&&systemConfig.applications){
        return systemConfig.applications[0].fbbs;
    }else{
        return null;
    }
});
/**
 * 得到一个functionblock
 */
export const getOneFunctionBlock=((project,module,id:string)=>{
    let fbbs=listFunctionBlocks(project,module);
    console.log(fbbs)
    if (!fbbs){
        return null;
    }
    let fbb=fbbs.filter(x=>{x.raw_id==id})
    return fbb;
});
/**
 * 根据一个fbb更新大JSON
 * @param project
 * @param module
 * @param data
 */
export const saveOrUpdateFunctionBlock=(project,module,data:FunctionBlock)=>{
    let jsonAll = getJsonAll(project, module);
    let systemConfig=jsonAll.find(x=>x.type=="SystemConfiguration");
    let fbbs=listFunctionBlocks(project,module);
    if(!fbbs){
        fbbs=new Array();
    }else{
        fbbs=fbbs.filter(x=>x.raw_id!=data.raw_id);
    }
    fbbs.push(data);
    systemConfig.applications[0].fbbs=fbbs;
    //先移除
    jsonAll=jsonAll.filter(x=>x.id!=systemConfig.id);
    //再加上
    jsonAll.push(systemConfig);
    cache.local.setJSON(cacheKey,jsonAll);
}