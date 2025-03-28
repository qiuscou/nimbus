<!-- eslint-disable vue/multi-word-component-names -->
<script>
import plus from '@/assets/elements/plus.svg'
import minus from '@/assets/elements/minus.svg'

export default {
  data() {
    return {
      plus,
      minus,
      questions: {
        support: {
          title: 'Как связаться с техподдержкой?',
          answer:
            'Связаться с нами можно через раздел «Помощь» или по эл. почте support@nimbus.com.',
          isExpanded: false,
        },
        defense: {
          title: 'Насколько защищены мои данные?',
          answer:
            'Мы используем современные методы шифрования и защиты данных, чтобы обеспечить безопасность информации пользователей.',
          isExpanded: false,
        },
        payment: {
          title: 'Какие методы оплаты вы принимаете?',
          answer: 'Мы принимаем карты платёжной системы МИР, а также оплату через СБП.',
          isExpanded: false,
        },
        volume: {
          title: 'Как увеличить объем доступного хранилища?',
          answer:
            'Чтобы расширить объем хранилища, перейдите в раздел «Тариф» и выберите подходящий план.',
          isExpanded: false,
        },
      },
    }
  },
  methods: {
    toggleExpand(key) {
      this.questions[key].isExpanded = !this.questions[key].isExpanded
    },
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

<style>
.questions-header-container {
  display: flex;
  justify-content: center;
}

.questions-frequent-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 3rem;
}

.questions-item {
  width: 65rem;
  border: 0.15rem #d0cece solid;
  border-radius: 1.95rem;
  overflow: hidden;
  transition: all 1s ease;
}

.questions-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  padding: 0 2rem;
  font-family: 'Manrope Semibold', sans-serif;
  font-weight: normal;
  font-size: 1.45rem;
}

.questions-content {
  font-family: 'Manrope Regular', sans-serif;
  font-weight: normal;
  font-size: 1.25rem;
  color: #d0cece;
  margin-left: 4.65rem;
  margin-right: 6.5rem;
  padding-bottom: 2rem;
}

.questions-text {
  margin-left: 2.5rem;
}

#questions-header {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2.05rem;
}

.questions-plus {
  width: 2.65rem;
  height: 2.65rem;
  margin-right: 2.25rem;
  cursor: pointer;
}

#questions-support,
#questions-defense,
#questions-payment,
#questions-volume {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Manrope Semibold', sans-serif;
  font-weight: normal;
  font-size: 1.45rem;
  border: 0.15rem #d0cece solid;
  border-radius: 1.95rem;
  width: 65rem;
  height: 6rem;
  padding: 0 2rem;
}
</style>
