import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

export function useNavigation() {
  const router = useRouter()
  const isHomePage = ref(router.currentRoute.value.path === '/')

  watch(
    () => router.currentRoute.value.path,
    (path) => {
      isHomePage.value = path === '/'
    },
  )

  const goToNewPage = (page) => router.push({ name: page })

  const goToTariff = () => {
    router.push('/').then(() => {
      const tariffSection = document.getElementById('app-tariff')
      if (tariffSection) tariffSection.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const openFileDialog = () => document.querySelector('input[type="file"]')?.click()

  return { isHomePage, goToNewPage, goToTariff, openFileDialog }
}
