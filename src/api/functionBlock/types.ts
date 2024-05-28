import {SystemEventInput} from "@/api/systeminter/systemevent/types";
import {SystemEventOutput} from "@/api/systeminter/systemevent/types";
export interface FunctionBlock {
    raw_id:string
    title:string,
    centerText:string,
    device:string,
    input_events:BlockInputEventForm[],
    output_events:BlockOutputEventForm[],
    inputs:BlockInputVariForm[],
    outputs:BlockOutputVariForm[],
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
    // internals:string[],
    x:number,
    y:number,
    children?: FunctionBlockTree[]
}
export interface BlockInputEventForm {
    block_id:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
}

export interface BlockInputEventVO {
    block_id:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
    type:string,
    relateEventName:string
}
export interface BlockOutputEventForm {
    block_id:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
}

export interface BlockOutputEventVO  {
    block_id:string
    key:string,
    text:string,
    relatedEvent:SystemEventInput;
    type:string,
    relateEventName:string
}
export interface BlockInputVariForm {
    block_id:string
    key:string,
    text:string,
    relatedEvents:Array<BlockInputEventForm>;
}

export interface BlockInputVariVO {
    block_id:string
    key:string,
    text:string,
    relatedEvents:Array<BlockOutputEventForm>;
    type:string,
    relateEventName:string
}

export interface BlockOutputVariForm {
    block_id:string
    key:string,
    text:string,
    relatedEvents:Array<BlockInputEventForm>;
}

export interface BlockOutputVariVO {
    block_id:string
    key:string,
    text:string,
    relatedEvents:Array<BlockOutputEventForm>;
    type:string,
    relateEventName:string
}
