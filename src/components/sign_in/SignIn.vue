<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { ref } from 'vue'
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'vue-router'
import logo from '@/assets/logo/logo.svg'
import ellipse from '@/assets/elements/ellipse.svg'

export default {
  name: 'SignInApp',
  setup() {
    const email = ref('')
    const password = ref('')
    const router = useRouter()
    const errorMessage = ref('')

    const signIn = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
        console.log('Успешный вход:', userCredential.user)
        router.push('/home')
      } catch (error) {
        console.error('Ошибка входа:', error)
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage.value = 'Некорректный email'
            break
          case 'auth/user-disabled':
            errorMessage.value = 'Пользователь заблокирован'
            break
          case 'auth/user-not-found':
            errorMessage.value = 'Пользователь не найден'
            break
          case 'auth/wrong-password':
            errorMessage.value = 'Неверный пароль'
            break
          default:
            errorMessage.value = 'Ошибка при входе. Попробуйте снова.'
        }
      }
    }

    return {
      email,
      password,
      errorMessage,
      signIn,
    }
  },
  data() {
    return {
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
      isSignInPage: this.$route.path === '/',
    }
  },
  watch: {
    $route(to) {
      this.isSignInPage = to.path === '/'
    },
  },
  methods: {
    resetPassword() {
      alert('Функция восстановления пароля будет реализована позже')
    },
    resetEmail() {
      alert('Функция восстановления email будет реализована позже')
    },
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

      <div v-if="errorMessage" class="signin-error">
        {{ errorMessage }}
      </div>

      <button class="click" id="signin-button" @click="signIn" :disabled="!email || !password">
        {{ formSignInData.sign_in }}
      </button>
    </div>
  </div>
</template>

<style scoped>
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  margin: 0;
  font-family: 'Manrope', sans-serif;
  background-color: #f4f4f4;
  overflow: hidden;
}

.signin-header {
  position: absolute;
  top: 1.5rem;
  left: 4rem;
}

.signin-background-container {
  position: fixed;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.signin-ellipse {
  position: absolute;
  width: 60rem;
  height: 60rem;
}

.signin-ellipse-top {
  top: 0;
  right: 0;
  transform: translate(1%, -60%);
}

.signin-ellipse-bottom {
  bottom: 0;
  left: 0;
  transform: translate(-1%, 60%);
}

.signin-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.signin-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  border: #d0cece 0.1rem solid;
  background-color: #ffffff;
  border-radius: 1rem;
  padding: 3rem 2rem;
  width: 35rem;
  height: 31rem;
}

.signin-input {
  box-sizing: border-box;
  border: #d0cece 0.1rem solid;
  border-radius: 0.85rem;
  padding: 0.75rem;
  width: 22.5rem;
  height: 3.35rem;
  margin: 0.5rem 0;
}

.signin-text {
  align-self: flex-start;
  font-weight: normal;
  font-family: 'Manrope Light', sans-serif;
  font-size: 1.05rem;
  margin-left: 4rem;
}

.signin-forgot {
  align-self: flex-end;
  margin-right: 4.25rem;
  font-size: 0.85rem;
  font-family: 'Manrope Light', sans-serif;
  color: #197ccd;
  cursor: pointer;
}

#signin-header {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

#signin-button {
  font-family: 'Manrope SemiBold', sans-serif;
  font-size: 1.15rem;
  color: #ffffff;
  background-color: #197ccd;
  border: none;
  border-radius: 0.85rem;
  width: 22.5rem;
  height: 3.35rem;
  margin-top: 1.5rem;
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
</style>
