<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useSignIn } from './useSignIn'
import logo from '@/assets/logo/logo.svg'
import ellipse from '@/assets/elements/ellipse.svg'

export default {
  name: 'SignInApp',
  setup() {
    const { email, password, signIn, resetPassword, resetEmail } = useSignIn()

    return {
      email,
      password,
      signIn,
      resetPassword,
      resetEmail,
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
  <header class="signin-header">
    <div id="logo">
      <img :src="logoSignInData.logo" alt="logo" class="click" />
      <span class="click" id="name">{{ logoSignInData.title }}</span>
    </div>
  </header>

  <div class="signin-background-container">
    <img
      :src="backgroundSignInData.ellipse"
      alt="ellipse"
      class="signin-ellipse signin-ellipse-top"
    />
    <img
      :src="backgroundSignInData.ellipse"
      alt="ellipse"
      class="signin-ellipse signin-ellipse-bottom"
    />
  </div>

  <div class="signin-container">
    <div class="signin-form">
      <span id="signin-header">{{ formSignInData.header }}</span>

      <span class="signin-text">{{ formSignInData.email }}</span>
      <input class="signin-input" type="email" v-model="email" @keyup.enter="signIn" />
      <span class="signin-forgot click" @click="resetEmail">
        {{ formSignInData.forgot_email }}
      </span>

      <span class="signin-text">{{ formSignInData.password }}</span>
      <input class="signin-input" type="password" v-model="password" @keyup.enter="signIn" />
      <span class="signin-forgot click" @click="resetPassword">
        {{ formSignInData.forgot_password }}
      </span>

      <button class="click" id="signin-button" @click="signIn" :disabled="!email || !password">
        {{ formSignInData.sign_in }}
      </button>
    </div>
  </div>
</template>

<style src="./moduleSignIn.css" scoped></style>
