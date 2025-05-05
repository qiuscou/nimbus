<script>
import FormSignUp from './FormSignUp.vue'
import TariffSignUp from './TariffSignUp.vue'
import LogoSignUp from './LogoSignUp.vue'
import { useSignUp } from '../scripts/useSignUp'
import top_ellipse from '@/assets/elements/top_ellipse.svg'
import bottom_ellipse from '@/assets/elements/bottom_ellipse.svg'
import logo from '@/assets/logo/logo.svg'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'SignUpApp',
  components: {
    FormSignUp,
    TariffSignUp,
    LogoSignUp,
  },
  setup() {
    const composable = useSignUp()

    return {
      ...composable,
      logoSignUpData: {
        logo,
        title: 'nimbus',
      },
      formSignUpData: {
        top_ellipse,
        bottom_ellipse,
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
    <img :src="formSignUpData.top_ellipse" class="signupBackgroundTop" alt="Top Ellipse" />
    <LogoSignUp :logoData="logoSignUpData" />
    <div class="signupContainer">
      <div class="signupFormContainer">
        <div class="signupContentContainer">
          <FormSignUp
            :formData="formSignUpData"
            v-model:name="name"
            v-model:surname="surname"
            v-model:patronymic="patronymic"
            v-model:dateOfBirth="dateOfBirth"
            v-model:email="email"
            v-model:password="password"
            @submit="scrollToTariff"
          />
          <TariffSignUp
            :formData="formSignUpData"
            :inputValueGB="inputValueGB"
            :inputValueDays="inputValueDays"
            :gigabyteTariffData="gigabyteTariffData"
            :daysTariffData="daysTariffData"
            :priceTariffData="priceTariffData"
            :totalPrice="totalPrice"
            :getDayDeclension="getDayDeclension"
            @submit="completeRegistration"
          />
        </div>
      </div>
    </div>
    <img :src="formSignUpData.bottom_ellipse" class="signupBackgroundBottom" alt="Bottom Ellipse" />
  </div>
</template>

<style src="../styles/moduleSignUp.css" scoped></style>
