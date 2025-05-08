import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'

export function useSignIn() {
  const email = ref('')
  const password = ref('')
  const router = useRouter()

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user

      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userData = docSnap.data()
        if (userData.role === 'Администратор') {
          router.push('/admin')
        } else {
          router.push('/home')
        }
      } else {
        console.error('Данные пользователя не найдены')
      }
    } catch (error) {
      console.error('Ошибка входа:', error)
      alert('Ошибка при входе. Попробуйте снова.')
    }
  }

  const resetPassword = () => {
    alert('Функция восстановления пароля будет реализована позже')
  }

  const resetEmail = () => {
    alert('Функция восстановления email будет реализована позже')
  }

  return {
    email,
    password,
    signIn,
    resetPassword,
    resetEmail,
  }
}
