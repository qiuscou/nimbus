<script>
import MajorApp from './components/main/Major.vue'
import TariffApp from './components/main/Tariff.vue'
import UsApp from './components/main/Us.vue'
import AdvantagesApp from './components/main/Advantages.vue'
import QuestionsApp from './components/main/Questions.vue'

export default {
  components: { MajorApp, TariffApp, UsApp, AdvantagesApp, QuestionsApp },
  data() {
    return {
      sectionsMajorData: {
        sign_up: 'Регистрация',
        sign_in: 'Войти',
      },
      sliderTariffData: {
        checkout: 'Оформить',
      },
      isMainPage: this.$route.path === '/',
    }
  },
  watch: {
    $route(to) {
      this.isMainPage = to.path === '/'
    },
  },
  methods: {
    goToNewPage(routeName) {
      this.$router.push({ name: routeName })
    },
  },
}
</script>

<template>
  <div class="app-main">
    <div id="app-major" v-if="isMainPage">
      <MajorApp>
        <template #buttons>
          <button class="click" id="major-sign-up" @click="goToNewPage('SignUp')">
            {{ sectionsMajorData.sign_up }}
          </button>
          <button class="click" id="major-sign-in" @click="goToNewPage('SignIn')">
            {{ sectionsMajorData.sign_in }}
          </button>
        </template>
      </MajorApp>
    </div>
    <div id="app-tariff" v-if="isMainPage">
      <TariffApp>
        <template #checkout>
          <button class="click" id="tariff-checkout" @click="goToNewPage('Home')">
            {{ sliderTariffData.checkout }}
          </button>
        </template>
      </TariffApp>
    </div>
    <div id="app-us" v-if="isMainPage">
      <UsApp />
    </div>
    <div id="app-advantages" v-if="isMainPage">
      <AdvantagesApp />
    </div>
    <div id="app-questions" v-if="isMainPage">
      <QuestionsApp />
    </div>
  </div>
  <router-view></router-view>
</template>

<style scoped>
.app-main {
  position: relative;
  overflow: hidden;
}

#app-tariff {
  margin-top: 37.5rem;
  position: relative;
  z-index: 1;
}

#app-us {
  margin-top: 7.5rem;
  margin-bottom: 7.5rem;
  position: relative;
}

#app-advantages {
  margin-top: 7.5rem;
  margin-bottom: 7.5rem;
  position: relative;
}

#app-questions {
  margin-top: 7.5rem;
  margin-bottom: 7.5rem;
  position: relative;
}
</style>
