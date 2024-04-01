import axios from './index'
import {
    baseUrl
} from './baseUrl'
let loginUrl = `${baseUrl}/Login`;
export default {
    login: params => {
        return axios.get(`${loginUrl}/Login`, {
            params
        }).then(res => res.data)
    },
}