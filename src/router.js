import { createRouter, createWebHistory } from 'vue-router'
import MainPage from './components/main/page/components/MainPage.vue'
import SignInApp from './components/sign_in/components/SignInApp.vue'
import SignUpApp from './components/sign_up/components/SignUpApp.vue'
import HomeApp from './components/home/components/HomeApp.vue'
import AccountApp from './components/account/components/AccountApp.vue'
import HelpApp from './components/help/components/HelpApp.vue'
import AdminApp from './components/admin/components/AdminApp.vue'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from './firebase'

const routes = [
  { path: '/', name: 'MainPage', component: MainPage },
  { path: '/sign_in', name: 'SignIn', component: SignInApp },
  { path: '/sign_up', name: 'SignUp', component: SignUpApp },
  { path: '/home', name: 'Home', component: HomeApp },
  { path: '/account', name: 'Account', component: AccountApp },
  { path: '/help', name: 'Help', component: HelpApp },
  { path: '/admin', name: 'Admin', component: AdminApp },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = getAuth()
  const user = auth.currentUser

  if (user) {
    const docRef = doc(db, 'users', user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const userData = docSnap.data()
      if (userData.role !== 'Администратор') {
        return next('/home')
      }
    }
  }

  next()
})

export default router
