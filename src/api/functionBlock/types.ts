import {SystemEventInput} from "@/api/systeminter/systemevent/types";
import {SystemEventOutput} from "@/api/systeminter/systemevent/types";
import {Controller} from "@/api/controller/types";
import {SystemVariInput} from "../systeminter/systemvari/types";
export interface FunctionBlock {
    raw_id:string
    title:string,
    centerText:string,
    device:string,
    input_events:BlockInputEventForm[],
    output_events:BlockOutputEventForm[],
    inputs:BlockInputVariForm[],
    outputs:BlockOutputVariForm[],
    controller:Controller
    // internals:string[],
    x:number,
    y:number,
}

export interface FunctionBlockTree {
    raw_id:string,
    title:string,
    centerText:string,
    device:string,
    input_events:BlockInputEventForm[],
    output_events:BlockOutputEventForm[],
    inputs:BlockInputVariForm[],
    outputs:BlockOutputVariForm[],
    controller:Controller
    // internals:string[],
    x:number,
    y:number,
    children?: FunctionBlockTree[]
}
export interface BlockInputEventForm {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput,
    graphId:string
}

export interface BlockInputEventVO {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
    type:string,
    relateEventName:string,
    graphId:string
}
export interface BlockOutputEventForm {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput,
    graphId:string
}

export interface BlockOutputEventVO  {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
    type:string,
    relateEventName:string,
    graphId:string
}
export interface BlockInputVariForm {
    blockId:string
    key:string,
    text:string,
    type:string,
    relatedEvents:Array<BlockInputEventForm>,
    relatedVari:SystemVariInput,
    graphId:string
}

export interface BlockInputVariVO {
    blockId:string
    key:string,
    text:string,
    relatedEvents:Array<BlockOutputEventForm>,
    relatedVari:SystemVariInput,
    type:string,
    relateEventName:string,
    relatedVariName:string,
    graphId:string
}

export interface BlockOutputVariForm {
    blockId:string
    key:string,
    text:string,
    type:string,
    relatedEvents:Array<BlockInputEventForm>,
    relatedVari:SystemVariInput,
    graphId:string
}

export interface BlockOutputVariVO {
    blockId:string
    key:string,
    text:string,
    relatedEvents:Array<BlockOutputEventForm>;
    relatedVari:SystemVariInput,
    type:string,
    relateEventName:string,
    relatedVariName:string,
    graphId:string
}
