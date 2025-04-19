<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { ref as dbRef, set } from 'firebase/database'
import { auth, db, database } from '@/firebase'
import logo from '@/assets/logo/logo.svg'
import top_ellipse from '@/assets/elements/top_ellipse.svg'
import bottom_ellipse from '@/assets/elements/bottom_ellipse.svg'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SignUpApp',
  setup() {
    const surname = ref('')
    const name = ref('')
    const patronymic = ref('')
    const dateOfBirth = ref('')
    const email = ref('')
    const password = ref('')
    const router = useRouter()

    const register = async () => {
      try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value,
        )
        const user = userCredential.user

        const userData = {
          email: email.value,
          name: name.value,
          surname: surname.value,
          patronymic: patronymic.value,
          dateOfBirth: dateOfBirth.value,
          createdAt: new Date(),
          tariff: {
            gb: selectedGB.value,
            days: selectedDays.value,
            price: selectedPrice.value,
          },
        }

        await setDoc(doc(db, 'users', user.uid), userData)

        await set(dbRef(database, `users/${user.uid}/profile`), {
          email: email.value,
          name: name.value,
          surname: surname.value,
          patronymic: patronymic.value,
          dateOfBirth: dateOfBirth.value,
          createdAt: new Date().toISOString(),
        })

        await set(dbRef(database, `users/${user.uid}/tariff`), {
          gb: selectedGB.value,
          days: selectedDays.value,
          price: selectedPrice.value,
        })

        console.log('Пользователь успешно зарегистрирован!')
        alert('Регистрация прошла успешно!')
        router.push('/home')
      } catch (error) {
        console.error('Ошибка регистрации:', error)
        let errorMessage = 'Произошла ошибка при регистрации'
        switch (error.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'Этот email уже используется'
            break
          case 'auth/invalid-email':
            errorMessage = 'Некорректный email'
            break
          case 'auth/weak-password':
            errorMessage = 'Пароль должен содержать минимум 6 символов'
            break
          default:
            errorMessage = error.message
        }
        alert(errorMessage)
      }
    }

    return {
      surname,
      name,
      patronymic,
      dateOfBirth,
      email,
      password,
      register,
    }
  },
  data() {
    return {
      logoSignUpData: {
        logo: logo,
        title: 'nimbus',
      },
      formSignUpData: {
        top_ellipse: top_ellipse,
        bottom_ellipse: bottom_ellipse,
        welcome: 'Добро пожаловать!',
        name: 'Имя',
        surname: 'Фамилия',
        patronymic: 'Отчество',
        birth_date: 'Дата рождения',
        email: 'Email',
        password: 'Пароль',
        sign_up: 'Далее',
        tariff: 'Ваш тариф',
        volume: 'Объем',
        volume_description:
          'Чем больше объём, тем больше файлов, документов,\nфотографий и других данных вы можете загрузить и\nхранить в облаке.',
        term: 'Срок аренды',
        term_description:
          'После окончания этого периода вам нужно продлить\nподписку, чтобы продолжить пользоваться сервисом\nбез ограничений.',
        total: 'Итого',
        total_description:
          'Мы показываем итоговую сумму для того, чтобы вы\nмогли точно понимать, сколько и за что вы платите,\nа также избежать неожиданностей при оплате.',
        checkout: 'Оформить',
      },
      isSignUpPage: this.$route.path === '/',
      selectedGB: null,
      selectedDays: null,
      selectedPrice: null,
    }
  },
  created() {
    const { gb, days, price } = this.$route.query
    if (gb && days && price) {
      this.selectedGB = parseInt(gb)
      this.selectedDays = parseInt(days)
      this.selectedPrice = price
      this.$store.commit('tariff/setInputValueGB', this.selectedGB)
      this.$store.commit('tariff/setInputValueDays', this.selectedDays)
    }
  },
  computed: {
    ...mapState('tariff', [
      'gigabyteTariffData',
      'daysTariffData',
      'priceTariffData',
      'inputValueGB',
      'inputValueDays',
    ]),
    ...mapGetters('tariff', ['totalPrice']),
  },
  methods: {
    getDayDeclension(count) {
      const declensions = ['День', 'Дня', 'Дней']
      if (count % 10 === 1 && count % 100 !== 11) {
        return declensions[0]
      } else if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
        return declensions[1]
      } else {
        return declensions[2]
      }
    },
    scrollToTariff() {
      if (!this.validateForm()) {
        return
      }
      const tariffSection = document.querySelector('.signup-tariff-container')
      if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    validateForm() {
      if (!this.surname || !this.name || !this.email || !this.password) {
        alert('Пожалуйста, заполните все обязательные поля')
        return false
      }
      if (this.password.length < 6) {
        alert('Пароль должен содержать минимум 6 символов')
        return false
      }
      return true
    },
    async completeRegistration() {
      if (!this.validateForm()) {
        return
      }
      try {
        await this.register()
        this.goToNewPage('Home')
      } catch (error) {
        console.error('Registration failed:', error)
      }
    },
    goToNewPage(page) {
      this.$router.push({ name: page })
    },
  },
  watch: {
    $route(to) {
      this.isSignUpPage = to.path === '/'
    },
  },
}
</script>

<template>
  <div>
    <img :src="formSignUpData.top_ellipse" class="signup-background-top" alt="Top Ellipse" />
    <header class="signup-header">
      <div id="logo">
        <img :src="logoSignUpData.logo" alt="logo" class="click" />
        <span class="click" id="name">{{ logoSignUpData.title }}</span>
      </div>
    </header>
    <div class="signup-container">
      <div class="signup-form-container">
        <div class="signup-content-container">
          <div class="signup-welcome-container">
            <span id="signup-header">{{ formSignUpData.welcome }}</span>

            <div class="signup-input-row">
              <div class="signup-input-group">
                <span class="signup-text">{{ formSignUpData.surname }}</span>
                <input class="signup-input" type="text" v-model="surname" required />
              </div>
              <div class="signup-input-group">
                <span class="signup-text">{{ formSignUpData.name }}</span>
                <input class="signup-input" type="text" v-model="name" required />
              </div>
            </div>

            <div class="signup-input-row">
              <div class="signup-input-group">
                <span class="signup-text">{{ formSignUpData.patronymic }}</span>
                <input class="signup-input" type="text" v-model="patronymic" />
              </div>
              <div class="signup-input-group">
                <span class="signup-text">{{ formSignUpData.birth_date }}</span>
                <input class="signup-input" type="date" v-model="dateOfBirth" />
              </div>
            </div>

            <div class="signup-input-row">
              <div class="signup-input-group">
                <span class="signup-text">{{ formSignUpData.email }}</span>
                <input class="signup-input" type="email" v-model="email" required />
              </div>
              <div class="signup-input-group">
                <span class="signup-text">{{ formSignUpData.password }}</span>
                <input class="signup-input" type="password" v-model="password" required />
              </div>
            </div>

            <button class="click" id="signup-button" @click="scrollToTariff">
              {{ formSignUpData.sign_up }}
            </button>
          </div>

          <div class="signup-tariff-container">
            <span id="signup-header">{{ formSignUpData.tariff }}</span>
            <div class="signup-tariff-content">
              <div class="signup-tariff-item">
                <span class="signup-text signup-tariff-title">{{ formSignUpData.volume }}</span>
                <div class="signup-tariff-row">
                  <span class="signup-text signup-description">{{
                    formSignUpData.volume_description
                  }}</span>
                  <div class="signup-tariff-values">
                    <span class="signup-total">{{ inputValueGB }}</span>
                    <span class="signup-symbol">{{ gigabyteTariffData.label }}</span>
                  </div>
                </div>
              </div>
              <div class="signup-divider"></div>
              <div class="signup-tariff-item">
                <span class="signup-text signup-tariff-title">{{ formSignUpData.term }}</span>
                <div class="signup-tariff-row">
                  <span class="signup-text signup-description">{{
                    formSignUpData.term_description
                  }}</span>
                  <div class="signup-tariff-values">
                    <span class="signup-total">{{ inputValueDays }}</span>
                    <span class="signup-symbol">{{ getDayDeclension(inputValueDays) }}</span>
                  </div>
                </div>
              </div>
              <div class="signup-divider"></div>
              <div class="signup-tariff-item">
                <span class="signup-text signup-tariff-title">{{ formSignUpData.total }}</span>
                <div class="signup-tariff-row">
                  <span class="signup-text signup-description">{{
                    formSignUpData.total_description
                  }}</span>
                  <div class="signup-tariff-values">
                    <span class="signup-total">{{ totalPrice }}</span>
                    <span class="signup-symbol">{{ priceTariffData.currencySymbol }}</span>
                  </div>
                </div>
              </div>
            </div>
            <button class="click" id="signup-checkout" @click="completeRegistration">
              {{ formSignUpData.checkout }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <img
      :src="formSignUpData.bottom_ellipse"
      class="signup-background-bottom"
      alt="Bottom Ellipse"
    />
  </div>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0;
  font-family: 'Manrope', sans-serif;
  background-color: #f4f4f4;
  overflow: hidden;
}

.signup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 4rem;
  padding-top: 1.5rem;
  width: 100%;
  box-sizing: border-box;
  z-index: -1;
}

#logo {
  display: flex;
  align-items: center;
  font-family: 'Circular Std', sans-serif;
  font-weight: bold;
  font-size: 2.15rem;
}

#name {
  margin-left: 1rem;
}

.signup-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.signup-form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border: #d0cece 0.1rem solid;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 3rem 2rem;
  width: 45rem;
  margin-bottom: 4.5rem;
}

.signup-content-container,
.signup-welcome-container,
.signup-tariff-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.signup-welcome-container,
.signup-tariff-container {
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.signup-input {
  box-sizing: border-box;
  border: #d0cece 0.1rem solid;
  font-family: 'Manrope Light', sans-serif;
  font-size: 1rem;
  border-radius: 0.85rem;
  padding: 0.75rem;
  width: 18.5rem;
  height: 3.35rem;
  margin: 0.5rem 0;
}

.signup-text {
  align-self: flex-start;
  font-weight: normal;
  font-size: 1.05rem;
  font-family: 'Manrope Light', sans-serif;
}

#signup-header {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
}

button {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.15rem;
  color: #ffffff;
  background-color: #197ccd;
  border: none;
  border-radius: 0.85rem;
  width: 39rem;
  height: 3.35rem;
  margin-top: 1rem;
  margin-bottom: 2rem;
}

.signup-input-row {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 2rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
  box-sizing: border-box;
}

.signup-input-group {
  display: flex;
  flex-direction: column;
  width: 18.5rem;
}

.signup-input-group .signup-text {
  margin-left: 0;
  margin-bottom: 0.5rem;
}

.signup-tariff-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  margin-left: -6.25rem;
}

.signup-tariff-item {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
  margin-left: 4.05rem;
}

.signup-tariff-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 0.5rem;
}

.signup-description {
  flex: 1;
  white-space: pre-line;
  color: #d0cece;
  font-size: 0.85rem;
  line-height: 1.5;
}

.signup-tariff-values {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  margin-left: auto;
}

.signup-total {
  font-family: 'Circular Std', sans-serif;
  font-size: 3.75rem;
  font-weight: bold;
}

.signup-symbol {
  font-family: 'Circular Std', sans-serif;
  font-size: 1.85rem;
  font-weight: bold;
}

.signup-tariff-title {
  font-weight: 600;
  font-size: 1.65rem;
}

.signup-tariff-item:first-child .signup-total,
.signup-tariff-item:first-child .signup-symbol,
.signup-tariff-item:nth-child(3) .signup-total,
.signup-tariff-item:nth-child(3) .signup-symbol {
  color: #197ccd;
}

.signup-tariff-item:last-child .signup-total,
.signup-tariff-item:last-child .signup-symbol {
  color: #2c2d2e;
}

.signup-divider {
  height: 0.1rem;
  background-color: #d0cece;
  border-radius: 1rem;
  width: 38.5rem;
  margin-left: 4.05rem;
}

.signup-background-top {
  position: fixed;
  top: 0;
  right: 0;
  z-index: -1;
}

.signup-background-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: -1;
}
</style>
