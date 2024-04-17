import { Eve} from './types';
import {getJson} from "@/utils/cache/inter";
import {getInitData} from "@/api/common/init";
// export const getUser = (userId?: string | number): AxiosPromise<UserInfoVO> => {
export const getRelateEveList = (no?: string | number): Eve[] => {
    // return request({
    //   url: '/system/user/' + parseStrEmpty(userId),
    //   method: 'get'
    // });
    return [
        {id:1,name:'事件1'},
        {id:2,name:'事件2'},
        {id:3,name:'事件3'},
        {id:4,name:'事件4'}
    ]
};
export const getInputEvents=(project,module)=>{
    let inputEvents;
    let rlt=getJson(project,module);
    if(!rlt){
        rlt=getInitData(module)[0];
    }
    inputEvents= rlt.interface.input_events;
    inputEvents.forEach(inputEvent => {
        let no=1;
        if(!inputEvent.no){
            inputEvent.no=no;
            no++;
        }
    });
    return inputEvents;
}
export const getOutputEvents=(project,module)=>{
    let rlt=getJson(project,module);
    let outputEvents;
    if(!rlt){
        rlt=getInitData(module)[0];
    }
    outputEvents= rlt.interface.output_events;
    outputEvents.forEach(outputEvent => {
        let no=1;
        if(!outputEvent.no){
            outputEvent.no=no;
            no++;
        }
    });
    return outputEvents;
}