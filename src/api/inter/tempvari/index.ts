import {getCurrentObj} from "@/utils/cache/inter";
import {getInitData} from "@/api/common/init";
export const getTempVaris=(project,module)=>{
    let rlt=getCurrentObj(project,module);
    let varis;
    if(rlt){
        varis= rlt.interface.temps;
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