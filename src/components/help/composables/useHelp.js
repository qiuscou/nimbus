import { ref, computed } from 'vue'
import { PROBLEMS, RESPONSE } from './constants'

export function useHelp() {
  const selectedProblem = ref('')

  const responseHeader = computed(() => selectedProblem.value || RESPONSE.response)

  const responseContent = computed(() =>
    selectedProblem.value ? PROBLEMS[selectedProblem.value] : RESPONSE.response,
  )

  const selectProblem = (problem) => {
    selectedProblem.value = problem
  }

  return {
    responseHeader,
    responseContent,
    selectProblem,
  }
}
