export const SIDE_PANEL_CONSTANTS = {
  all_files: 'Все файлы',
  gallery: 'Галерея',
  favorites: 'Избранное',
  recents: 'Недавние',
  trash: 'Корзина',
  account: 'Аккаунт',
  help: 'Помощь',
  tariff: 'Тариф',
}

export const SEARCH_PANEL_CONSTANTS = {
  search: 'Поиск по облаку',
  button: 'Найти',
  file_type: 'Тип файла',
  file_types: ['Изображения', 'Документы', 'Музыка', 'Видео'],
}

export const UPLOADED_FILES_CONSTANTS = {
  empty_state: 'Перетащите файлы сюда',
  unable_to_display_content: 'Невозможно отобразить содержимое',
}

export const FILE_TYPE_MAPPING = {
  Изображения: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  Документы: [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // Word (docx)
    'application/msword', // Word (doc)
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // Excel (xlsx)
    'application/vnd.ms-excel', // Excel (xls)
    'application/vnd.openxmlformats-officedocument.presentationml.presentation', // PowerPoint (pptx)
    'application/vnd.ms-powerpoint', // PowerPoint (ppt)
  ],
  Музыка: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
  Видео: ['video/mp4', 'video/quicktime', 'video/x-msvideo'],
}
