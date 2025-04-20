import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/main/page/MainPage.vue'
import SignInApp from './components/sign_in/SignIn.vue'
import SignUpApp from './components/sign_up/SignUp.vue'
import HomeApp from './components/home/Home.vue'
import AccountApp from './components/account/Account.vue'
import HelpApp from './components/help/Help.vue'

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/sign_in', name: 'SignIn', component: SignInApp },
  { path: '/sign_up', name: 'SignUp', component: SignUpApp },
  { path: '/home', name: 'Home', component: HomeApp },
  { path: '/account', name: 'Account', component: AccountApp },
  { path: '/help', name: 'Help', component: HelpApp },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
