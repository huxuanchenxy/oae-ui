import  cache  from "@/plugins/cache.ts";
import {cacheKey,getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/cache/common";
// let oldJson;

//----事件输入工具开始
export const changeInputEvents=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.input_events=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}
//----事件输入工具结束
//----事件输出工具开始
export const changeOutputEvents=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.output_events=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}

//----事件输出工具结束
//----变量输入工具开始
export const changeInputVaris=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.inputs=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}

//----变量输入工具结束
//----变量输出工具开始
export const changeOutputVaris=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.outputs=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}

//----变量输出工具结束
//----内部变量工具开始
export const changeInVaris=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.internals=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}

//----内部变量工具结束
//----临时变量工具开始
export const changeTempVaris=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.temps=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    cache.local.setJSON(cacheKey,jsonAll);
}
