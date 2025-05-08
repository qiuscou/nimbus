<script>
import { onMounted } from 'vue'
import { getAuth, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { useAccount } from '../scripts/useAccount.js'
import PersonalDataPanel from './PersonalDataPanel.vue'
import SecurityPanel from './SecurityPanel.vue'
import styles from '../styles/account.module.css'

export default {
  name: 'AccountApp',
  components: { PersonalDataPanel, SecurityPanel },
  setup() {
    const { userData, personalDataPanelAccountData, securityPanelAccountData, fetchUserData } =
      useAccount()

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

    onMounted(fetchUserData)

    return {
      userData,
      personalDataPanelAccountData,
      securityPanelAccountData,
      handleLogout,
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.accountPanel">
    <PersonalDataPanel :user="userData" :labels="personalDataPanelAccountData" />
    <SecurityPanel :user="userData" :labels="securityPanelAccountData" @logout="handleLogout" />
  </div>
</template>
