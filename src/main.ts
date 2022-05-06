import { createApp } from 'vue'
import { globalRegister } from './global'
import './assets/css/index.css'

import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)

// 加载图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus)
// 注册element-plus/其他
app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)

app.mount('#app')
