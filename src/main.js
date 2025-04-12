import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

const app = createApp(App)

axios.defaults.baseURL = 'http://147.45.153.120'
app.config.globalProperties.$axios = axios

app.use(router)
app.use(store)
app.mount('#app')
