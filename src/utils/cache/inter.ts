import  cache  from "@/plugins/cache.ts";
import  {getInitData,getInitArr}  from "@/api/common/init.ts";
const cacheKey="json";
// let oldJson;

export const getCurrentObj=(project,module)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt= jsonAll.find(
        (x) => x.project == project&&x.name==module
    );
    if(!rlt){
        //如果缓存里找不到对应模块数据，也用初始数据
        return getInitData(project,module);
    }
    // oldJson=oldJson.filter(
    //     (x) => !(x.project == project&&x.name==module)
    // );
    return rlt;
}
const getJsonAll=(project,module)=>{
    let jsonAll= cache.local.getJSON(cacheKey);
    //如果连缓存都没有，直接return初始数据
    if(!jsonAll){
        let initArr= getInitArr(project,module);
        return initArr;
    }
    return jsonAll;
}
const removeCurrentModule=(data,project,module)=>{
    data= data.filter(
        (x) => !(x.project == project&&x.name==module)
    );
    return data;
}
//----事件输入工具开始
export const changeInputEvents=(project,module,data)=>{
    let jsonAll=getJsonAll(project,module);
    let rlt=getCurrentObj(project,module);
    rlt.interface.input_events=data;
    //先移除当前的
    jsonAll=removeCurrentModule(jsonAll,project,module);
    jsonAll.push(rlt);
    console.log("push后的jsonall",jsonAll)
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
    console.log("push后的jsonall",jsonAll)
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
    console.log("push后的jsonall",jsonAll)
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
    console.log("push后的jsonall",jsonAll)
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
    console.log("push后的jsonall",jsonAll)
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
    console.log("push后的jsonall",jsonAll)
    cache.local.setJSON(cacheKey,jsonAll);
}

//----临时变量工具结束
export default {
    getCurrentObj,
    changeInputEvents,
    changeOutputEvents,
    changeInputVaris,
    changeOutputVaris,
    changeInVaris,
    changeTempVaris
};