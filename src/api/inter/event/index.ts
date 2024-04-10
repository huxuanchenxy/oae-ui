import { Eve} from './types';
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
export default {
    getRelateEveList
}