import {getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/cache/common";
const cacheKey_configList= "deployment_configs";
import cache from "@/plugins/cache.ts";
export const getSystemInputVaris=(project,module)=>{
    return getSystemVaris("write");
}
export const getSystemOutputVaris=(project,module)=>{
    return getSystemVaris("read");
}
const getSystemVaris=(type)=>{
    let configList = cache.local.getJSON(cacheKey_configList);
    configList=configList.filter(x=>x.type==type);
    let rltList=new Array();
    if (configList||configList.length>0){
        configList.forEach((config)=>{
            rltList.push({
                key:config.id,
                text:config.name,
                type:getType(config.ioType)
            })
        })
    }
}
const getType=(ioType)=>{
    if(ioType=="AO"||ioType=="AI"){
        return "UNIT";
    }else{
        return "BOOL";
    }
}