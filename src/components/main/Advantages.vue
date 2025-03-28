<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'AdvantagesApp',
  data() {
    return {
      headerAdvantagesData: {
        header: 'Преимущества',
      },
      pointsAdvantagesData: {
        available:
          'Доступно: Начни с минимального тарифа и расширяй свои возможности по мере необходимости.',
        safely:
          'Безопасно: Мы заботимся о безопасности ваших данных, используя передовые технологии шифрования.',
        just: 'Просто: Легкий и интуитивно понятный интерфейс, доступный как новичкам, так и опытным пользователям.',
      },
    }
  },
  computed: {
    formattedAvailable() {
      return this.pointsAdvantagesData.available.split(/(\s+)/).map((word) => {
        const cleanedWord = word.replace(/[.,!?]/g, '')
        return {
          text: word,
          highlight: ['минимального', 'тарифа'].includes(cleanedWord),
        }
      })
    },
    formattedSafely() {
      return this.pointsAdvantagesData.safely.split(/(\s+)/).map((word) => {
        const cleanedWord = word.replace(/[.,!?]/g, '')
        return {
          text: word,
          highlight: ['передовые', 'технологии', 'шифрования'].includes(cleanedWord),
        }
      })
    },
    formattedJust() {
      return this.pointsAdvantagesData.just.split(/(\s+)/).map((word) => {
        const cleanedWord = word.replace(/[.,!?]/g, '')
        return {
          text: word,
          highlight: ['новичкам', 'опытным', 'пользователям'].includes(cleanedWord),
        }
      })
    },
  },
}
</script>

<template>
  <div class="advantages-header-container">
    <span id="advantages-header">{{ headerAdvantagesData.header }}</span>
  </div>

  <div class="advantages-points-container">
    <span id="advantages-available">
      <span
        v-for="(word, index) in formattedAvailable"
        :key="index"
        :class="{ 'advantages-highlight': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
    <span id="advantages-safely">
      <span
        v-for="(word, index) in formattedSafely"
        :key="index"
        :class="{ 'advantages-highlight': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
    <span id="advantages-just">
      <span
        v-for="(word, index) in formattedJust"
        :key="index"
        :class="{ 'advantages-highlight': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
  </div>
</template>

<style>
.advantages-header-container {
  display: flex;
  justify-content: center;
}

.advantages-points-container {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-inline: 25rem;
  margin-top: 3rem;
}

.advantages-highlight {
  color: #197ccd;
  font-weight: bold;
}

#advantages-header {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2.05rem;
}

#advantages-available,
#advantages-safely,
#advantages-just {
  font-family: 'Manrope Light', sans-serif;
  font-weight: normal;
  font-size: 1.45rem;
}
</style>
