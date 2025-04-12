import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDs6FQSzmYJJVJ-xWr3gkSyJRj3KE-Jlyo',
  authDomain: 'nimbus-2a885.firebaseapp.com',
  projectId: 'nimbus-2a885',
  storageBucket: 'nimbus-2a885.firebasestorage.app',
  messagingSenderId: '169547602402',
  appId: '1:169547602402:web:9a3c8e2422273b4c8181bb',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
