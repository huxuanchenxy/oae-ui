//参数加上项目和模块以提高查找效率
import  cache  from "@/plugins/cache.ts";
import {getCurrentObj,getJsonAll,removeCurrentModule,changeData}  from "@/utils/cache/common";
//通过edgeKey得到localstorage连接线的列表
const listEdges=(project,module)=>{
    let rlt=getCurrentObj(project,module);
    return rlt.ecc.linkDataArray;
    //project1-mokuai1-id
    // const edgeKey=getCacheKey(project,module)
    // return cache.local.getJSON(edgeKey);
}
//通过edgeKey得到localstorage得到当前连接线
export const getOneEdge=(project,module,id)=>{
    let rlt=getCurrentObj(project,module);
    let edges=rlt.ecc.linkDataArray;
    return edges?.find((data)=>data.key==id);
    // let edges=listEdges(project,module);
    // return edges?.find((data)=>data.key==id);
}
//增加或修改localstorage里edgeKey的其中一个连接线
export const saveOrUpdateEdge=(project,module,data)=>{
    let rlt=getCurrentObj(project,module);
    let edges=listEdges(project,module);
    if(edges){
        edges= edges.filter(
            (x) => !(x.key == data.key)
        );
    }else{
        edges=new Array();
    }
    edges.push(data);
    rlt.ecc.linkDataArray=edges;
    changeData(project,module,rlt)
}
//删除localstorage里edgeKey的其中一个连接线
export const removeEdge=(project,module,id)=> {
    let rlt=getCurrentObj(project,module);
    let edges=listEdges(project, module);
    edges= edges.filter(
        (x) => !(x.key == id)
    );
    rlt.ecc.linkDataArray=edges;
    changeData(project,module,rlt)
}