import {Alg} from "@/api/alg/types";
import {Eve} from "@/api/inter/event/types";
import {AlgSimple} from "../../alg/types";

export interface StateMachine {
    key:string,
    text:string,
    algorithm:Array<{ id: string; name: string }>;//大JSON用
    output_event:Array<{ id: string; name: string }>;//大JSON用
    algAndEvent:Array<{alg:AlgSimple,event:Eve}>//实际业务用
    comment:string
}

export interface StateQuery extends PageQuery {
    name: string;
}
export interface StateForm {
    key:string,
    text:string,
    relatedEvents:{ id: string; name: string };
    comment:string
}

export interface StateVO extends BaseEntity {
    key:string,
    text:string,
    algAndEvent:Array<{alg:AlgSimple,event:Eve}>
    algAndEventName:Array<{alg:string,event:string}>
    comment:string
}
