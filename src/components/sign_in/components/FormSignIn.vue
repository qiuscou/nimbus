<script>
import styles from '../styles/sign_in.module.css'

export default {
  name: 'FormSignIn',
  props: {
    email: String,
    password: String,
    data: Object,
  },
  emits: ['signIn', 'resetEmail', 'resetPassword', 'update:email', 'update:password'],
  data() {
    return {
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.signInContainer">
    <div :class="styles.signInForm">
      <span :class="styles.signInHeader">{{ data.header }}</span>

      <label :class="styles.signInText">{{ data.email }}</label>
      <input
        :class="styles.signInInput"
        type="email"
        :value="email"
        @input="$emit('update:email', $event.target.value)"
        @keyup.enter="$emit('signIn')"
      />
      <span :class="[styles.signInForgot, styles.click]" @click="$emit('resetEmail')">
        {{ data.forgot_email }}
      </span>

      <label :class="styles.signInText">{{ data.password }}</label>
      <input
        :class="styles.signInInput"
        type="password"
        :value="password"
        @input="$emit('update:password', $event.target.value)"
        @keyup.enter="$emit('signIn')"
      />
      <span :class="[styles.signInForgot, styles.click]" @click="$emit('resetPassword')">
        {{ data.forgot_password }}
      </span>

      <button
        :class="[styles.signInButton, styles.click]"
        @click="$emit('signIn')"
        :disabled="!email || !password"
      >
        {{ data.sign_in }}
      </button>
    </div>
  </div>
</template>
