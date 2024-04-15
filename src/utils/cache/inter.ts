import  cache  from "@/plugins/cache.ts";
const cacheKey="json";
let oldJson;
const getJson=(project,module)=>{
    oldJson=cache.local.getJSON(cacheKey);
    if(!oldJson){
        return;
    }
    let rlt= oldJson.find(
        (x) => x.project == project&&x.name==module
    );
    oldJson=oldJson.filter(
        (x) => !(x.project == project&&x.name==module)
    );
    return rlt;
}
//----输入工具开始
export const changeInputEvents=(project,module,data)=>{
    let rlt=getJson(project,module);
    rlt.interface.input_events=data;
    oldJson.push(rlt);
    cache.local.setJSON(cacheKey,oldJson);
}
export const getInputEvents=(project,module)=>{
    let rlt=getJson(project,module);
    let inputEvents= rlt.interface.input_events;
    inputEvents.forEach(inputEvent => {
        let no=1;
        if(!inputEvent.no){
            inputEvent.no=no;
            no++;
        }
    });
    return inputEvents;
}
//----输入工具结束
//----输出工具开始
export const changeOutputEvents=(project,module,data)=>{
    let rlt=getJson(project,module);
    rlt.interface.output_events=data;
    oldJson.push(rlt);
    cache.local.setJSON(cacheKey,oldJson);
}
export const getOutputEvents=(project,module)=>{
    let rlt=getJson(project,module);
    let outputEvents= rlt.interface.output_events;
    outputEvents.forEach(outputEvent => {
        let no=1;
        if(!outputEvent.no){
            outputEvent.no=no;
            no++;
        }
    });
    return outputEvents;
}
//----输出工具结束
export default {
    changeInputEvents,
    getInputEvents,
    changeOutputEvents,
    getOutputEvents
};