  export interface EveInputForm {
    no:number,
    name:string,
    relateEve:string,
    arrLen:number,
    eveType:string,
    initVal:number,
    remark:string
  }
  
  export interface EveInputQuery extends PageQuery {
    name: string;
  }
  