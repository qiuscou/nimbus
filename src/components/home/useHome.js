import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useHome() {
  const router = useRouter()
  const activeButton = ref('all_files')
  const selectedFileType = ref('')
  const isHomePage = ref(router.currentRoute.value.path === '/')

  const goToNewPage = (page) => {
    router.push({ name: page })
  }

  const goToTariff = () => {
    router.push('/').then(() => {
      const tariffSection = document.getElementById('app-tariff')
      if (tariffSection) {
        tariffSection.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }

  watch(router.currentRoute, (to) => {
    isHomePage.value = to.path === '/'
  })

  return {
    activeButton,
    selectedFileType,
    isHomePage,
    goToNewPage,
    goToTariff,
  }
}
