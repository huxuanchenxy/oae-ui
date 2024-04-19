  export interface InVariForm {
    key:string,
    no:number,
    text:string,
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  
  export interface InVariQuery extends PageQuery {
    name: string;
  }
  export interface InVariVO extends BaseEntity {
    key:string,
    no:number,
    text:string,
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string,
  }