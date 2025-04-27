import { ref } from 'vue'
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '@/firebase'

export function useAccount() {
  const userData = ref({
    surname: '',
    name: '',
    patronymic: '',
    dateOfBirth: '',
    gender: '',
    country: '',
    email: '',
    phone: '',
    password: '',
  })

  const personalDataPanelAccountData = {
    header: 'Личные данные',
    snp: 'Фамилия, имя, отчество',
    birth_date: 'Дата рождения',
    gender: 'Пол',
    country: 'Страна',
  }

  const securityPanelAccountData = {
    header: 'Безопасность',
    email: 'Email',
    phone: 'Номер телефона',
    password: 'Пароль',
    delete_account: 'Удалить аккаунт',
    delete_account_description: 'После удаления все ваши данные будут\n полностью удалены.',
    logout: 'Выйти из аккаунта',
    logout_description: 'Рекомендуется после использования на\nчужом устройстве.',
  }

  const buttonAccountData = {
    save: 'Сохранить',
    cancel: 'Отменить',
  }

  const fetchUserData = async () => {
    try {
      const auth = getAuth()
      const currentUser = auth.currentUser

      if (!currentUser) {
        console.error('Пользователь не авторизован')
        return
      }

      const uid = currentUser.uid
      const docRef = doc(db, 'users', uid)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const userDataFromFirestore = docSnap.data()
        userData.value = {
          ...userData.value,
          ...userDataFromFirestore,
          email: currentUser.email || userDataFromFirestore.email,
        }

        if (userData.value.dateOfBirth) {
          const date = new Date(userData.value.dateOfBirth)
          if (!isNaN(date)) {
            userData.value.dateOfBirth = date.toLocaleDateString('ru-RU')
          }
        }
      } else {
        console.log('Документ не найден')
        userData.value.email = currentUser.email || ''
      }
    } catch (error) {
      console.error('Ошибка при получении данных:', error)
    }
  }

  return {
    userData,
    personalDataPanelAccountData,
    securityPanelAccountData,
    buttonAccountData,
    fetchUserData,
  }
}
