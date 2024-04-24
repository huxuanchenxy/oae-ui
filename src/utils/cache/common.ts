//UTIL包内的业务ts都是用来变更最大的JSON文件的
import  cache  from "@/plugins/cache.ts";
import  {getInitData,getInitArr}  from "@/api/common/init.ts";

export const cacheKey="json";
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
export const getJsonAll=(project,module)=>{
    let jsonAll= cache.local.getJSON(cacheKey);
    //如果连缓存都没有，直接return初始数据
    if(!jsonAll){
        let initArr= getInitArr(project,module);
        return initArr;
    }
    return jsonAll;
}
export const removeCurrentModule=(data,project,module)=>{
    data= data.filter(
        (x) => !(x.project == project&&x.name==module)
    );
    return data;
}