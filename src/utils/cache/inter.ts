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
export default {
    changeInputEvents,
    getInputEvents
};