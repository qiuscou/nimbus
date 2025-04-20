<!-- eslint-disable vue/multi-word-component-names -->
<script>
import { useQuestions } from './useQuestions'
import plus from '@/assets/elements/plus.svg'
import minus from '@/assets/elements/minus.svg'

export default {
  name: 'QuestionsApp',
  setup() {
    const { questions, toggleExpand } = useQuestions()

    return {
      questions,
      toggleExpand,
      plus,
      minus,
    }
  },
}
</script>

<template>
  <div class="questions-header-container">
    <span id="questions-header">Частые вопросы</span>
  </div>
  <div class="questions-frequent-container">
    <div
      v-for="(question, key) in questions"
      :key="key"
      class="questions-item"
      @click="toggleExpand(key)"
    >
      <div class="questions-title-container">
        <span class="questions-text">{{ question.title }}</span>
        <img :src="question.isExpanded ? minus : plus" alt="toggle" class="questions-plus" />
      </div>
      <div v-if="question.isExpanded" class="questions-content">
        <p>{{ question.answer }}</p>
      </div>
    </div>
  </div>
</template>

<style src="./moduleQuestions.css" scoped></style>
