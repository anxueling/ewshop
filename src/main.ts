import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './style/tailwind.css'
import './style/index.css'
//导入pinia   金菠萝
import {createPinia} from 'pinia'

//1.创建pinia实例
const app = createApp(App)
const pinia = createPinia()


//5.创建并挂载根实例
app.use(router)
//6.将pinia挂载到应用程序
app.use(pinia)
app.mount('#app')
