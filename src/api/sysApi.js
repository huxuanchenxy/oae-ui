import axios from './index'
import {
    baseUrl
} from './baseUrl'

export default {
    // saveSysUser: params => {

    //     return axios.post(`${baseUrl}/SysUserAdd/SaveSysUser`,
    //         params,
    //     ).then(res => res)
    // }, 

    getFuncList: () => {
        return axios.get(`${baseUrl}/Sys/GetSysFuncList`).then(res => res.data)
    },


}