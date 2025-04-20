import { computed } from 'vue'

export function useUs() {
  const headerUsData = {
    header: 'О нас',
  }

  const missionUsData = {
    mission:
      'Наша миссия — сделать облачные технологии доступными для всех, независимо от бюджета. Именно поэтому мы предлагаем свободный тариф, который позволяет начать пользоваться всеми преимуществами облака.',
  }

  const subheadingUsData = {
    subheading: 'Мы создаем облачное пространство для всех, кто ценит свободу и простоту.',
  }

  const formattedSubheading = computed(() =>
    subheadingUsData.subheading.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: ['свободу', 'простоту'].includes(cleanedWord),
      }
    }),
  )

  const formattedMission = computed(() =>
    missionUsData.mission.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: ['свободный', 'тариф'].includes(cleanedWord),
      }
    }),
  )

  return {
    headerUsData,
    missionUsData,
    subheadingUsData,
    formattedSubheading,
    formattedMission,
  }
}
