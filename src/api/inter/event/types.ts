  export interface EveInputForm {
    no:number,
    name:string,
    relateEve:string,
    relateEveName:string,
    arrLen:number,
    eveType:string,
    initVal:number,
    remark:string
  }
  
  export interface EveInputQuery extends PageQuery {
    name: string;
  }
  export interface EveInputVO extends BaseEntity {
    no:number,
    name:string,
    relateEve:string,
    relateEveName:string,
    arrLen:number,
    eveType:string,
    initVal:number,
    remark:string
  }
  export interface Eve{
    id:number,
    name:string
  }