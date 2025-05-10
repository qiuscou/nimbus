<script>
import { onMounted } from 'vue'
import { useAdmin } from '../scripts/useAdmin'
import { TEXTS } from '../scripts/constants'
import styles from '../styles/admin.module.css'

export default {
  name: 'AdminApp',
  setup() {
    const admin = useAdmin()

    onMounted(() => {
      admin.checkAuthStatus()
      admin.fetchUsers()
    })

    return {
      ...admin,
      TEXTS,
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.adminWrapper">
    <div :class="styles.adminContainer">
      <h1 :class="styles.adminTitle">
        {{ TEXTS.greeting }} {{ userName || TEXTS.defaultAdminName }}
      </h1>
      <p :class="styles.adminSubtitle">{{ TEXTS.subtitle }}</p>

      <div :class="styles.filterForm">
        <label>
          {{ TEXTS.filters.surname }}
          <input v-model="filters.surname" type="text" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.name }}
          <input v-model="filters.name" type="text" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.patronymic }}
          <input v-model="filters.patronymic" type="text" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.gender }}
          <select v-model="filters.gender" :class="styles.filterSelect">
            <option value="">{{ TEXTS.genders.all }}</option>
            <option value="Мужской">{{ TEXTS.genders.male }}</option>
            <option value="Женский">{{ TEXTS.genders.female }}</option>
          </select>
        </label>
        <label>
          {{ TEXTS.filters.dateOfBirth }}
          <input v-model="filters.dateOfBirth" type="text" :class="styles.filterInput" />
        </label>
        <label>
          {{ TEXTS.filters.country }}
          <input v-model="filters.country" type="text" :class="styles.filterInput" />
        </label>
      </div>

      <div :class="styles.adminActions">
        <button id="apply-filters" :class="styles.filterButton" @click="applyFilters">
          {{ TEXTS.filters.applyFilters }}
        </button>

        <button
          id="major-admin"
          :class="styles.adminButton"
          @click="exportUsersToExcel"
          :disabled="loading"
        >
          <span v-if="!loading">{{ TEXTS.actions.exportToExcel }}</span>
          <span v-else>{{ TEXTS.actions.loading }}</span>
        </button>
      </div>

      <div v-if="filteredUsers.length > 0" :class="styles.usersPreview">
        <h3 :class="styles.usersCount">{{ TEXTS.table.totalUsers }} {{ filteredUsers.length }}</h3>
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
            <tr v-for="user in paginatedUsers" :key="user.uid">
              <td :class="styles.uidCell">{{ user.uid }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.surname || TEXTS.table.notSpecified }}</td>
              <td>{{ user.name || TEXTS.table.notSpecified }}</td>
              <td>{{ user.patronymic || TEXTS.table.notSpecified }}</td>
              <td>{{ user.gender || TEXTS.table.notSpecified }}</td>
              <td>{{ user.dateOfBirth || TEXTS.table.notSpecified }}</td>
              <td>{{ user.country || TEXTS.table.notSpecified }}</td>
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
