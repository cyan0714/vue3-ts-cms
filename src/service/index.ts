// service统一出口
import MyRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'

const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 实例拦截器
  interceptors: {
    requestInterceptor: config => {
      // console.log('某实例请求成功的拦截')
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
