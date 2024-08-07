//参数加上项目和模块以提高查找效率
import {getCurrentObj,changeData}  from "@/utils/cache/common";
import {StateMachine} from "./types";
const prefEvent="event";
const prefAlg="alg";
const listStates=(project,module):StateMachine[]=>{
    let rlt=getCurrentObj(project,module);
    return rlt.ecc.nodeDataArray;
}
//通过edgeKey得到localstorage得到当前连接线
export const getOneState=(project,module,id):StateMachine=>{
    let rlt=getCurrentObj(project,module);
    let states=rlt.ecc.nodeDataArray;
    let state= states?.find((data)=>data.key==id);
    return state;
}
export const getOneStateDetail=(project,module,id):StateMachine=>{
    let rlt=getCurrentObj(project,module);
    let states=rlt.ecc.states;
    return states?.find((data)=>data.key==id);
}
export const saveOrUpdateStateDetail=(project,module,data:StateMachine)=>{
    let rlt=getCurrentObj(project,module);
    let states=rlt.ecc.states;
    //如果不存在集合，直接加
    if(!states){
        states=new Array()
    }else{
        //如果存在集合，先删除原来的
        states=states.filter(x=>x.key!=data.key)
    }
    states.push(data)
    rlt.ecc.states=states;
    changeData(project,module,rlt)
}
//增加或修改单个
export const saveOrUpdateState=(project,module,data:StateMachine)=>{
    let rlt=getCurrentObj(project,module);
    let states=listStates(project,module);
    if(states){
        states= states.filter(
            x => x.key != data.key
        );
    }else{
        states=new Array();
    }
    states.push(data);
    rlt.ecc.nodeDataArray=states;
    changeData(project,module,rlt)
}
//删除localstorage里算法和事件，传算法ID，事件ID会一并删除
export const removeAlgAndEvent=(project,module,stateId,algId)=> {
    let idNoPrefix=algId.substring(prefAlg.length,algId.length)
    let eveId=prefEvent+idNoPrefix;
    let states=listStates(project, module);
    //得到当前事件
    let currentState= states.find(
        x => x.key == stateId
    );
    //当前事件删除对应算法和事件
    let algAndEvent=currentState.algAndEvent;
    algAndEvent=algAndEvent.filter(x=>x.alg.graphId!=algId);
    currentState.algAndEvent=algAndEvent;
    // currentState.algorithm=currentState.algorithm.filter(x=>x.key!=algId);
    // currentState.output_event=currentState.output_event.filter(x=>x.key!=eveId);
    //先删除再添加
    states= states.filter(
        x => x.key != stateId
    );
    states.push(currentState);
    let rlt=getCurrentObj(project,module);
    rlt.ecc.nodeDataArray=states;
    changeData(project,module,rlt)
}
export const removeState=(project,module,stateId)=> {
    let states=listStates(project, module);
    //得到当前事件
    states= states.filter(
        x => x.key != stateId
    );
    let rlt=getCurrentObj(project,module);
    rlt.ecc.nodeDataArray=states;
    changeData(project,module,rlt)
}