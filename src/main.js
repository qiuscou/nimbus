import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDs6FQSzmYJJVJ-xWr3gkSyJRj3KE-Jlyo',
  authDomain: 'nimbus-2a885.firebaseapp.com',
  projectId: 'nimbus-2a885',
  storageBucket: 'nimbus-2a885.firebasestorage.app',
  messagingSenderId: '169547602402',
  appId: '1:169547602402:web:7754c3a013daad938181bb',
}

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
initializeApp(firebaseConfig)
