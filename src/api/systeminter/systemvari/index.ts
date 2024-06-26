import {getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/cache/common";
const cacheKey_configList= "deployment_configs";
import cache from "@/plugins/cache.ts";
const deploymentCacheKey="deployment";
export const getSystemInputVaris=(project,modeule,id)=>{
    return getSystemVaris(project,modeule,"write",id);
}
export const getSystemOutputVaris=(project,modeule,id)=>{
    return getSystemVaris(project,modeule,"read",id);
}
/**
 * 得到系统变量
 * @param type write/read
 * @param id NODEID，用来取内置变量
 */
const getSystemVaris=(project,modeule,type,id)=>{
    let segChildrenIds=getSegChildrenIds(project,modeule,id);
    if (!segChildrenIds||segChildrenIds.length<=0){
        return ;
    }
    //得到配置列表
    let configList = cache.local.getJSON(cacheKey_configList);
    let deployment = cache.local.getJSON(deploymentCacheKey)?.nodes;
    //得到对应ID的配置列表
    configList=configList.filter(x=>x.type==type&&segChildrenIds.includes(x.nodeId)&&x.isGroup!=1);
    if (!configList||configList.length<=0){
        return ;
    }
    let rltList=new Array();
    //把配置列表里的变量加上
    configList.forEach((config)=>{
        //得到设备
        let currentDeployment=deployment.find(x=>x.id==config.nodeId);
        rltList.push({
            key:config.id,
            //为防止变量冲突，加上设备前缀
            text:currentDeployment?.label+"_"+config.name,
            type:getType(config.ioType)
        })
    })
    //这里需要把 write/read转化成XML里的对应字符串作为参数，再去得到内置变量
    rltList.concat(getInsideVari(project ,module,convertTypeToXmlType(type),id));
    //把内置变量给加上
    return rltList;
}
//通过网络段ID查找他下面设备的所有ID
const getSegChildrenIds=(project,modeule,segId)=>{
    //查找该网络段所关联的所有线
    let deploymentEdges = cache.local.getJSON(deploymentCacheKey)?.edges;
    if (!deploymentEdges){
        return;
    }
    //由于可能是双向，把target和source的都加上
    let relatgedIds=deploymentEdges.filter(x=>x.source==segId).map(x=>x.target);
    if (!relatgedIds){
        relatgedIds=new Array();
    }
    relatgedIds.concat(deploymentEdges.filter(x=>x.target==segId).map(x=>x.source));
    if (relatgedIds.length<=0){
        return;
    }
    //在nodes里查找出所有cardInfo.largeType=target_device的ID
    let deploymentNodes = cache.local.getJSON(deploymentCacheKey)?.nodes;
    return deploymentNodes.filter(x=>relatgedIds.includes(x.id)&&x.cardInfo.largeType=="target_device")?.map(x=>x.id);
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
const getInsideVari=(project,modeule,type,id)=>{
    let rltList=new Array();
    //根据ID得到设备/网络段/资源实例ID，取内置变量
    let json=cache.local.getJSON(deploymentCacheKey);
    if (!json||!json.nodes){
        return rltList;
    }
    let node=json.nodes.find(x=>x.id==id);
    if(!node||!node.jsonContent){
        return;
    }
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