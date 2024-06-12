//UTIL包内的业务ts都是用来变更最大的JSON文件的
import cache from "@/plugins/cache.ts";
export const cacheKey = "systemConfig";
export const getJsonAll = (project) => {
    let jsonAll = cache.local.getJSON(cacheKey);
    //如果连缓存都没有，直接return初始数据 todo 后续不用初始值，会删除
    if (!jsonAll) {
        jsonAll = getInitArr();
    }
    return jsonAll;
}
const getInitArr=()=>{
    return [{
        id:"1",
        type: "SystemConfiguration",
        applications:[{
            text:"test",
            dots: [
                {
                    text: "T#500ms",
                    category: "constant",
                    loc: "244.59286330374027 635.1024586689124",
                    key: -4,
                    group: -3,
                    __gohashid: 3672
                }
            ],
        }]
    }]
}

