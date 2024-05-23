export interface FunctionBlock {
    raw_id:string
    title:string,
    centerText:string,
    device:string,
    input_events:string[],
    output_events:string[],
    inputs:string[],
    outputs:string[],
    internals:string[],
    x:number,
    y:number,
}

export interface FunctionBlockTree {
    raw_id:string,
    title:string,
    centerText:string,
    device:string,
    input_events:string[],
    output_events:string[],
    inputs:string[],
    outputs:string[],
    internals:string[],
    x:number,
    y:number,
    children?: FunctionBlockTree[]
}

