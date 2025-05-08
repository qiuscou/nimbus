import { reactive } from 'vue'

export function useQuestions() {
  const questions = reactive({
    support: {
      title: 'Как связаться с техподдержкой?',
      answer: 'Связаться с нами можно через раздел «Помощь» или по эл. почте support@nimbus.com.',
      isExpanded: false,
    },
    defense: {
      title: 'Насколько защищены мои данные?',
      answer:
        'Мы используем современные методы шифрования и защиты данных, чтобы обеспечить безопасность информации пользователей.',
      isExpanded: false,
    },
    payment: {
      title: 'Какие методы оплаты вы принимаете?',
      answer: 'Мы принимаем карты платёжной системы МИР, а также оплату через СБП.',
      isExpanded: false,
    },
    volume: {
      title: 'Как увеличить объем доступного хранилища?',
      answer:
        'Чтобы расширить объем хранилища, перейдите в раздел «Тариф» и выберите подходящий план.',
      isExpanded: false,
    },
  })

  const toggleExpand = (key) => {
    questions[key].isExpanded = !questions[key].isExpanded
  }

  return {
    questions,
    toggleExpand,
  }
}
