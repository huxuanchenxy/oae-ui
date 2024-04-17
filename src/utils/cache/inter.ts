import  cache  from "@/plugins/cache.ts";
import  {getInitData}  from "@/api/common/init.ts";
const cacheKey="json";
let oldJson;

export const getJson=(project,module)=>{
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
    //如果缓存里有，就设置进去，否则，需要给初始值
    if(rlt){
        rlt.interface.input_events=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }else{
        rlt=getInitData(module);
        console.log(111,rlt)
        rlt[0].interface.input_events=data;
        cache.local.setJSON(cacheKey,rlt);
    }
}
//----事件输入工具结束
//----事件输出工具开始
export const changeOutputEvents=(project,module,data)=>{
    let rlt=getJson(project,module);
    //如果缓存里有，就设置进去，否则，需要给初始值
    if(rlt){
        rlt.interface.output_events=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }else{
        rlt=commonApi.initJson(module);
        rlt[0].interface.input_events=data;
        cache.local.setJSON(cacheKey,rlt);
    }
}

//----事件输出工具结束
//----变量输入工具开始
export const changeInputVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    //如果缓存里有，就设置进去，否则，需要给初始值
    if(rlt){
        rlt.interface.inputs=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }else{
        rlt=commonApi.initJson(module);
        rlt[0].interface.input_events=data;
        cache.local.setJSON(cacheKey,rlt);
    }
}

//----变量输入工具结束
//----变量输出工具开始
export const changeOutputVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    //如果缓存里有，就设置进去，否则，需要给初始值
    if(rlt){
        rlt.interface.outputs=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }else{
        rlt=commonApi.initJson(module);
        rlt[0].interface.input_events=data;
        cache.local.setJSON(cacheKey,rlt);
    }
}

//----变量输出工具结束
//----内部变量工具开始
export const changeInVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    //如果缓存里有，就设置进去，否则，需要给初始值
    if(rlt){
        rlt.interface.internals=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }else{
        rlt=commonApi.initJson(module);
        rlt[0].interface.input_events=data;
        cache.local.setJSON(cacheKey,rlt);
    }
}

//----内部变量工具结束
//----临时变量工具开始
export const changeTempVaris=(project,module,data)=>{
    let rlt=getJson(project,module);
    //如果缓存里有，就设置进去，否则，需要给初始值
    if(rlt){
        rlt.interface.temps=data;
        oldJson.push(rlt);
        cache.local.setJSON(cacheKey,oldJson);
    }else{
        rlt=commonApi.initJson(module);
        rlt[0].interface.input_events=data;
        cache.local.setJSON(cacheKey,rlt);
    }
}

//----临时变量工具结束
export default {
    getJson,
    changeInputEvents,
    changeOutputEvents,
    changeInputVaris,
    changeOutputVaris,
    changeInVaris,
    changeTempVaris
};