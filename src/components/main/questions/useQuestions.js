import { reactive } from 'vue'
import { QUESTIONS_CONSTANTS } from './constants'

export function useQuestions() {
  const questions = reactive(
    Object.fromEntries(
      Object.entries(QUESTIONS_CONSTANTS.questions).map(([key, value]) => [
        key,
        { ...value, isExpanded: false },
      ]),
    ),
  )

  const toggleExpand = (key) => {
    questions[key].isExpanded = !questions[key].isExpanded
  }

  return {
    questions,
    toggleExpand,
  }
}
