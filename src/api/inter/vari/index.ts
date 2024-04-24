import {getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/cache/common";
import {getInitData} from "@/api/common/init";
export const getInputVaris=(project,module)=>{
    let rlt=getCurrentObj(project,module);
    let inputVaris;
    if(!rlt){
        rlt=getInitData(project,module)[0];
    }
    if(rlt){
        inputVaris= rlt.interface.inputs;
        inputVaris.forEach(inputVari => {
            let no=1;
            if(!inputVari.no){
                inputVari.no=no;
                no++;
            }
        });
    }
    return inputVaris;
}
export const getOutputVaris=(project,module)=>{
    let rlt=getCurrentObj(project,module);
    let outputVaris;
    if(rlt){
        outputVaris= rlt.interface.outputs;
        outputVaris.forEach(outputVari => {
            let no=1;
            if(!outputVari.no){
                outputVari.no=no;
                no++;
            }
        });
    }
    return outputVaris;
}