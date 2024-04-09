import moment from 'moment'
import { ElMessage, ElLoading } from "element-plus";



const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;





const dateFormat = (row, column) => {
    const daterc = row[column.property];
    if (daterc != null) {
        const dateMat = new Date(daterc);
        return moment(dateMat).format("YYYY-MM-DD hh:mm:ss");
    }
}

const ElMsg = (msg, type = "success") => {
    ElMessage({
        showClose: true,
        message: msg,
        type: type,
        center: true,
    });
}
const CusElLoading = (msg = "数据保存中……") => {
    const loading = ElLoading.service({
        lock: true,
        text: msg,
        background: "rgba(0, 0, 0, 0.7)",
        fullscreen: true,
    });
    return loading;
}
const funcList = JSON.parse(sessionStorage.getItem("curFuncList"));

let keyMd5 = ")(*@wsxqaz!anglar"
let pageSize = 10;
export {
    keyMd5,
    pageSize,
    dateFormat,
    ElMsg,
    CusElLoading,
    svg,
    funcList
}