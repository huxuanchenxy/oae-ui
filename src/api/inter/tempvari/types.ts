  export interface TempVariForm {
    key:string,
    no:number,
    text:string,
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string
  }
  
  export interface TempVariQuery extends PageQuery {
    name: string;
  }
  export interface TempVariVO extends BaseEntity {
    key:string,
    no:number,
    text:string,
    arrayLength:number,
    type:string,
    initVals:number,
    comment:string,
  }