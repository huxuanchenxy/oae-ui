import axios from './index'
import  cache  from "@/plugins/cache.ts";
import { v4 as uuidv4 } from "uuid";
import {
    baseUrl
} from './baseUrl'
const deploymentCacheKey="deployment";
//得到通讯功能块树节点和子节点
const getSegNode=(segParentNode)=>{
    let json=cache.local.getJSON(deploymentCacheKey);
    if (!json||!json.nodes){
        return null;
    }
    let nodes=json.nodes;
    nodes=nodes.filter(x=>x.nodeType=="Seg");
    let rltNodes=new Array();
    nodes.forEach((node)=>{
        let info=node.info;
        info.nodeId=node.id;
        info.parentId=segParentNode.parentId;
        info.id=info.ID;
        info.name=info.Name;
        info.type='Seg';
        info.cardInfo=node.cardInfo;
        rltNodes.push(info);
    })
    if (rltNodes.length==0){
        return segParentNode;
    }else{
        segParentNode.children=rltNodes;
    }
    console.log("segParentNode",segParentNode)
    return segParentNode;
}
//得到资源功能块树节点和子节点
const getResourceNodes=(resParentNode)=>{
    let json=cache.local.getJSON(deploymentCacheKey);
    if (!json||!json.nodes){
        return resParentNode;
    }
    let nodes=json.nodes;
    nodes=nodes.filter(x=>x.nodeType=="Dev");
    let rltNodes=new Array();
    nodes.forEach((node)=>{
        //设备device
        let info=node.info;
        info.nodeId=node.id;
        info.parentId=resParentNode.parentId;
        info.name=info.Name;
        info.id=info.ID;
        info.type='Dev';
        info.cardInfo=node.cardInfo;
        let resources=node.resources;
        //资源列表
        let children=new Array();
        if(resources&&resources.length>0){
            resources.forEach((resource)=>{
                resource.parentId=info.id;
                resource.nodeId=node.id;
                info.type='Res';
                children.push(resource);
            })
        }
        //如果有资源列表，把他放到该资源列表下
        if(children.length>0){
            info.children=children;
        }
        rltNodes.push(info);
    })
    if (rltNodes.length==0){
        return resParentNode;
    }else{
        resParentNode.children=rltNodes;
    }
    console.log("resParentNode",resParentNode)
    return resParentNode;
}
export default {
    // saveSysUser: params => { 
    //     return axios.post(`${baseUrl}/SysUserAdd/SaveSysUser`,
    //         params,
    //     ).then(res => res)
    // },  
    getFuncList: () => {
        return axios.get(`${baseUrl}/Sys/GetSysFuncList`).then(res => res.data)
    },
    getAllDevicesList: () => {
        return axios.get(`${baseUrl}/Sys/GetAllDeviceList`).then(res => res.data)
    },
    getTreeForAppList: (params) => {
        return axios.get(`${baseUrl}/Sys/GetTreeForApplication`, {
            params
        }).then(res => {
            let rlt=res.data;
            //加通讯功能块
            let segNodeId=uuidv4();
            let segParentNode={id:segNodeId,parentId:0,name:"通讯功能块（T）",type:"communicate"};
            let segNode=getSegNode(segParentNode);
            rlt.push(segNode);
            //加资源功能块
            let resNodeId=uuidv4()
            let resParentNode={id:resNodeId,parentId:0,name:"资源功能块（Z）",type:"res"};
            let resNode=getResourceNodes(resParentNode);
            rlt.push(resNode);
            console.log(rlt)
            return rlt;
        })
    },

    getResourceFuncByTypeGroup: () => {
        return axios.get(`${baseUrl}/Sys/GetResourceFuncByTypeGroup`).then(res => res.data)
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
    },
    getSegmentsList: () => {
        return axios.get(`${baseUrl}/Sys/GetSegmentsList`).then(res => res.data)
    },
    validateSegmentsName: params => {
        return axios.get(`${baseUrl}/Sys/ValidateSegmentsName`, {
            params
        })
    },
    updateSegmentsName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateSegmentsName`, {
            params
        }).then(res => res.data)
    },
    delSegments: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateSegmentsStatus`, {
            params
        }).then(res => res.data)
    },
    addSegments: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveSegments`, params).then(res => res.data)
    },

    getDevicesList: () => {
        return axios.get(`${baseUrl}/Sys/GetDevicesList`).then(res => res.data)
    },
    validateDevicesName: params => {
        return axios.get(`${baseUrl}/Sys/ValidateDevicesName`, {
            params
        })
    },
    updateDevicesName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateDevicesName`, {
            params
        }).then(res => res.data)
    },
    delDevices: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateDevicesStatus`, {
            params
        }).then(res => res.data)
    },
    addDevices: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveDevices`, params).then(res => res.data)
    },
    getControlsList: () => {
        return axios.get(`${baseUrl}/Sys/GetControlsList`).then(res => res.data)
    },
    validateControlsName: params => {
        return axios.get(`${baseUrl}/Sys/ValidateControlsName`, {
            params
        })
    },
    updateControlsName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateControlsName`, {
            params
        }).then(res => res.data)
    },
    delControls: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateControlsStatus`, {
            params
        }).then(res => res.data)
    },
    addControls: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveControls`, params).then(res => res.data)
    },
    getResourcesList: () => {
        return axios.get(`${baseUrl}/Sys/GetResourceList`).then(res => res.data)
    },
    delResources: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateResourcesStatus`, {
            params
        }).then(res => res.data)
    },
    addResources: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveResource`, params).then(res => res.data)
    },
    getResourceFuncsList: () => {
        return axios.get(`${baseUrl}/Sys/GetResourceFuncList`).then(res => res.data)
    },
    delResourceFuncs: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateResourceFuncStatus`, {
            params
        }).then(res => res.data)
    },
    addSegDev: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveSegmentDevice`, params).then(res => res.data)
    },
    getSegDevList: (params) => {
        return axios.get(`${baseUrl}/Sys/GetSegmentDeviceList`, {
            params
        }).then(res => res.data)
    },
    delSegDev: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateSegmentDeviceStatus`, {
            params
        }).then(res => res.data)
    },

    getInternalFbsList: () => {
        return axios.get(`${baseUrl}/Sys/GetInternalFbsList`).then(res => res.data)
    },
    validateInternalFbsName: params => {
        return axios.get(`${baseUrl}/Sys/getInternalFbsList`, {
            params
        })
    },
    updateInternalFbsName: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateInternalFbsName`, {
            params
        }).then(res => res.data)
    },
    delInternalFbs: (params) => {
        return axios.get(`${baseUrl}/Sys/UpdateInternalFbsStatus`, {
            params
        }).then(res => res.data)
    },
    addInternalFbs: (params) => {
        return axios.post(`${baseUrl}/Sys/SaveInternalFbs`, params).then(res => res.data)
    },

}