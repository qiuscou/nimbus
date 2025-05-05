<script>
import { useSignIn } from '../scripts/useSignIn'
import LogoSignIn from './LogoSignIn.vue'
import BackgroundSignIn from './BackgroundSignIn.vue'
import FormSignIn from './FormSignIn.vue'
import logo from '@/assets/logo/logo.svg'
import ellipse from '@/assets/elements/ellipse.svg'
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
      logoSignInData: {
        logo: logo,
        title: 'nimbus',
      },
      formSignInData: {
        header: 'Рады вас видеть!',
        email: 'Email',
        password: 'Пароль',
        forgot_email: 'Забыли email?',
        forgot_password: 'Забыли пароль?',
        sign_in: 'Войти',
      },
      backgroundSignInData: {
        ellipse: ellipse,
      },
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
