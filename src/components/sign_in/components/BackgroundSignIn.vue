<script>
import styles from '../styles/sign_in.module.css'

export default {
  name: 'BackgroundSignIn',
  props: {
    data: Object,
  },
  data() {
    return {
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.signInBackgroundContainer">
    <img
      :src="data.ellipse"
      alt="ellipse"
      :class="[styles.signInEllipse, styles.signInEllipseTop]"
    />
    <img
      :src="data.ellipse"
      alt="ellipse"
      :class="[styles.signInEllipse, styles.signInEllipseBottom]"
    />
  </div>
</template>
