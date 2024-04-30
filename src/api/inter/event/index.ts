import { Eve } from './types';
import { getCurrentObj, getJsonAll, removeCurrentModule } from "@/utils/cache/common";
export const getInputEvents = (project:string, module:number) => {
    let rlt = getCurrentObj(project, module);
    let inputEvents = rlt?.interface?.input_events;
    inputEvents?.forEach(inputEvent => {
        let no = 1;
        if (!inputEvent.no) {
            inputEvent.no = no;
            no++;
        }
    });
    return inputEvents;
}
export const getOutputEvents = (project:string, module:number) => {
    let rlt = getCurrentObj(project, module);
    let outputEvents;
    outputEvents = rlt?.interface?.output_events;
    outputEvents?.forEach(outputEvent => {
        let no = 1;
        if (!outputEvent.no) {
            outputEvent.no = no;
            no++;
        }
    });
    return outputEvents;
}