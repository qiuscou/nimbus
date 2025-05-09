<script>
import { useMainPage } from '../scripts/useMainPage'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import MajorApp from '../../major/components/MajorApp.vue'
import TariffApp from '../../tariff/components/TariffApp.vue'
import UsApp from '../../us/components/UsApp.vue'
import AdvantagesApp from '../../advantages/components/AdvantagesApp.vue'
import QuestionsApp from '../../questions/components/QuestionsApp.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'MainPageApp',
  components: { MajorApp, TariffApp, UsApp, AdvantagesApp, QuestionsApp },
  setup() {
    const { sectionsMajorData, sliderTariffData, goToNewPage } = useMainPage()
    const auth = getAuth()
    const user = ref(null)
    const role = ref(null)

    onMounted(() => {
      auth.onAuthStateChanged(async (authUser) => {
        if (authUser) {
          user.value = authUser
          const docRef = doc(db, 'users', authUser.uid)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            role.value = docSnap.data().role || 'Пользователь'
            console.log('Роль:', role.value)
          }
        } else {
          user.value = null
          role.value = null
        }
      })
    })

    return {
      sectionsMajorData,
      sliderTariffData,
      goToNewPage,
      user,
      role,
    }
  },
}
</script>

<template>
  <div class="app-main">
    <div id="app-major">
      <MajorApp>
        <template #buttons>
          <template v-if="!user">
            <button class="click" id="major-sign-up" @click="goToNewPage('SignUp')">
              {{ sectionsMajorData.sign_up }}
            </button>
            <button class="click" id="major-sign-in" @click="goToNewPage('SignIn')">
              {{ sectionsMajorData.sign_in }}
            </button>
          </template>
          <template v-else>
            <button
              class="click"
              id="major-account"
              @click="goToNewPage(role === 'Администратор' ? 'Admin' : 'Account')"
            >
              {{ user.email || '-' }}
            </button>
          </template>
        </template>
      </MajorApp>
    </div>
    <div id="app-tariff">
      <TariffApp>
        <template #checkout>
          <button class="click" id="tariff-checkout" @click="goToNewPage('SignUp')">
            {{ sliderTariffData.checkout }}
          </button>
        </template>
      </TariffApp>
    </div>
    <div id="app-us">
      <UsApp />
    </div>
    <div id="app-advantages">
      <AdvantagesApp />
    </div>
    <div id="app-questions">
      <QuestionsApp />
    </div>
  </div>
</template>

<style src="../styles/moduleMainPage.css" scoped></style>
