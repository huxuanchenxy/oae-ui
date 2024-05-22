import {SystemInVariForm} from "../systeminvari/types";

export interface SystemVariInputForm {
    key:string,
    text:string,
    alias:string,
    relatedEvents:Array<{ key: string; text: string }>,
    type:string
  }
  export interface SystemVariInputVO extends BaseEntity {
    key:string,
    text:string,
    alias:string,
    relatedEvents:Array<{ key: string; text: string }>,
    type:string,
    relateEveName:string
  }
  export interface SystemVariOutputForm {
    key:string,
    text:string,
    alias:string,
    relatedEvents:Array<{ key: string; text: string }>,
    type:string
  }
  export interface VariOutputVO extends BaseEntity {
    key:string,
    text:string,
    alias:string,
    relatedEvents:Array<{ key: string; text: string }>,
    type:string,
    relateEveName:string
  }