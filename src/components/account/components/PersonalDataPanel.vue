<script>
import styles from '../styles/account.module.css'
import { LABELS } from '../composables/constants.js'

export default {
  props: ['user'],
  setup() {
    return { styles, labels: LABELS.personalDataPanel }
  },
}
</script>

<template>
  <div :class="styles.accountPersonalData">
    <div :class="styles.accountHeader">{{ labels.header }}</div>

    <div :class="styles.accountCaptionGrey">{{ labels.snp }}</div>
    <div :class="styles.accountUserData">
      {{ user.surname }} {{ user.name }} {{ user.patronymic || '-' }}
    </div>

    <div :class="styles.accountCaptionGrey">{{ labels.birth_date }}</div>
    <div :class="styles.accountUserData">{{ user.dateOfBirth || '-' }}</div>

    <div :class="styles.accountCaptionGrey">{{ labels.gender }}</div>
    <div :class="styles.accountUserData">{{ user.gender || '-' }}</div>

    <div :class="styles.accountCaptionGrey">{{ labels.country }}</div>
    <div :class="styles.accountUserData">{{ user.country || '-' }}</div>
  </div>
</template>
