<script>
export default {
  name: 'LogoSignUp',
  props: {
    logoData: Object,
  },
}
</script>

<template>
  <header class="signupHeader">
    <div id="logo">
      <img :src="logoData.logo" alt="logo" class="click" />
      <span class="click" id="name">{{ logoData.title }}</span>
    </div>
  </header>
</template>

<style src="../styles/moduleSignUp.css" scoped></style>
