<script>
import { useSignIn } from '../scripts/useSignIn'
import LogoSignIn from './LogoSignIn.vue'
import BackgroundSignIn from './BackgroundSignIn.vue'
import FormSignIn from './FormSignIn.vue'
import { SIGN_IN_CONSTANTS } from '../scripts/constants'
import styles from '../styles/sign_in.module.css'

export default {
  name: 'SignInApp',
  components: { LogoSignIn, BackgroundSignIn, FormSignIn },
  setup() {
    const { email, password, signIn, resetPassword, resetEmail } = useSignIn()

    return {
      email,
      password,
      signIn,
      resetPassword,
      resetEmail,
      styles,
      logoSignInData: SIGN_IN_CONSTANTS.logoSignInData,
      formSignInData: SIGN_IN_CONSTANTS.formSignInData,
      backgroundSignInData: SIGN_IN_CONSTANTS.backgroundSignInData,
    }
  },
}
</script>

<template>
  <div :class="styles.signInWrapper">
    <LogoSignIn :data="logoSignInData" />
    <BackgroundSignIn :data="backgroundSignInData" />
    <FormSignIn
      :email="email"
      :password="password"
      :data="formSignInData"
      @signIn="signIn"
      @resetEmail="resetEmail"
      @resetPassword="resetPassword"
      @update:email="email = $event"
      @update:password="password = $event"
    />
  </div>
</template>
