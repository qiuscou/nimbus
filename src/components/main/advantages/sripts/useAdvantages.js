import { computed } from 'vue'
import { ADVANTAGES_CONSTANTS } from './constants'

export function useAdvantages() {
  const { pointsAdvantagesData, highlights } = ADVANTAGES_CONSTANTS

  const formattedAvailable = computed(() =>
    pointsAdvantagesData.available.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: highlights.available.includes(cleanedWord),
      }
    }),
  )

  const formattedSafely = computed(() =>
    pointsAdvantagesData.safely.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: highlights.safely.includes(cleanedWord),
      }
    }),
  )

  const formattedJust = computed(() =>
    pointsAdvantagesData.just.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: highlights.just.includes(cleanedWord),
      }
    }),
  )

  return {
    headerAdvantagesData: ADVANTAGES_CONSTANTS.headerAdvantagesData,
    pointsAdvantagesData,
    formattedAvailable,
    formattedSafely,
    formattedJust,
  }
}
