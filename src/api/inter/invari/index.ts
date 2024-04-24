import {getCurrentObj,getJsonAll,removeCurrentModule}  from "@/utils/cache/common";
import {getInitData} from "@/api/common/init";

export const getInVaris=(project,module)=>{
    let rlt=getCurrentObj(project,module);
    let varis;
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