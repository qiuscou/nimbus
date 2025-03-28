<!-- eslint-disable vue/multi-word-component-names -->
<script>
export default {
  name: 'UsApp',
  data() {
    return {
      headerUsData: {
        header: 'О нас',
      },
      missionUsData: {
        mission:
          'Наша миссия — сделать облачные технологии доступными для всех, независимо от бюджета. Именно поэтому мы предлагаем свободный тариф, который позволяет начать пользоваться всеми преимуществами облака.',
      },
      subheadingUsData: {
        subheading: 'Мы создаем облачное пространство для всех, кто ценит свободу и простоту.',
      },
    }
  },
  computed: {
    formattedSubheading() {
      return this.subheadingUsData.subheading.split(/(\s+)/).map((word) => {
        const cleanedWord = word.replace(/[.,!?]/g, '')
        return {
          text: word,
          highlight: ['свободу', 'простоту'].includes(cleanedWord),
        }
      })
    },
    formattedMission() {
      return this.missionUsData.mission.split(/(\s+)/).map((word) => {
        const cleanedWord = word.replace(/[.,!?]/g, '')
        return {
          text: word,
          highlight: ['свободный', 'тариф'].includes(cleanedWord),
        }
      })
    },
  },
}
</script>

<template>
  <div class="us-header-container">
    <span id="us-header">{{ headerUsData.header }}</span>
  </div>
  <div class="us-subheading-container">
    <span id="us-subheading">
      <span
        v-for="(word, index) in formattedSubheading"
        :key="index"
        :class="{ 'us-subheading-word': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
  </div>
  <div class="us-mission-container">
    <span id="us-mission">
      <span
        v-for="(word, index) in formattedMission"
        :key="index"
        :class="{ 'us-subheading-word': word.highlight }"
      >
        {{ word.text }}
      </span>
    </span>
  </div>
</template>

<style>
.us-header-container {
  display: flex;
  justify-content: center;
}

.us-subheading-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  margin-inline: 25rem;
}

.us-subheading-word {
  color: #197ccd;
  font-weight: bold;
  font-size: 1.45rem;
}

.us-mission-container {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  margin-inline: 25rem;
}

#us-header {
  font-family: 'Manrope SemiBold', sans-serif;
  font-weight: bold;
  font-size: 2.05rem;
}

#us-subheading {
  font-family: 'Manrope Light', sans-serif;
  font-weight: normal;
  font-size: 1.45rem;
}

#us-mission {
  font-family: 'Manrope Light', sans-serif;
  font-weight: normal;
  font-size: 1.45rem;
}
</style>
