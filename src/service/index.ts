// service统一出口
import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

import localCache from '@/utils/cache'
const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 实例拦截器
  interceptors: {
    requestInterceptor: (config: any) => {
      // 携带token的拦截
      const token = localCache.getCache('token')
      console.log('token: ', token)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: err => {
      // console.log('某实例请求失败的拦截')
      return err
    },
    responseInterceptor: res => {
      // console.log('某实例响应成功的拦截')
      return res
    },
    responseInterceptorCatch: err => {
      // console.log('某实例响应失败的拦截')
      return err
    }
  }
})

export default myRequest
