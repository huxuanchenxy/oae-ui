  export interface EveInputForm {
    key:string,
    no:number,
    text:string,
    relateEve:string,
    relateEveName:string,
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  
  export interface EveInputQuery extends PageQuery {
    name: string;
  }
  export interface EveInputVO extends BaseEntity {
    key:string,
    no:number,
    text:string,
    relateEve:string,
    relateEveName:string,
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  export interface Eve{
    id:number,
    name:string
  }