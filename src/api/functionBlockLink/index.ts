import  cache  from "@/plugins/cache.ts";
import {getJsonAll,cacheKey}  from "@/utils/cache/systemConfig";
import {Link} from "./types";

/**
 * 找出所有的fbbs
 */
const listLinks=((project):Link[]=>{
    let jsonAll = getJsonAll(project);
    let systemConfig=jsonAll.find(x=>x.type=="SystemConfiguration");
    if (systemConfig&&systemConfig.applications){
        return systemConfig.applications[0].linkDataArray;
    }else{
        return null;
    }
});
/**
 * 得到一个functionblock
 */
export const getOneLink=((project,id:string)=>{
    let links=listLinks(project);
    if (!links){
        return null;
    }
    return links.find(x=>x.key==id)
});
/**
 * 根据一个fbb更新大JSON
 * @param project
 * @param module
 * @param data
 */
export const saveOrUpdateLink=(project,data:Link)=>{
    let jsonAll = getJsonAll(project);
    let systemConfig=jsonAll.find(x=>x.type=="SystemConfiguration");
    let links=listLinks(project);
    if(!links){
        links=new Array();
    }else{
        links=links.filter(x=>x.key!=data.key);
    }
    links.push(data);
    systemConfig.applications[0].linkDataArray=links;
    //先移除
    jsonAll=jsonAll.filter(x=>x.id!=systemConfig.id);
    //再加上
    jsonAll.push(systemConfig);
    cache.local.setJSON(cacheKey,jsonAll);
}