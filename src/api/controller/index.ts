import cache from "@/plugins/cache.ts";
export const cacheKey = "deployment";
export const getJsonAll = (project) => {
    if (!module) {
        return;
    }
    let jsonAll = cache.local.getJSON(cacheKey);
    return jsonAll;
}
export const listSegDataList = (project) => {
    let rlt = getJsonAll(project)?.nodes;
    //拿出所有网段
    let segs= rlt.filter(x=>x.nodeType=="Seg");
    let functionBlocks=new Array();

    segs.forEach(seg=>{
        let functionBlock={
            id:seg.id,
            // input_events:['inputevent1'],
            // output_events:['outputevent1'],
            // inputs:['inputvari1'],
            // outputs:['outputvari2'],
            centerText:seg.label,
            title:seg.label,
            // device:dropNode.data.device
        }
        //转换事件
        let events= seg.info.Event;
        if(events){
            // let input_events=events.filter()
        }
        functionBlocks.push(functionBlock)
    })
    return functionBlocks;

}
export const listResourceDataList = (project, module) => {
    // let rlt = getCurrentObj(project, module);
    // return rlt?.algorithms;
}