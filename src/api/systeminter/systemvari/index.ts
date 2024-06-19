import {getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/cache/common";
const cacheKey_configList= "deployment_configs";
import cache from "@/plugins/cache.ts";
const deploymentCacheKey="deployment";
export const getSystemInputVaris=(id)=>{
    return getSystemVaris("write",id);
}
export const getSystemOutputVaris=(id)=>{
    return getSystemVaris("read",id);
}
/**
 * 得到系统变量
 * @param type write/read
 * @param id NODEID，用来取内置变量
 */
const getSystemVaris=(type,id)=>{
    //得到配置列表
    let configList = cache.local.getJSON(cacheKey_configList);
    configList=configList.filter(x=>x.type==type);
    let rltList=new Array();
    //把配置列表里的变量加上
    if (configList||configList.length>0){
        configList.forEach((config)=>{
            rltList.push({
                key:config.id,
                text:config.name,
                type:getType(config.ioType)
            })
        })
    }
    //这里需要把 write/read转化成XML里的对应字符串作为参数，再去得到内置变量
    rltList.concat(getInsideVari(convertTypeToXmlType(type),id));
    //把内置变量给加上
    return rltList;
}
/**
 * 根据IOTYPE得到类型
 * @param ioType
 */
const getType=(ioType)=>{
    if(ioType=="AO"||ioType=="AI"){
        return "UNIT";
    }else{
        return "BOOL";
    }
}
/**
 * 得到内置变量
 * @param type 输入还是输出 INPUT/OUTPUT
 * @param id NODEID
 */
const getInsideVari=(type,id)=>{
    let rltList=new Array();
    //根据ID得到设备/网络段/资源实例ID，取内置变量
    let json=cache.local.getJSON(deploymentCacheKey);
    if (!json||!json.nodes){
        return rltList;
    }
    let node=json.nodes.find(x=>x.id==id);
    let varis=node.jsonContent?.VarDeclaration;
    if (!varis||varis.length<=0){
        return rltList;
    }
    varis=varis.filter(x=>x.Enabled=="0"&&x.VarType==type);
    if(!varis){
        return rltList;
    }
    varis.forEach(vari=>{
        rltList.push({
            key:vari.Name,
            text:vari.Name,
            type:vari.Type
        })
    })
    return rltList;
}
const convertTypeToXmlType=(type)=>{
    if(type=="write"){
        return "INPUT"
    }else if(type=="read"){
        return "OUTPUT"
    }
}