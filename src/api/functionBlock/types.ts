export interface FunctionBlock {
    id:string
    title:string,
    centerText:string,
    device:string,
    inputEvents:string[],
    outputEvents:string[],
    inputVaris:string[],
    outputVaris:string[],
    x:number,
    y:number,
}

export interface FunctionBlockTree {
    id:string,
    title:string,
    centerText:string,
    device:string,
    inputEvents:string[],
    outputEvents:string[],
    inputVaris:string[],
    outputVaris:string[],
    x:number,
    y:number,
    children?: FunctionBlockTree[]
}

