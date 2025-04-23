<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { onMounted } from 'vue'
import { useAccount } from './useAccount'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'AccountApp',
  setup() {
    const {
      userData,
      personalDataPanelAccountData,
      securityPanelAccountData,
      buttonAccountData,
      fetchUserData,
    } = useAccount()

    const auth = getAuth()
    const router = useRouter()

    const handleLogout = async () => {
      try {
        await signOut(auth)
        router.push('/')
      } catch (error) {
        console.error('Ошибка при выходе:', error)
      }
    }

    onMounted(() => {
      fetchUserData()
    })

    return {
      userData,
      personalDataPanelAccountData,
      securityPanelAccountData,
      buttonAccountData,
      handleLogout,
    }
  },
}
</script>

<template>
  <div class="account-panel">
    <div class="account-personal-data">
      <div class="account-header">{{ personalDataPanelAccountData.header }}</div>

      <div class="account-caption-grey">{{ personalDataPanelAccountData.snp }}</div>
      <div class="account-user-data">
        {{ userData.surname }} {{ userData.name }} {{ userData.patronymic || '-' }}
      </div>

      <div class="account-caption-grey">{{ personalDataPanelAccountData.birth_date }}</div>
      <div class="account-user-data">{{ userData.dateOfBirth || '-' }}</div>

      <div class="account-caption-grey">{{ personalDataPanelAccountData.gender }}</div>
      <div class="account-user-data">{{ userData.gender || '-' }}</div>

      <div class="account-caption-grey">{{ personalDataPanelAccountData.country }}</div>
      <div class="account-user-data">{{ userData.country || '-' }}</div>
    </div>

    <div class="account-security">
      <div class="account-header">{{ securityPanelAccountData.header }}</div>

      <div class="account-caption-grey">{{ securityPanelAccountData.email }}</div>
      <div class="account-user-data">{{ userData.email || '-' }}</div>

      <div class="account-caption-grey">{{ securityPanelAccountData.phone }}</div>
      <div class="account-user-data">{{ userData.phone || '-' }}</div>

      <div class="account-caption-grey">{{ securityPanelAccountData.password }}</div>
      <div class="account-user-data">{{ userData.password }}</div>

      <div class="account-caption-red click">{{ securityPanelAccountData.delete_account }}</div>
      <div class="account-description">
        {{ securityPanelAccountData.delete_account_description }}
      </div>

      <div class="account-caption-red click" @click="handleLogout">
        {{ securityPanelAccountData.logout }}
      </div>
      <div class="account-description">{{ securityPanelAccountData.logout_description }}</div>
    </div>
  </div>
</template>

<style src="./moduleAccount.css" scoped></style>
