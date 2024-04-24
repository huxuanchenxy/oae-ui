//参数加上项目和模块以提高查找效率
import  cache  from "@/plugins/cache.ts";
import {removeCurrentModule}  from "@/utils/cache/common";
const seperator="-";
const key="canvas";
const getCacheKey=(project,module)=>{
    return project+seperator+module+seperator+key;
}
//通过edgeKey得到localstorage得到当前连接线
export const getCanvas=(project,module)=>{
    const cacheKey=getCacheKey(project,module)
    return cache.local.getJSON(cacheKey);
}
//增加或修改localstorage里edgeKey的其中一个连接线
export const saveOrUpdateCanvas=(project,module,data)=>{
    const cacheKey=getCacheKey(project,module)
    cache.local.setJSON(cacheKey,data);
}