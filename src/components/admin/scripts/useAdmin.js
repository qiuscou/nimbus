import { ref, reactive, computed } from 'vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
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

  const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage.value))

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
      const snapshot = await getDocs(collection(db, 'users'))

      const list = []
      snapshot.forEach((d) => {
        list.push({
          uid: d.id,
          ...d.data(),
        })
      })

      users.value = list
      filteredUsers.value = list
    } catch (err) {
      error.value = 'Не удалось загрузить пользователей'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  const applyFilters = () => {
    filteredUsers.value = users.value.filter((user) => {
      const matches = (field, val) =>
        !val || (user[field] || '').toLowerCase().includes(val.toLowerCase())

      return (
        matches('surname', filters.surname) &&
        matches('name', filters.name) &&
        matches('patronymic', filters.patronymic) &&
        (!filters.gender || user.gender === filters.gender) &&
        (!filters.dateOfBirth || user.dateOfBirth === filters.dateOfBirth) &&
        matches('country', filters.country)
      )
    })
  }

  const exportUsersToExcel = async () => {
    loading.value = true
    error.value = null
    success.value = null
    try {
      const data = filteredUsers.value.map((u) => ({
        UID: u.uid,
        Email: u.email,
        Фамилия: u.surname,
        Имя: u.name,
        Отчество: u.patronymic,
        Пол: u.gender,
        'Дата рождения': u.dateOfBirth,
        Страна: u.country,
      }))
      const ws = XLSX.utils.json_to_sheet(data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Пользователи')
      XLSX.writeFile(wb, `users_export_${new Date().toISOString().slice(0, 10)}.xlsx`)
      success.value = `Успешно экспортировано ${data.length} пользователей`
    } catch (e) {
      error.value = 'Ошибка при экспорте: ' + e.message
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const updateUser = async (user) => {
    try {
      loading.value = true
      const refDoc = doc(db, 'users', user.uid)
      await updateDoc(refDoc, {
        surname: user.surname,
        name: user.name,
        patronymic: user.patronymic,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
      })
      success.value = 'Пользователь обновлён'
      await fetchUsers()
    } catch (e) {
      error.value = 'Ошибка при обновлении: ' + e.message
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const deleteUser = async (uid) => {
    try {
      loading.value = true
      await deleteDoc(doc(db, 'users', uid))
      success.value = 'Пользователь удалён'
      await fetchUsers()
    } catch (e) {
      error.value = 'Ошибка при удалении: ' + e.message
      console.error(e)
    } finally {
      loading.value = false
    }
  }

  const nextPage = () => {
    if (currentPage.value < totalPages.value) currentPage.value++
  }
  const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--
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
    fetchUsers,
    applyFilters,
    exportUsersToExcel,
    updateUser,
    deleteUser,
    nextPage,
    prevPage,
    totalPages,
  }
}
