<script>
import FormSignUp from './FormSignUp.vue'
import TariffSignUp from './TariffSignUp.vue'
import LogoSignUp from './LogoSignUp.vue'
import { useSignUp } from '../scripts/useSignUp'
import { mapState, mapGetters } from 'vuex'
import { LABELS } from '../scripts/constants'
import top_ellipse from '@/assets/elements/top_ellipse.svg'
import bottom_ellipse from '@/assets/elements/bottom_ellipse.svg'

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
      top_ellipse,
      bottom_ellipse,
      logoSignUpData: LABELS.logoSignUpData,
      formSignUpData: LABELS.formSignUpData,
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
    <img :src="top_ellipse" class="signupBackgroundTop" alt="Top Ellipse" />
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
    <img :src="bottom_ellipse" class="signupBackgroundBottom" alt="Bottom Ellipse" />
  </div>
</template>

<style src="../styles/moduleSignUp.css" scoped></style>
