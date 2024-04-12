  export interface EveInputForm {
    key:string,
    no:number,
    text:string,
    relatedEvents:Array<{ id: string; name: string }>;
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
    relatedEvents:Array<{ id: string; name: string }>;
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string,
    relateEveName:string
  }
  export interface Eve{
    id:number,
    name:string
  }