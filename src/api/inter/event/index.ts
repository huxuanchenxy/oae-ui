import { Eve } from './types';
import { getCurrentObj, getJsonAll, removeCurrentModule } from "@/utils/cache/common";
import { getInitData } from "@/api//init";
// export const getUser = (userId?: string | number): AxiosPromise<UserInfoVO> => {
export const getRelateEveList = (no?: string | number): Eve[] => {
    // return request({
    //   url: '/system/user/' + parseStrEmpty(userId),
    //   method: 'get'
    // });
    return [
        { id: 1, name: '事件1' },
        { id: 2, name: '事件2' },
        { id: 3, name: '事件3' },
        { id: 4, name: '事件4' }
    ]
};
export const getInputEvents = (project, module) => {
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
export const getOutputEvents = (project, module) => {
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