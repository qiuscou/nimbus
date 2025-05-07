<script>
import logo from '@/assets/logo/logo.svg'

export default {
  name: 'LogoSignUp',
  props: {
    logoData: Object,
  },
  data() {
    return {
      logo: logo,
    }
  },
}
</script>

<template>
  <header class="signupHeader">
    <div id="logo">
      <img :src="logo" alt="logo" class="click" />
      <span class="click" id="name">{{ logoData.title }}</span>
    </div>
  </header>
</template>

<style src="../styles/moduleSignUp.css" scoped></style>
