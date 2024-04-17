import {getJson} from "@/utils/cache/inter";
import {getInitData} from "@/api/common/init";

export const getInVaris=(project,module)=>{
    let rlt=getJson(project,module);
    let varis;
    if(!rlt){
        rlt=getInitData(module)[0];
    }
    if(rlt){
        varis= rlt.interface.internals;
        varis.forEach(vari => {
            let no=1;
            if(!vari.no){
                vari.no=no;
                no++;
            }
        });
    }
    return varis;
}