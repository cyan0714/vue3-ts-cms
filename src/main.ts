import { createApp } from 'vue'
import './assets/css/index.css'
import myRequest from './service'

import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App).use(router).use(store).use(ElementPlus).mount('#app')

// myRequest
//   .request({
//     url: '/home/multidata',
//     method: 'GET',
//     headers: {},
//     interceptors: {
//       requestInterceptor: (config: any) => {
//         console.log('单独请求的config')
//         config.headers['token'] = '123'
//         return config
//       },
//       responseInterceptor: res => {
//         console.log('单独响应的response')
//         return res
//       }
//     }
//   })
//   .then((res: any) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

myRequest
  .get<DataType>({
    url: '/home/multidata'
  })
  .then(res => {
    console.log(res.data)
    console.log(res.returnCode)
    console.log(res.success)
  })
