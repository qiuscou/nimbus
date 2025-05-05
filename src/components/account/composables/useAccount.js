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
  })

  const personalDataPanelAccountData = ref({
    header: 'Персональные данные',
    snp: 'Фамилия, Имя, Отчество',
    birth_date: 'Дата рождения',
    gender: 'Пол',
    country: 'Страна',
  })

  const securityPanelAccountData = ref({
    header: 'Безопасность',
    email: 'Email',
    phone: 'Телефон',
    password: 'Пароль',
    delete_account: 'Удалить аккаунт',
    delete_account_description: 'После удаления все ваши данные будут безвозвратно удалены.',
    logout: 'Выйти из аккаунта',
    logout_description: 'Рекомендуется при использовании чужого устройства.',
  })

  const buttonAccountData = ref({
    save: 'Сохранить',
    cancel: 'Отменить',
  })

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
        const firestoreData = docSnap.data()
        userData.value = {
          ...userData.value,
          ...firestoreData,
          email: currentUser.email || firestoreData.email || '',
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
      console.error('Ошибка при получении данных пользователя:', error)
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
