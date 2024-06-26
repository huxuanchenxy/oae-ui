import cache from "@/plugins/cache.ts";
const deploymentCacheKey="deployment";
export const getSystemInputEvents = (project, module,id) => {
    return getSystemEvents(project,module,"Iutput",id)
}
export const getSystemOutputEvents = (project, module,id) => {
    return getSystemEvents(project,module,"Output",id)
}
const getSystemEvents=(project, module,type,id)=>{
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
    let event=node.jsonContent?.Event;
    if (!event||event.length<=0){
        return rltList;
    }
    event=event.filter(x=>x.Type==type);
    if(!event){
        return rltList;
    }
    event.forEach(vari=>{
        rltList.push({
            key:vari.Name,
            text:vari.Name,
            type:vari.Type
        })
    })
    return rltList;
}