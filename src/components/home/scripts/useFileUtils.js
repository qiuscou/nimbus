import image from '@/assets/elements/image.svg'
import data from '@/assets/elements/data.svg'
import headphones from '@/assets/elements/headphones.svg'

const ICON_MAP = {
  'image/': image,
  'application/pdf': data,
  'application/msword': data,
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': data,
  'text/': data,
  'audio/': headphones,
  'video/': data,
  'application/zip': data,
}

export function createFileData(file) {
  const base = {
    file,
    name: file.name,
    type: file.type,
    size: file.size,
    lastModified: file.lastModified,
    isFavorited: false,
    isTrashed: false,
    uploadedAt: Date.now(),
  }
  if (file.type.startsWith('image/')) {
    base.preview = URL.createObjectURL(file)
  }
  return base
}

export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

export function getFileIcon(fileType) {
  if (!fileType) return ICON_MAP['application/pdf']
  for (const prefix in ICON_MAP) {
    if (fileType.startsWith(prefix)) return ICON_MAP[prefix]
  }
  return ICON_MAP['application/pdf']
}
