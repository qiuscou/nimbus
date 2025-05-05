<script>
import styles from '../styles/help.module.css'

export default {
  name: 'HelpResponse',
  props: {
    header: String,
    content: String,
  },
  data() {
    return {
      styles,
    }
  },
}
</script>

<template>
  <div :class="styles.helpResponse">
    <header :class="styles.responseHeader">
      {{ header }}
    </header>
    <div :class="styles.helpResponseContent" v-html="content" />
  </div>
</template>
