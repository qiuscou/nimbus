<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useSignUp } from './useSignUp'
import logo from '@/assets/logo/logo.svg'
import top_ellipse from '@/assets/elements/top_ellipse.svg'
import bottom_ellipse from '@/assets/elements/bottom_ellipse.svg'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SignUpApp',
  setup() {
    const {
      surname,
      name,
      patronymic,
      dateOfBirth,
      email,
      password,
      selectedGB,
      selectedDays,
      selectedPrice,
      isSignUpPage,
      register,
      getDayDeclension,
      scrollToTariff,
      validateForm,
      completeRegistration,
      goToNewPage,
    } = useSignUp()

    return {
      surname,
      name,
      patronymic,
      dateOfBirth,
      email,
      password,
      selectedGB,
      selectedDays,
      selectedPrice,
      isSignUpPage,
      register,
      getDayDeclension,
      scrollToTariff,
      validateForm,
      completeRegistration,
      goToNewPage,
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

<style src="./moduleSignUp.css" scoped></style>
```
