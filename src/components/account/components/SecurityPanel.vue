<script>
import styles from '../styles/account.module.css'
import { LABELS } from '../composables/constants.js'

export default {
  props: ['user'],
  emits: ['logout'],
  setup() {
    return { styles, labels: LABELS.securityPanel }
  },
}
</script>

<template>
  <div :class="styles.accountSecurity">
    <div :class="styles.accountHeader">{{ labels.header }}</div>

    <div :class="styles.accountCaptionGrey">{{ labels.email }}</div>
    <div :class="styles.accountUserData">{{ user.email || '-' }}</div>

    <div :class="styles.accountCaptionGrey">{{ labels.phone }}</div>
    <div :class="styles.accountUserData">{{ user.phone || '-' }}</div>

    <div :class="styles.accountCaptionGrey">{{ labels.password }}</div>
    <div :class="styles.accountUserData">••••••••</div>

    <div :class="[styles.accountCaptionRed, styles.click]">{{ labels.delete_account }}</div>
    <div :class="styles.accountDescription">{{ labels.delete_account_description }}</div>

    <div :class="[styles.accountCaptionRed, styles.click]" @click="$emit('logout')">
      {{ labels.logout }}
    </div>
    <div :class="styles.accountDescription">{{ labels.logout_description }}</div>
  </div>
</template>
