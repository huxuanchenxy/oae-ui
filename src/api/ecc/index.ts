//参数加上项目和模块以提高查找效率
import  cache  from "@/plugins/cache.ts";
import {removeCurrentModule}  from "@/utils/cache/common";
const seperator="-";
const edgesKey="edges";
const getCacheKey=(project,module)=>{
    return project+seperator+module+seperator+edgesKey;
}
//通过edgeKey得到localstorage连接线的列表
const listEdges=(project,module)=>{
    //project1-mokuai1-id
    const edgeKey=getCacheKey(project,module)
    return cache.local.getJSON(edgeKey);
}
//通过edgeKey得到localstorage得到当前连接线
export const getOneEdge=(project,module,id)=>{
    let edges=listEdges(project,module);
    return edges?.find((data)=>data.key==id);
}
//增加或修改localstorage里edgeKey的其中一个连接线
export const saveOrUpdateEdge=(project,module,data)=>{
    let edges=listEdges(project,module);
    if(edges){
        edges= edges.filter(
            (x) => !(x.key == data.key)
        );
    }else{
        edges=new Array();
    }
    edges.push(data);
    const edgeKey=getCacheKey(project,module)
    cache.local.setJSON(edgeKey,edges);
}
//删除localstorage里edgeKey的其中一个连接线
export const removeEdge=(project,module,data)=> {
    let edges = listEdges(project, module);
    if (edges) {
        removeCurrentEdge(project, module,data)
    }
}
const removeCurrentEdge=(project,module,id)=>{
    let edges=listEdges(project, module);
    edges= edges.filter(
        (x) => !(x.key == id)
    );
    const edgeKey=getCacheKey(project,module)
    cache.local.setJSON(edgeKey,edges);
}