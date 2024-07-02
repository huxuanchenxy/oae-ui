import cache from "@/plugins/cache.ts";
import {SystemEventInput, SystemEventOutput} from "./types";
const deploymentCacheKey="deployment";

export const getSystemInputEvents=(project, module,id)=>{
    let rltList:SystemEventInput[]=new Array();
    //根据ID得到设备/网络段/资源实例ID，取内置变量
    let json=cache.local.getJSON(deploymentCacheKey);
    if (!json||!json.nodes){
        return rltList;
    }
    let node=json.nodes.find(x=>x.id==id);
    if(!node||!node.jsonContent){
        return;
    }
    let jsonContent=JSON.parse(node.jsonContent)
    let events=jsonContent.Event;
    if (!events||events.length<=0){
        return rltList;
    }
    let inputEvents=events.filter(x=>x.Type=="Input");
    if(!inputEvents){
        return rltList;
    }
    inputEvents.forEach(vari=>{
        rltList.push({
            key:vari.Name,
            text:vari.Name,
            type:vari.Type,
            relatedEventOutput:getRelateOutputEvent(events,vari.Name)
        })
    })
    return rltList;
}
/**
 * 找出输入事件对应的输出事件
 * @param events 所有事件
 * @param inputEventName 对应的输入事件名称
 */
const getRelateOutputEvent:(events, inputEventName) => SystemEventOutput=(events, inputEventName)=>{
    //找出对应输入事件
    let inputEvent=events.find(x=>x.Type=="Input"&&x.Name==inputEventName);
    if (!inputEvent){
        return;
    }
    //输入事件有link，对应输出事件
    let outputEventName=inputEvent.Link.Event;
    //从events里找出找到的输出事件
    return events.find(x=>x.Type=="Output"&&x.Name==outputEventName);
}