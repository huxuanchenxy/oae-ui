  //-------输入开始
  export interface VariInputForm {
    key:string,
    no:number,
    text:string,
    relatedEvents:Array<{ id: string; name: string }>;
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  
  export interface VariInputQuery extends PageQuery {
    name: string;
  }
  export interface VariInputVO extends BaseEntity {
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
  export interface VariOutputForm {
    key:string,
    no:number,
    text:string,
    relatedEvents:Array<{ id: string; name: string }>;
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  
  export interface VariOutputQuery extends PageQuery {
    name: string;
  }
  export interface VariOutputVO extends BaseEntity {
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
  export interface Vari{
    id:number,
    name:string
  }