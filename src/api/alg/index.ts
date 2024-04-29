import { getCurrentObj } from "@/utils/cache/common";
export const getAlgList = (project, module) => {
    let rlt = getCurrentObj(project, module);
    return rlt?.algorithms;
}