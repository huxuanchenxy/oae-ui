import moment from 'moment'
import { ElMessage, ElLoading } from "element-plus";

let getAgeByBirthday = (birthday) => {
    let age = [];
    if (birthday) {
        birthday = birthday.split('-');
        // 新建日期对象
        let date = new Date();
        // 今天日期，数组，同 birthday
        let today = [date.getFullYear(), date.getMonth() + 1, date.getDate()];
        // 分别计算年月日差值
        age = today.map((val, index) => {
                return val - birthday[index]
            })
            // 当天数为负数时，月减 1，天数加上月总天数
        if (age[2] < 0) {
            // 简单获取上个月总天数的方法，不会错
            let lastMonth = new Date(today[0], today[1], 0)
            age[1]--
                age[2] += lastMonth.getDate()
        }
        // 当月数为负数时，年减 1，月数加上 12
        if (age[1] < 0) {
            age[0]--
                age[1] += 12
        }
        console.log(age[0] + '岁' + age[1] + '月' + age[2] + '天');
    }
    return age[0];
}
let getBirthdayByAge = (ageYear, ageMonth = 0, ageDay = 0) => {
    var subYear = parseInt(ageYear);
    var subMonth = parseInt(ageMonth);
    var subDay = parseInt(ageDay);
    var now = new Date();
    var nowYear = now.getFullYear();
    var nowMonth = now.getMonth() + 1;
    var nowDay = now.getDate(); // 按照减法原理，先day相减，不够向month借；然后month相减，不够向year借；最后year相减。 
    var day = nowDay - subDay;
    var month = nowMonth - subMonth;
    var year = nowYear - subYear; // 检查是否溢出 
    if (day <= 0) { // 获得上月的天数 
        var lastMonth = nowMonth - 1;
        var lastMonthOfYear = nowYear;
        if (lastMonth <= 0) {
            lastMonth = lastMonth + 12 //(lastMonth + 12) % 12; 
            lastMonthOfYear = lastMonthOfYear - 1;
        }
        day = day + new Date(lastMonthOfYear, lastMonth, 0).getDate();
        month = month - 1;
    }
    if (month <= 0) {
        month = month + 12 //(month + 12) % 12; 
        year--;
    }
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    console.log(year + '-' + month + '-' + day);

}

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

let sexInitData = [{
        name: "男",
        value: 1,
    },
    {
        name: "女",
        value: 2,
    },
]
let statusInitData = [{
        name: "有效",
        value: 1,
    },
    {
        name: "无效",
        value: 0,
    },
]
const statusFormat = (row, column) => {
    const daterc = row[column.property];
    if (daterc != null) {
        return daterc == 1 ? "有效" : "无效";
    }
}

const sexFormat = (row, column) => {
    const daterc = row[column.property];
    if (daterc != null) {
        return daterc == 1 ? "男" : "女";
    }
};

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

let keyMd5 = ")(*@wsxqaz!anglar"
let pageSize = 10;
export {
    keyMd5,
    pageSize,
    getAgeByBirthday,
    getBirthdayByAge,
    sexInitData,
    statusInitData,
    statusFormat,
    dateFormat,
    ElMsg,
    sexFormat,
    CusElLoading,
    svg
}