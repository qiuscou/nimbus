import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref as dbRef, set } from 'firebase/database'
import { auth, db, database } from '@/firebase'

export function useSignUp() {
  const surname = ref('')
  const name = ref('')
  const patronymic = ref('')
  const dateOfBirth = ref('')
  const email = ref('')
  const password = ref('')
  const selectedGB = ref(null)
  const selectedDays = ref(null)
  const selectedPrice = ref(null)
  const isSignUpPage = ref(false)
  const router = useRouter()

  const register = async () => {
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)
      const user = userCredential.user

      const userData = {
        email: email.value,
        name: name.value,
        surname: surname.value,
        patronymic: patronymic.value,
        dateOfBirth: dateOfBirth.value,
        createdAt: new Date(),
        role: 'Пользователь',
        tariff: {
          gb: selectedGB.value,
          days: selectedDays.value,
          price: selectedPrice.value,
        },
      }

      await setDoc(doc(db, 'users', user.uid), userData)

      await set(dbRef(database, `users/${user.uid}/profile`), {
        email: email.value,
        name: name.value,
        surname: surname.value,
        patronymic: patronymic.value,
        dateOfBirth: dateOfBirth.value,
        createdAt: new Date().toISOString(),
      })

      await set(dbRef(database, `users/${user.uid}/tariff`), {
        gb: selectedGB.value,
        days: selectedDays.value,
        price: selectedPrice.value,
      })

      console.log('Пользователь успешно зарегистрирован!')
      alert('Регистрация прошла успешно!')
      router.push('/home')
    } catch (error) {
      console.error('Ошибка регистрации:', error)
      let errorMessage = 'Произошла ошибка при регистрации'
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Этот email уже используется'
          break
        case 'auth/invalid-email':
          errorMessage = 'Некорректный email'
          break
        case 'auth/weak-password':
          errorMessage = 'Пароль должен содержать минимум 6 символов'
          break
        default:
          errorMessage = error.message
      }
      alert(errorMessage)
    }
  }

  const getDayDeclension = (count) => {
    const declensions = ['День', 'Дня', 'Дней']
    if (count % 10 === 1 && count % 100 !== 11) {
      return declensions[0]
    } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
      return declensions[1]
    } else {
      return declensions[2]
    }
  }

  const scrollToTariff = () => {
    if (!validateForm()) {
      return
    }
    const tariffSection = document.querySelector('.signup-tariff-container')
    if (tariffSection) {
      tariffSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const validateForm = () => {
    if (!surname.value || !name.value || !email.value || !password.value) {
      alert('Пожалуйста, заполните все обязательные поля')
      return false
    }
    if (password.value.length < 6) {
      alert('Пароль должен содержать минимум 6 символов')
      return false
    }
    return true
  }

  const completeRegistration = async () => {
    if (!validateForm()) {
      return
    }
    try {
      await register()
      goToNewPage('Home')
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  const goToNewPage = (page) => {
    router.push({ name: page })
  }

  watch(
    () => router.currentRoute.value,
    (to) => {
      isSignUpPage.value = to.path === '/'
    },
    { immediate: true },
  )

  return {
    surname,
    name,
    patronymic,
    dateOfBirth,
    email,
    password,
    selectedGB,
    selectedDays,
    selectedPrice,
    isSignUpPage,
    register,
    getDayDeclension,
    scrollToTariff,
    validateForm,
    completeRegistration,
    goToNewPage,
  }
}
