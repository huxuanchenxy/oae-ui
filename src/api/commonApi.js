import axios from './index'
import {
    baseUrl
} from './baseUrl'
export default {
    GetFunctions: params => {
        return axios.get(`${baseUrl}/Common/GetFunctions`, {
            params
        }).then(res => res.data || res)
    },
}