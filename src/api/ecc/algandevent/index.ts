import {AlgAndEventForm} from "./types";
import {getOneState} from "@/api/ecc/state";
export const getAlgAndEventById=(project,module,stateId,id):AlgAndEventForm=>{
    let state=getOneState(project,module,stateId);
    let algAndEvent:AlgAndEventForm[]=state.algAndEvent;
    return algAndEvent?.find(x=>x.id==id);
}