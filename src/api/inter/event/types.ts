  //-------输入开始
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
  //-------输入结束
  //-------输出开始
  export interface EveOutputForm {
    key:string,
    no:number,
    text:string,
    relatedEvents:Array<{ id: string; name: string }>;
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  
  export interface EveOutputQuery extends PageQuery {
    name: string;
  }
  export interface EveOutputVO extends BaseEntity {
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
  //-------输出结束
  export interface Eve{
    id:number,
    name:string
  }