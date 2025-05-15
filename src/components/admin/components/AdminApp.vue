<template>
  <div :class="styles.adminWrapper">
    <div :class="styles.adminContainer">
      <h1 :class="styles.adminTitle">
        {{ TEXTS.greeting }} {{ userName || TEXTS.defaultAdminName }}
      </h1>
      <p :class="styles.adminSubtitle">{{ TEXTS.subtitle }}</p>

      <!-- Фильтры -->
      <div :class="styles.filterForm">
        <label>
          {{ TEXTS.filters.surname }}
          <input type="text" v-model="filters.surname" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.name }}
          <input type="text" v-model="filters.name" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.patronymic }}
          <input type="text" v-model="filters.patronymic" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.gender }}
          <select v-model="filters.gender" :class="styles.filterSelect">
            <option value="">{{ TEXTS.genders.all }}</option>
            <option v-for="g in GENDERS" :key="g" :value="g">{{ g }}</option>
          </select>
        </label>
        <label>
          {{ TEXTS.filters.dateOfBirth }}
          <input type="date" v-model="filters.dateOfBirth" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.country }}
          <input type="text" v-model="filters.country" :class="styles.filterInput" />
        </label>

        <button :class="styles.filterButton" @click="applyFilters">
          {{ TEXTS.filters.applyFilters }}
        </button>
        <button :class="styles.adminButton" @click="exportUsersToExcel">
          {{ TEXTS.actions.exportToExcel }}
        </button>
      </div>

      <div v-if="error" :class="styles.errorMessage">{{ error }}</div>
      <div v-if="success" :class="styles.successMessage">{{ success }}</div>

      <!-- Действия над записью -->
      <div :class="styles.adminActions">
        <button
          :class="styles.adminButton"
          :disabled="!selectedUser || isEditing"
          @click="openEditModal"
        >
          Редактировать
        </button>
        <button
          :class="styles.adminButton"
          :disabled="!selectedUser || isEditing"
          @click="confirmDelete"
        >
          Удалить
        </button>
      </div>

      <!-- Форма редактирования -->
      <div v-if="isEditing" :class="styles.editForm">
        <h2>{{ TEXTS.edit.title }}</h2>
        <label>
          {{ TEXTS.table.surname }}
          <input type="text" v-model="editableUser.surname" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.table.name }}
          <input type="text" v-model="editableUser.name" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.table.patronymic }}
          <input type="text" v-model="editableUser.patronymic" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.table.gender }}
          <select v-model="editableUser.gender" :class="styles.filterSelect">
            <option value="">{{ TEXTS.genders.all }}</option>
            <option v-for="g in GENDERS" :key="g" :value="g">{{ g }}</option>
          </select>
        </label>
        <label>
          {{ TEXTS.table.dateOfBirth }}
          <input type="date" v-model="editableUser.dateOfBirth" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.table.country }}
          <input type="text" v-model="editableUser.country" :class="styles.filterInput" />
        </label>
        <div :class="styles.editButtons">
          <button :class="styles.adminButton" @click="saveEdit" :disabled="loading">
            {{ TEXTS.edit.save }}
          </button>
          <button :class="styles.adminButton" @click="cancelEdit" :disabled="loading">
            {{ TEXTS.edit.cancel }}
          </button>
        </div>
      </div>

      <!-- Таблица пользователей -->
      <div :class="styles.usersPreview">
        <div :class="styles.usersCount">
          {{ TEXTS.table.totalUsers }} {{ filteredUsers.length }}
        </div>
        <table :class="styles.usersTable">
          <thead>
            <tr>
              <th>{{ TEXTS.table.uid }}</th>
              <th>{{ TEXTS.table.email }}</th>
              <th>{{ TEXTS.table.surname }}</th>
              <th>{{ TEXTS.table.name }}</th>
              <th>{{ TEXTS.table.patronymic }}</th>
              <th>{{ TEXTS.table.gender }}</th>
              <th>{{ TEXTS.table.dateOfBirth }}</th>
              <th>{{ TEXTS.table.country }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in paginatedUsers"
              :key="user.uid"
              :class="{ [styles.selected]: selectedUser && selectedUser.uid === user.uid }"
              @click="selectUser(user)"
            >
              <td>{{ user.uid }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.surname }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.patronymic }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ user.dateOfBirth }}</td>
              <td>{{ user.country }}</td>
            </tr>
            <tr v-if="!paginatedUsers.length" :class="styles.moreUsers">
              <td colspan="8">
                {{ TEXTS.table.moreUsers.replace('{count}', filteredUsers.length) }}
              </td>
            </tr>
          </tbody>
        </table>

        <div :class="styles.pagination">
          <button :class="styles.paginationButton" @click="prevPage" :disabled="currentPage === 1">
            {{ TEXTS.table.prevPage }}
          </button>
          <span :class="styles.paginationInfo">
            {{ TEXTS.table.page }} {{ currentPage }} {{ TEXTS.table.of }} {{ totalPages }}
          </span>
          <button
            :class="styles.paginationButton"
            @click="nextPage"
            :disabled="currentPage === totalPages"
          >
            {{ TEXTS.table.nextPage }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAdmin } from '../scripts/useAdmin'
import { TEXTS, GENDERS } from '../scripts/constants'
import styles from '../styles/admin.module.css'

// Деструктурируем composable
const {
  userName,
  filteredUsers,
  paginatedUsers,
  currentPage,
  totalPages,
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
} = useAdmin()

const selectedUser = ref(null)
const isEditing = ref(false)
const editableUser = reactive({
  uid: '',
  surname: '',
  name: '',
  patronymic: '',
  gender: '',
  dateOfBirth: '',
  country: '',
})

onMounted(() => {
  checkAuthStatus()
  fetchUsers()
})

function selectUser(user) {
  if (isEditing.value) return
  selectedUser.value = selectedUser.value?.uid === user.uid ? null : user
}

function confirmDelete() {
  if (!selectedUser.value || isEditing.value) return
  if (confirm(`Удалить пользователя ${selectedUser.value.name}?`)) {
    deleteUser(selectedUser.value.uid)
    selectedUser.value = null
  }
}

function openEditModal() {
  if (!selectedUser.value) return
  Object.assign(editableUser, selectedUser.value)
  isEditing.value = true
}

function cancelEdit() {
  isEditing.value = false
  selectedUser.value = null
}

function saveEdit() {
  updateUser({ ...editableUser })
  isEditing.value = false
  selectedUser.value = null
}
</script>

<style module>
/* Ваши существующие стили */

.selected {
  background-color: #e0f3ff;
}

.editForm {
  margin: 16px 0;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.editForm label {
  display: block;
  margin-bottom: 8px;
}

.editButtons {
  margin-top: 12px;
  display: flex;
  gap: 8px;
}
</style>
