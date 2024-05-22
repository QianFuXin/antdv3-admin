import axios from 'axios'
import { loginUrl, tokenLocationName, tokenName, tokenPrefix } from '@/utils/config.js'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取token
    const token = sessionStorage.getItem(tokenName)
    if (!config.url.startsWith(loginUrl)) {
      config.headers[tokenLocationName] = `${tokenPrefix} ${token}`
    }

    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)

export default service
