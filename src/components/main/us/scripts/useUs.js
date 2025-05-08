import { computed } from 'vue'
import { US_CONSTANTS } from '../scripts/constants'

export function useUs() {
  const { headerUsData, missionUsData, subheadingUsData, highlights } = US_CONSTANTS

  const formattedSubheading = computed(() =>
    subheadingUsData.subheading.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: highlights.subheading.includes(cleanedWord),
      }
    }),
  )

  const formattedMission = computed(() =>
    missionUsData.mission.split(/(\s+)/).map((word) => {
      const cleanedWord = word.replace(/[.,!?]/g, '')
      return {
        text: word,
        highlight: highlights.mission.includes(cleanedWord),
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
