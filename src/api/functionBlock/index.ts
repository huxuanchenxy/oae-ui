import  cache  from "@/plugins/cache.ts";
import {getJsonAll,getCurrentObj,changeData}  from "@/utils/cache/systemConfig";
import {FunctionBlock} from "./types";
import {StateMachine} from "../ecc/state/types";
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
export const saveOrUpdateFunctionBlock=(project,module,data:FunctionBlock)=>{
    let rlt=getCurrentObj(project,module);
    let functionBlocks=listFunctionBlocks(project,module);
    if(functionBlocks){
        functionBlocks= functionBlocks.filter(
            x => x.raw_id != data.raw_id
        );
    }else{
        functionBlocks=new Array();
    }
    functionBlocks.push(data);
    rlt.ecc.nodeDataArray=functionBlocks;
    changeData(project,module,rlt)
}