import {Eve} from "@/api/inter/event/types";
import {AlgSimple} from "@/api/alg/types";

export interface StateMachine {
    key:string,
    text:string,
    x:number,
    y:number,
    algorithm:Array<{ key: string; text: string }>;//大JSON用
    output_event:Array<{ key: string; text: string }>;//大JSON用
    algAndEvent:Array<{alg:AlgSimple,event:Eve}>//实际业务用
    comment:string
}

export interface StateQuery extends PageQuery {
    name: string;
}
export interface StateForm {
    key:string,
    text:string,
    algorithm:{ id: string; name: string };
    output_event:{ id: string; name: string };
}
export interface StateQuery extends PageQuery {
    name: string;
}
export interface StateVO extends BaseEntity {
    key:string,
    text:string,
    x:number,
    y:number,
    algAndEvent:Array<{alg:AlgSimple,event:Eve}>
    comment:string
}
