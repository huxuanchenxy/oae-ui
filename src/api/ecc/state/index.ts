//参数加上项目和模块以提高查找效率
import  cache  from "@/plugins/cache.ts";
import {getCurrentObj,changeData}  from "@/utils/cache/common";
const listStates=(project,module)=>{
    let rlt=getCurrentObj(project,module);
    return rlt.ecc.nodeDataArray;
}
//通过edgeKey得到localstorage得到当前连接线
export const getOneState=(project,module,id)=>{
    let rlt=getCurrentObj(project,module);
    let states=rlt.ecc.nodeDataArray;
    return states?.find((data)=>data.key==id);
}
//增加或修改localstorage里edgeKey的其中一个连接线
export const saveOrUpdateState=(project,module,data)=>{
    let rlt=getCurrentObj(project,module);
    let states=listStates(project,module);
    if(states){
        states= states.filter(
            (x) => !(x.key == data.key)
        );
    }else{
        states=new Array();
    }
    states.push(data);
    rlt.ecc.nodeDataArray=states;
    changeData(project,module,rlt)
}
//删除localstorage里edgeKey的其中一个连接线
export const removeState=(project,module,id)=> {
    let rlt=getCurrentObj(project,module);
    let states=listStates(project, module);
    states= states.filter(
        (x) => !(x.key == id)
    );
    rlt.ecc.nodeDataArray=states;
    changeData(project,module,rlt)
}