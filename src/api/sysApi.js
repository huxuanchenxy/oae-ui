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
    getModule: async params => {
        return await axios.get(`${baseUrl}/Module/GetModule`, {
            params
        }).then(res => res.data)
    },
    saveAll: params => {
        return axios.post(`${baseUrl}/Module/SaveModule`,
            params).then(res => res)
    }
}