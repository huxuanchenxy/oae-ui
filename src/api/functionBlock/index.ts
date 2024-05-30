import  cache  from "@/plugins/cache.ts";
import {getJsonAll}  from "@/utils/cache/systemConfig";
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
    if (!fbbs){
        return null;
    }
    let fbb=fbbs.filter(x=>{x.raw_id==id})
    return fbb;
});
/**
 * 更新大JSON的fbbs的内容
 * @param project
 * @param module
 * @param functionBlock
 */
const updateFbbs=(project,module,functionBlock)=>{
    let jsonAll = getJsonAll(project, module);
    let systemConfig=jsonAll.find(x=>x.type=="SystemConfiguration");
    console.log(systemConfig)
    let fbbs=listFunctionBlocks(project,module);
    fbbs=fbbs.filter(x=>x.raw_id!=functionBlock.raw_id);
    if(!fbbs){
        fbbs=new Array();
    }
    fbbs.push(functionBlock);
    systemConfig.applications[0].fbbs=fbbs;
    //先移除
    jsonAll=jsonAll.filter(x=>x.id!=systemConfig.id);
    //再加上
    jsonAll.push(systemConfig);
}
/**
 * 根据一个fbb更新大JSON
 * @param project
 * @param module
 * @param data
 */
export const saveOrUpdateFunctionBlock=(project,module,data:FunctionBlock)=>{
    let functionBlocks=listFunctionBlocks(project,module);
    if(functionBlocks){
        functionBlocks= functionBlocks.filter(
            x => x.raw_id != data.raw_id
        );
    }else{
        functionBlocks=new Array();
    }
    functionBlocks.push(data);
    updateFbbs(project,module,functionBlocks)
}