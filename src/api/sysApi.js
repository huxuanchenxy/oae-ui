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
    addSysFuncList: (params) => {
        return axios.post(`${baseUrl}/Sys/AddSysFuncList`, params).then(res => res.data)
    },
    addModule: (params) => {
        return axios.post(`${baseUrl}/Sys/AddModule`, params).then(res => res.data)
    },
    delModule: params => {
        return axios.get(`${baseUrl}/Sys/DelModule`, {
            params
        }).then(res => res.data)
    },
    renameModule: params => {
        return axios.get(`${baseUrl}/Sys/Rename`, {
            params
        }).then(res => res.data)
    },
    getModule: params => {
        return axios.get(`${baseUrl}/Module/GetModule`, {
            params
        }).then(res => res.data)
    },
    getModuleAsync: async params => {
        return await axios.get(`${baseUrl}/Module/GetModule`, {
            params
        })
    },
    validateModule: params => {
        return axios.get(`${baseUrl}/Sys/ValidateModuleName`, {
            params
        })
    },
    saveAll: params => {
        return axios.post(`${baseUrl}/Module/SaveModule`,
            params).then(res => res)
    }
}