// request.js

import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

console.log(BASE_URL)
const request = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 请求超时时间
})

// 添加请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么，例如添加token
    const access_token = localStorage.getItem('access_token')
    if (access_token) {
      config.headers[ 'Authorization' ] = `Bearer ${access_token}`
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request