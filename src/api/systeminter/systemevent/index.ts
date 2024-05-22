import { Eve } from './types';
import { getCurrentObj, getJsonAll, removeCurrentModule } from "@/utils/cache/common";
export const getInputEvents = (project:string, module:number) => {
    return [
        {key:1,text:'inputeve1'},
        {key:2,text:'inputeve2'},
        {key:3,text:'inputeve3'},
        {key:4,text:'inputeve4'},
    ]
}
export const getOutputEvents = (project:string, module:number) => {
    return [
        {key:1,text:'outputeve1'},
        {key:2,text:'outputeve2'},
        {key:3,text:'outputeve3'},
        {key:4,text:'outputeve4'},
    ]
}