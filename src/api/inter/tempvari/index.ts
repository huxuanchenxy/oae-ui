import {getJson} from "@/utils/cache/inter";

export const getTempVaris=(project,module)=>{
    let rlt=getJson(project,module);
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