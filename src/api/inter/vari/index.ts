import {getJson} from "@/utils/cache/inter";

export const getInputVaris=(project,module)=>{
    let rlt=getJson(project,module);
    let inputVaris;
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
    let rlt=getJson(project,module);
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