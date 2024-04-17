import {getJson} from "@/utils/cache/inter";

export const getInVaris=(project,module)=>{
    let rlt=getJson(project,module);
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