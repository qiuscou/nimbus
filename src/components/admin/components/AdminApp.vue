<template>
  <div class="admin-wrapper">
    <div class="admin-container">
      <h1 class="admin-title">Добро пожаловать, Администратор!</h1>
      <p class="admin-subtitle">Здесь вы можете управлять пользователями и данными.</p>

      <div class="filter-form">
        <label>
          Email:
          <input v-model="filters.email" type="text" placeholder="Введите часть email" />
        </label>
        <label>
          Страна:
          <input v-model="filters.country" type="text" placeholder="Введите страну" />
        </label>
        <label>
          Имя:
          <input v-model="filters.name" type="text" placeholder="Введите имя" />
        </label>
        <label>
          Фамилия:
          <input v-model="filters.surname" type="text" placeholder="Введите фамилию" />
        </label>
        <label>
          Отчество:
          <input v-model="filters.patronymic" type="text" placeholder="Введите отчество" />
        </label>
        <label>
          Пол:
          <input v-model="filters.gender" type="text" placeholder="Введите пол (м/ж)" />
        </label>
        <label>
          Дата рождения:
          <input v-model="filters.dateOfBirth" type="date" />
        </label>
        <button class="filter-button click" @click="applyFilters">Применить фильтры</button>
      </div>

      <div class="admin-actions">
        <button
          id="major-admin"
          class="admin-button click"
          @click="exportUsersToExcel"
          :disabled="loading"
        >
          <span v-if="!loading">Экспорт пользователей в Excel</span>
          <span v-else>Загрузка данных...</span>
        </button>

        <div v-if="error" class="admin-message error-message">
          {{ error }}
        </div>

        <div v-if="success" class="admin-message success-message">
          {{ success }}
        </div>
      </div>

      <div v-if="filteredUsers.length > 0" class="users-preview">
        <h3 class="users-count">Всего пользователей: {{ filteredUsers.length }}</h3>
        <table class="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>UID</th>
              <th>Страна</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Отчество</th>
              <th>Пол</th>
              <th>Дата рождения</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers.slice(0, 5)" :key="user.uid">
              <td>{{ user.email }}</td>
              <td class="uid-cell">{{ user.uid }}</td>
              <td>{{ user.country || 'Не указано' }}</td>
              <td>{{ user.name || 'Не указано' }}</td>
              <td>{{ user.surname || 'Не указано' }}</td>
              <td>{{ user.patronymic || 'Не указано' }}</td>
              <td>{{ user.gender || 'Не указано' }}</td>
              <td>{{ user.dateOfBirth || 'Не указано' }}</td>
            </tr>
            <tr v-if="filteredUsers.length > 5" class="more-users">
              <td colspan="8">... и еще {{ filteredUsers.length - 5 }} пользователей</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, collection, getDocs, doc, setDoc } from 'firebase/firestore'
import * as XLSX from 'xlsx'
import { db } from '@/firebase'

export default {
  name: 'AdminApp',
  data() {
    return {
      users: [],
      filteredUsers: [],
      filters: {
        email: '',
        country: '',
        name: '',
        surname: '',
        patronymic: '',
        gender: '',
        dateOfBirth: '',
      },
      loading: false,
      error: null,
      success: null,
      auth: getAuth(),
      db: getFirestore(),
    }
  },
  mounted() {
    this.checkAuthStatus()
    this.fetchUsers()
  },
  methods: {
    checkAuthStatus() {
      onAuthStateChanged(this.auth, (user) => {
        if (!user) {
          this.error = 'Необходимо авторизоваться'
        }
      })
    },

    async fetchUsers() {
      try {
        const usersCollection = collection(this.db, 'users')
        const snapshot = await getDocs(usersCollection)

        const users = []
        snapshot.forEach((doc) => {
          users.push({
            uid: doc.id,
            ...doc.data(),
          })
        })

        this.users = users
        this.filteredUsers = users
      } catch (err) {
        console.error('Ошибка при загрузке пользователей:', err)
        this.error = 'Не удалось загрузить пользователей'
      }
    },

    applyFilters() {
      this.filteredUsers = this.users.filter((user) => {
        const matchesEmail =
          !this.filters.email ||
          (user.email || '').toLowerCase().includes(this.filters.email.toLowerCase())
        const matchesCountry =
          !this.filters.country ||
          (user.country || '').toLowerCase().includes(this.filters.country.toLowerCase())
        const matchesName =
          !this.filters.name ||
          (user.name || '').toLowerCase().includes(this.filters.name.toLowerCase())
        const matchesSurname =
          !this.filters.surname ||
          (user.surname || '').toLowerCase().includes(this.filters.surname.toLowerCase())
        const matchesPatronymic =
          !this.filters.patronymic ||
          (user.patronymic || '').toLowerCase().includes(this.filters.patronymic.toLowerCase())
        const matchesGender =
          !this.filters.gender ||
          (user.gender || '').toLowerCase() === this.filters.gender.toLowerCase()
        const matchesDateOfBirth =
          !this.filters.dateOfBirth || user.dateOfBirth === this.filters.dateOfBirth
        return (
          matchesEmail &&
          matchesCountry &&
          matchesName &&
          matchesSurname &&
          matchesPatronymic &&
          matchesGender &&
          matchesDateOfBirth
        )
      })
    },

    async exportUsersToExcel() {
      this.loading = true
      this.error = null
      this.success = null

      try {
        const ws = XLSX.utils.json_to_sheet(this.filteredUsers)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Пользователи')

        XLSX.writeFile(wb, `users_export_${new Date().toISOString().split('T')[0]}.xlsx`)

        this.success = `Успешно экспортировано ${this.filteredUsers.length} пользователей`
      } catch (err) {
        console.error('Ошибка при экспорте пользователей:', err)
        this.error = 'Произошла ошибка при экспорте: ' + err.message
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
.admin-wrapper {
  display: flex;
  padding: 0.75rem;
  box-sizing: border-box;
  height: calc(100vh - 1.5rem);
  background-color: #f6f7f8;
}

.admin-container {
  flex: 1;
  border: 1px solid #8c8e93;
  background: #ffffff;
  border-radius: 8px;
  padding: 1.5rem;
  box-sizing: border-box;
  overflow-y: auto;
}

.admin-title {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.5rem;
  color: #2c2d2e;
  margin-bottom: 0.5rem;
}

.admin-subtitle {
  font-family: 'Manrope Regular', sans-serif;
  font-size: 1.05rem;
  color: #8c8e93;
  margin-bottom: 1.5rem;
}

.filter-form {
  margin-bottom: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.filter-form label {
  display: flex;
  flex-direction: column;
  font-family: 'Manrope Regular', sans-serif;
  font-size: 0.9rem;
  color: #2c2d2e;
}

.filter-form input {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-family: 'Manrope Regular', sans-serif;
  font-size: 0.9rem;
}

.filter-button {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
  background: #197ccd;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-button:hover {
  background: #1565a3;
}

.admin-actions {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-button {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.05rem;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
  background: #197ccd;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  width: fit-content;
}

.admin-button:hover:not(:disabled) {
  background: #1565a3;
  transform: translateY(-1px);
}

.admin-button:disabled {
  background: #8c8e93;
  cursor: not-allowed;
  opacity: 0.7;
}

.admin-message {
  font-family: 'Manrope Regular', sans-serif;
  font-size: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
}

.error-message {
  color: #d32f2f;
  background-color: #fde0e0;
  border: 1px solid #f5c2c7;
}

.success-message {
  color: #388e3c;
  background-color: #ebf5eb;
  border: 1px solid #c3e6cb;
}

.users-preview {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  background: #ffffff;
}

.users-count {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.2rem;
  color: #2c2d2e;
  margin-bottom: 1rem;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Manrope Regular', sans-serif;
}

.users-table th {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1rem;
  color: #2c2d2e;
  background-color: #f6f7f8;
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

.users-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e0e0e0;
  color: #2c2d2e;
}

.users-table tr:hover {
  background-color: #f5f5f5;
}

.uid-cell {
  font-family: 'Manrope Light', sans-serif;
  font-size: 0.85rem;
  color: #8c8e93;
}

.more-users td {
  font-family: 'Manrope Regular', sans-serif;
  font-size: 0.9rem;
  color: #8c8e93;
  text-align: center;
  padding: 1rem;
}
</style>
