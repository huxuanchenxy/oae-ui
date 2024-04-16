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
//----事件输入工具开始
export const changeInputEvents=(project,module,data)=>{
    let rlt=getJson(project,module);
    if(rlt){
        rlt.interface.input_events=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }
}
export const getInputEvents=(project,module)=>{
    let inputEvents;
    let rlt=getJson(project,module);
    if(rlt){
        inputEvents= rlt.interface.input_events;
        inputEvents.forEach(inputEvent => {
            let no=1;
            if(!inputEvent.no){
                inputEvent.no=no;
                no++;
            }
        });
    }
    return inputEvents;
}
//----事件输入工具结束
//----事件输出工具开始
export const changeOutputEvents=(project,module,data)=>{
    let rlt=getJson(project,module);
    if(rlt){
        rlt.interface.output_events=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }
}
export const getOutputEvents=(project,module)=>{
    let rlt=getJson(project,module);
    let outputEvents;
    if(rlt){
        outputEvents= rlt.interface.output_events;
        outputEvents.forEach(outputEvent => {
            let no=1;
            if(!outputEvent.no){
                outputEvent.no=no;
                no++;
            }
        });
    }
    return outputEvents;
}
//----事件输出工具结束
//----变量输入工具开始
export const changeInputVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    if(rlt){
        rlt.interface.inputs=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }
}
export const getInputVaris=(project,module)=>{
    let rlt=getJson(project,module);
    let inputVaris;
    if(rlt){
        inputVaris= rlt.interface.inputs;
        inputVaris.forEach(inputVari => {
            let no=1;
            if(!inputVari.no){
                inputVari.no=no;
                no++;
            }
        });
    }
    return inputVaris;
}
//----变量输入工具结束
//----变量输出工具开始
export const changeOutputVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    if(rlt){
        rlt.interface.outputs=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }
}
export const getOutputVaris=(project,module)=>{
    let rlt=getJson(project,module);
    let outputVaris;
    if(rlt){
        outputVaris= rlt.interface.outputs;
        outputVaris.forEach(outputVari => {
            let no=1;
            if(!outputVari.no){
                outputVari.no=no;
                no++;
            }
        });
    }
    return outputVaris;
}
//----变量输出工具结束
//----内部变量工具开始
export const changeInVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    if(rlt){
        rlt.interface.internals=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }
}
export const getInVaris=(project,module)=>{
    let rlt=getJson(project,module);
    let varis;
    if(rlt){
        varis= rlt.interface.internals;
        varis.forEach(vari => {
            let no=1;
            if(!vari.no){
                vari.no=no;
                no++;
            }
        });
    }
    return varis;
}
//----内部变量工具结束
//----临时变量工具开始
export const changeTempVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    if(rlt){
        rlt.interface.temps=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }
}
export const getTempVaris=(project,module)=>{
    let rlt=getJson(project,module);
    let varis;
    if(rlt){
        varis= rlt.interface.temps;
        varis.forEach(vari => {
            let no=1;
            if(!vari.no){
                vari.no=no;
                no++;
            }
        });
    }
    return varis;
}
//----临时变量工具结束
export default {
    changeInputEvents,
    getInputEvents,
    changeOutputEvents,
    getOutputEvents,
    changeInputVaris,
    getInputVaris,
    changeOutputVaris,
    getOutputVaris,
    changeInVaris,
    getInVaris,
    changeTempVaris,
    getTempVaris
};