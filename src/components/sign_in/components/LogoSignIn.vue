<script>
import logo from '@/assets/logo/logo.svg'
import styles from '../styles/sign_in.module.css'

export default {
  name: 'LogoSignIn',
  props: {
    data: Object,
  },
  data() {
    return {
      logo,
      styles,
    }
  },
}
</script>

<template>
  <header :class="styles.signInLogoContainer">
    <div :class="styles.signInLogo">
      <img :src="logo" alt="logo" :class="styles.click" />
      <span :class="styles.signInLogoName">{{ data.title }}</span>
    </div>
  </header>
</template>
