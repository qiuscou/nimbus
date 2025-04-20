import { computed } from 'vue'

export function useAdvantages() {
  const headerAdvantagesData = {
    header: 'Преимущества',
  }

  const pointsAdvantagesData = {
    available:
      'Доступно: Начни с минимального тарифа и расширяй свои возможности по мере необходимости.',
    safely:
      'Безопасно: Мы заботимся о безопасности ваших данных, используя передовые технологии шифрования.',
    just: 'Просто: Легкий и интуитивно понятный интерфейс, доступный как новичкам, так и опытным пользователям.',
  }

  const formattedAvailable = computed(() =>
    pointsAdvantagesData.available.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: ['минимального', 'тарифа'].includes(cleanedWord),
      }
    }),
  )

  const formattedSafely = computed(() =>
    pointsAdvantagesData.safely.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: ['передовые', 'технологии', 'шифрования'].includes(cleanedWord),
      }
    }),
  )

  const formattedJust = computed(() =>
    pointsAdvantagesData.just.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: ['новичкам', 'опытным', 'пользователям'].includes(cleanedWord),
      }
    }),
  )

  return {
    headerAdvantagesData,
    pointsAdvantagesData,
    formattedAvailable,
    formattedSafely,
    formattedJust,
  }
}
