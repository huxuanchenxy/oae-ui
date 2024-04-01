import axios from './index'
import {
    baseUrl
} from './baseUrl'

export default {
    getSysUserList: params => {
        return axios.get(`${baseUrl}/SysUser/GetSysUserList`, {
            params
        }).then(res => res.data || res)
    },
    getSysUser: params => {
        return axios.get(`${baseUrl}/SysUser/GetSysUser`, {
            params
        }).then(res => res.data || res)
    },
    validateSysUser: params => {
        return axios.get(`${baseUrl}/SysUserAdd/ValidateSysUser`, {
            params
        }).then(res => res.data)
    },
    saveSysUser: params => {
        //console.log("post saveUser", params);
        return axios.post(`${baseUrl}/SysUserAdd/SaveSysUser`,
            params,
        ).then(res => res)
    },
    getRoleForTree: () => {
        return axios.get(`${baseUrl}/SysUserAdd/GetRoleForTree`).then(res => res.data || res)
    },


    updateSysUserStatus: params => {
        return axios.get(`${baseUrl}/SysUser/UpdateStatus`, {
            params
        }).then(res => res.data || res)
    },
    batchUpdateSysUserStatus: params => {
        return axios.get(`${baseUrl}/SysUser/BatchUpdateStatus`, {
            params
        }).then(res => res.data || res)
    },
    delSysUser: params => {
        return axios.delete(`${baseUrl}/SysUser/DelUser`, {
            params
        }).then(res => res.data || res)
    },
    batchDelSysUser: params => {
        return axios.delete(`${baseUrl}/SysUser/BatchDelUser`, {
            params
        }).then(res => res.data || res)
    },
    validatePwd: params => {
        return axios.get(`${baseUrl}/SysUserAdd/ValidatePwd`, {
            params
        }).then(res => res.data || res)
    },
    updatePwd: params => {
        return axios.get(`${baseUrl}/SysUserAdd/UpdatePwd`, {
            params
        }).then(res => res.data || res)
    },


    getSysRoleList: params => {
        return axios.get(`${baseUrl}/SysRole/GetList`, {
            params
        }).then(res => res.data || res)
    },
    getSysRole: params => {
        return axios.get(`${baseUrl}/SysRole/Get`, {
            params
        }).then(res => res.data || res)
    },
    saveSysRole: params => {
        //console.log("post saveUser", params);
        return axios.post(`${baseUrl}/SysRoleAdd/Save`,
            params,
        ).then(res => res)
    },
    updateSysRoleStatus: params => {
        return axios.get(`${baseUrl}/SysRole/UpdateStatus`, {
            params
        }).then(res => res.data || res)
    },
    batchUpdateSysRoleStatus: params => {
        return axios.get(`${baseUrl}/SysRole/BatchUpdateStatus`, {
            params
        }).then(res => res.data || res)
    },
    delSysRole: params => {
        return axios.delete(`${baseUrl}/SysRole/Del`, {
            params
        }).then(res => res.data || res)
    },
    batchDelSysRole: params => {
        return axios.delete(`${baseUrl}/SysRole/BatchDel`, {
            params
        }).then(res => res.data || res)
    },
    validateName: params => {
        return axios.delete(`${baseUrl}/SysRoleAdd/ValidateName`, {
            params
        }).then(res => res.data || res)
    },

    getFuncIdsByRoleId: params => {
        return axios.get(`${baseUrl}/SysRoleAdd/GetFuncIdsByRoleId`, {
            params
        }).then(res => res.data || res)
    },


    getFuncList: (params) => {
        return axios.get(`${baseUrl}/SysFunc/GetList`, {
            params
        }).then(res => res.data)
    },
}