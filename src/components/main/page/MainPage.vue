<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useMainPage } from './useMainPage'
import { getAuth } from 'firebase/auth'
import MajorApp from '../major/Major.vue'
import TariffApp from '../tariff/Tariff.vue'
import UsApp from '../us/Us.vue'
import AdvantagesApp from '../advantages/Advantages.vue'
import QuestionsApp from '../questions/Questions.vue'
import { ref, onMounted } from 'vue'

export default {
  name: 'MainPageApp',
  components: { MajorApp, TariffApp, UsApp, AdvantagesApp, QuestionsApp },
  setup() {
    const { sectionsMajorData, sliderTariffData, goToNewPage } = useMainPage()
    const auth = getAuth()
    const user = ref(null)

    onMounted(() => {
      auth.onAuthStateChanged((authUser) => {
        user.value = authUser
      })
    })

    return {
      sectionsMajorData,
      sliderTariffData,
      goToNewPage,
      user,
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
            <button class="click" id="major-account" @click="goToNewPage('Account')">
              {{ user.email || '-' }}
            </button>
          </template>
        </template>
      </MajorApp>
    </div>
    <div id="app-tariff">
      <TariffApp>
        <template #checkout>
          <button class="click" id="tariff-checkout" @click="goToNewPage('Home')">
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

<style src="./moduleMainPage.css" scoped></style>
