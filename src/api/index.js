 import axios from 'axios'
 // 添加请求拦截器
 axios.interceptors.request.use(
     function(config) {
         // 在发送请求之前做些什么
         return config
     },
     function(error) {
         // 对请求错误做些什么
         console.log(error)
         return Promise.reject(error)
     }
 )

 // 添加响应拦截器
 axios.interceptors.response.use(
     function(response) {
         const dataAxios = response.data
         return dataAxios
     },
     function(error) {
         console.log(`axios error:${error}`)
         return Promise.reject(error)
     }
 )
 export default axios