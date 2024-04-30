import {Eve} from "@/api/inter/event/types";
import {AlgSimple} from "@/api/alg/types";
import {AlgAndEventForm} from "../algandevent/types";

export interface StateMachine {
    key:string,
    text:string,
    x:number,
    y:number,
    algorithm:AlgSimple[];//大JSON用
    output_event:Eve[];//大JSON用
    algAndEvent:AlgAndEventForm[]//实际业务用
    comment:string
}

export interface StateQuery extends PageQuery {
    name: string;
}
export interface StateForm {
    key:string,
    text:string,
}
export interface StateQuery extends PageQuery {
    name: string;
}
export interface StateVO extends BaseEntity {
    key:string,
    text:string,
    x:number,
    y:number,
    algAndEvent:AlgAndEventForm[]
    comment:string
}
