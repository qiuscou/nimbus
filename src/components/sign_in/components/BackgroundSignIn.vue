<script>
import ellipse from '@/assets/elements/ellipse.svg'
import styles from '../styles/sign_in.module.css'

export default {
  name: 'BackgroundSignIn',
  props: {
    data: Object,
  },
  data() {
    return {
      ellipse,
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.signInBackgroundContainer">
    <img :src="ellipse" alt="ellipse" :class="[styles.signInEllipse, styles.signInEllipseTop]" />
    <img :src="ellipse" alt="ellipse" :class="[styles.signInEllipse, styles.signInEllipseBottom]" />
  </div>
</template>
