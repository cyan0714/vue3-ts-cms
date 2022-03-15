import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { MyRequestConfig, MyRequestInterceptors } from './type'

import { ElLoading } from 'element-plus'

const DEAFULT_LOADING = false

class MyRequest {
  instance: AxiosInstance
  interceptors?: MyRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // ?? : 当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数
    this.showLoading = config.showLoading ?? DEAFULT_LOADING
    this.interceptors = config.interceptors

    // 1.axios 实例拦截器，可选择加或是不加
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config: any) => {
        // 携带token的拦截
        const token = ''
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        // console.log('所有实例都有的拦截器：请求成功拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据....',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }

        return config
      },
      err => {
        // console.log('所有实例都有的拦截器：请求失败拦截')

        return err
      }
    )

    this.instance.interceptors.response.use(
      res => {
        // console.log('所有实例都有的拦截器：响应成功拦截')
        // 将loading移除
        this.loading?.close()

        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败，错误信息')
        } else {
          return data
        }
      },
      err => {
        // console.log('所有实例都有的拦截器：响应失败拦截')
        // 将loading移除
        this.loading?.close()

        if (err.response.status === 404) {
          console.log('404错误')
        }

        return err
      }
    )
  }

  request<T>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === true) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then(res => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将 showLoading 设置 true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          resolve(res)
        })
        .catch(err => {
          // 将 showLoading 设置 true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING

          reject(err)
          return err
        })
    })
  }

  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default MyRequest
