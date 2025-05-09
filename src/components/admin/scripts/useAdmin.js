import { ref, reactive, computed } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore'
import * as XLSX from 'xlsx'

export function useAdmin() {
  const auth = getAuth()
  const db = getFirestore()

  const userName = ref(null)
  const users = ref([])
  const filteredUsers = ref([])
  const itemsPerPage = ref(10)
  const currentPage = ref(1)

  const filters = reactive({
    surname: '',
    name: '',
    patronymic: '',
    gender: '',
    dateOfBirth: '',
    country: '',
  })

  const loading = ref(false)
  const error = ref(null)
  const success = ref(null)

  const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return filteredUsers.value.slice(start, end)
  })

  const totalPages = computed(() => {
    return Math.ceil(filteredUsers.value.length / itemsPerPage.value)
  })

  const checkAuthStatus = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserName(user.uid)
      } else {
        error.value = 'Необходимо авторизоваться'
      }
    })
  }

  const fetchUserName = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid))
      if (userDoc.exists()) {
        if (userDoc.data().role !== 'Администратор') {
          error.value = 'Доступ запрещён: недостаточно прав'
          return
        }
        userName.value = userDoc.data().name || 'Администратор'
      }
    } catch (err) {
      error.value = 'Ошибка при проверке прав доступа'
      console.error(err)
    }
  }

  const fetchUsers = async () => {
    try {
      loading.value = true
      error.value = null
      const usersCollection = collection(db, 'users')
      const snapshot = await getDocs(usersCollection)

      const userList = []
      snapshot.forEach((doc) => {
        userList.push({
          uid: doc.id,
          ...doc.data(),
        })
      })

      users.value = userList
      filteredUsers.value = userList
      console.log('Загружено пользователей:', userList.length)
    } catch (err) {
      console.error('Ошибка при загрузке пользователей:', err)
      error.value = 'Не удалось загрузить пользователей'
    } finally {
      loading.value = false
    }
  }

  const applyFilters = () => {
    filteredUsers.value = users.value.filter((user) => {
      const matchesSurname =
        !filters.surname ||
        (user.surname || '').toLowerCase().includes(filters.surname.toLowerCase())
      const matchesName =
        !filters.name || (user.name || '').toLowerCase().includes(filters.name.toLowerCase())
      const matchesPatronymic =
        !filters.patronymic ||
        (user.patronymic || '').toLowerCase().includes(filters.patronymic.toLowerCase())
      const matchesGender =
        !filters.gender || (user.gender || '').toLowerCase() === filters.gender.toLowerCase()
      const matchesDateOfBirth = !filters.dateOfBirth || user.dateOfBirth === filters.dateOfBirth
      const matchesCountry =
        !filters.country ||
        (user.country || '').toLowerCase().includes(filters.country.toLowerCase())
      return (
        matchesSurname &&
        matchesName &&
        matchesPatronymic &&
        matchesGender &&
        matchesDateOfBirth &&
        matchesCountry
      )
    })
  }

  const exportUsersToExcel = async () => {
    loading.value = true
    error.value = null
    success.value = null

    try {
      const exportData = filteredUsers.value.map((user) => ({
        UID: user.uid || 'Не указано',
        Email: user.email || 'Не указано',
        Номер: user.phone || 'Не указано',
        Фамилия: user.surname || 'Не указано',
        Имя: user.name || 'Не указано',
        Отчество: user.patronymic || 'Не указано',
        Пол: user.gender || 'Не указано',
        'Дата рождения': user.dateOfBirth || 'Не указано',
        Пароль: user.password || 'Не указано',
        Страна: user.country || 'Не указано',
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Пользователи')

      XLSX.writeFile(wb, `users_export_${new Date().toISOString().split('T')[0]}.xlsx`)

      success.value = `Успешно экспортировано ${filteredUsers.value.length} пользователей`
    } catch (err) {
      console.error('Ошибка при экспорте пользователей:', err)
      error.value = 'Произошла ошибка при экспорте: ' + err.message
    } finally {
      loading.value = false
    }
  }

  const nextPage = () => {
    if (currentPage.value < Math.ceil(filteredUsers.value.length / itemsPerPage.value)) {
      currentPage.value++
    }
  }

  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--
    }
  }

  return {
    userName,
    users,
    filteredUsers,
    paginatedUsers,
    itemsPerPage,
    currentPage,
    filters,
    loading,
    error,
    success,
    checkAuthStatus,
    fetchUserName,
    fetchUsers,
    applyFilters,
    exportUsersToExcel,
    nextPage,
    prevPage,
    totalPages,
  }
}
