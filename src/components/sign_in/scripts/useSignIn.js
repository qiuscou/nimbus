import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'

export function useSignIn() {
  const email = ref('')
  const password = ref('')
  const router = useRouter()

  const signIn = async () => {
    try {
      console.log('Попытка входа с email:', email.value, 'и password:', password.value) // Отладка
      if (!email.value || !password.value) {
        alert('Пожалуйста, заполните все поля')
        return
      }

      const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
      console.log('Успешный вход:', userCredential.user)
      router.push('/home')
    } catch (error) {
      console.error('Ошибка входа:', error)
      let errorMsg = 'Ошибка при входе. Попробуйте снова.'

      switch (error.code) {
        case 'auth/invalid-email':
          errorMsg = 'Некорректный email'
          break
        case 'auth/user-disabled':
          errorMsg = 'Пользователь заблокирован'
          break
        case 'auth/user-not-found':
          errorMsg = 'Пользователь не найден'
          break
        case 'auth/wrong-password':
          errorMsg = 'Неверный пароль'
          break
        case 'auth/too-many-requests':
          errorMsg = 'Слишком много попыток. Попробуйте позже.'
          break
      }

      alert(errorMsg)
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
