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
    relatedEvent:SystemEventInput;
}

export interface BlockInputEventVO {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
    type:string,
    relateEventName:string
}
export interface BlockOutputEventForm {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
}

export interface BlockOutputEventVO  {
    blockId:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
    type:string,
    relateEventName:string
}
export interface BlockInputVariForm {
    blockId:string
    key:string,
    text:string,
    type:string,
    relatedEvents:Array<BlockInputEventForm>,
    relatedVari:SystemVariInput
}

export interface BlockInputVariVO {
    blockId:string
    key:string,
    text:string,
    relatedEvents:Array<BlockOutputEventForm>,
    relatedVari:SystemVariInput,
    type:string,
    relateEventName:string,
    relatedVariName:string
}

export interface BlockOutputVariForm {
    blockId:string
    key:string,
    text:string,
    type:string,
    relatedEvents:Array<BlockInputEventForm>,
    relatedVari:SystemVariInput
}

export interface BlockOutputVariVO {
    blockId:string
    key:string,
    text:string,
    relatedEvents:Array<BlockOutputEventForm>;
    relatedVari:SystemVariInput,
    type:string,
    relateEventName:string,
    relatedVariName:string
}
