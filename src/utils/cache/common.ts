//UTIL包内的业务ts都是用来变更最大的JSON文件的
import cache from "@/plugins/cache.ts";
import sysApi from "@/api/sysApi";
export const cacheKey = "json";
export const getCurrentObj = (project, module) => {
    let jsonAll = getJsonAll(project, module);
    let rlt = jsonAll?.find(
        (x) => x.project == project && x.id == module
    );
    // if (!rlt) {
    //     //如果缓存里找不到对应模块数据，也用初始数据
    //     return getInitData(project, module);
    // }
    return rlt;
}
export const getJsonAll = (project, module) => {
    if (!module) {
        return;
    }
    let jsonAll = cache.local.getJSON(cacheKey);
    //如果连缓存都没有，直接return初始数据
    // if (!jsonAll) {
    //     jsonAll = getInitArr(project, module);
    // }
    return jsonAll;
}
export const removeCurrentModule = (data, project, module) => {
    data = data.filter(
        (x) => !(x.project == project && x.id == module)
    );
    return data;
}
export const changeData = (project, module, moduleJson) => {
    let jsonAll = getJsonAll(project, module);//拿出全部
    jsonAll = removeCurrentModule(jsonAll, project, module);//移除当前模块
    jsonAll.push(moduleJson);//再把模块新JSON加进去
    cache.local.setJSON(cacheKey, jsonAll);
}
export const removeCurrentModuleByCache = (project, module) => {
    let jsonAll = getJsonAll(project, module);//拿出全部
    jsonAll = removeCurrentModule(jsonAll, project, module);//移除当前模块
    cache.local.setJSON(cacheKey, jsonAll);
}
//从后台获取module数据
export const getModuleData = async (project, id) => {
    let jsonAll = cache.local.getJSON(cacheKey);
    //如果连缓存都没有，直接[]值
    if (!jsonAll) {
        jsonAll = [];
        cache.local.setJSON(cacheKey, jsonAll);
    }
    let rlt = jsonAll?.find((x) => x.project == project && x.id == id);
    if (!rlt) {
        let params = { id };
        let { data } = await sysApi.getModuleAsync(params); 
        if (data) {
            let newObj = {
                project: project,
                namespace: "",
                folder: "",
                type: "",
                properties: {},
                interface: {},
                ecc: {},
                algorithms: [],
                id: "",
            };
            newObj.id = data.id;
            newObj.namespace = data.namespace;
            newObj.type = data.type;
            newObj.interface = JSON.parse(data.interface);
            newObj.properties = JSON.parse(data.properties);
            newObj.ecc = JSON.parse(data.ecc);
            newObj.algorithms = JSON.parse(data.algorithms);
            jsonAll.push(newObj); //再把模块新JSON加进去 
            cache.local.setJSON(cacheKey, jsonAll); 
        }


        // sysApi.getModule(params).then((res) => {
        //     if (res) {
        //         let newObj = {
        //             project: project,
        //             namespace: "",
        //             folder: "",
        //             type: "",
        //             properties: {},
        //             interface: {},
        //             ecc: {},
        //             algorithms: [],
        //             id: "",
        //         };
        //         newObj.id = res.id;
        //         newObj.namespace = res.namespace;
        //         newObj.type = res.type;
        //         newObj.interface = JSON.parse(res.interface);
        //         newObj.properties = JSON.parse(res.properties);
        //         newObj.ecc = JSON.parse(res.ecc);
        //         newObj.algorithms = JSON.parse(res.algorithms);
        //         jsonAll.push(newObj); //再把模块新JSON加进去 
        //         cache.local.setJSON(cacheKey, jsonAll);
        //     }
        // });
    }
};


