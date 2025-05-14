import { ref, onMounted } from 'vue'
import { createFileData } from './useFileUtils'

export function useFileUpload() {
  const uploadedFiles = ref([])

  const loadFilesFromServer = async () => {
    const res = await fetch('/api/files')
    const { files } = await res.json()

    uploadedFiles.value = files.map((f) => {
      const dummyFile = new File([], f.originalName, {
        type: f.type || getMimeTypeFromName(f.originalName),
        lastModified: f.lastModified || Date.now(),
      })

      return {
        ...createFileData(dummyFile),
        filename: f.filename,
        isFavorited: f.isFavorited,
        isTrashed: f.isTrashed,
        preview: f.url,
        url: f.url,
      }
    })
  }

  function getMimeTypeFromName(filename) {
    const ext = filename.split('.').pop().toLowerCase()
    const mimeMap = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      pdf: 'application/pdf',
    }
    return mimeMap[ext] || 'application/octet-stream'
  }

  const uploadToServer = async (fileDataArray) => {
    const formData = new FormData()
    fileDataArray.forEach(({ file }) => formData.append('files', file))
    await fetch('/api/upload', { method: 'POST', body: formData })
    await loadFilesFromServer()
  }

  onMounted(loadFilesFromServer)

  return { uploadedFiles, loadFilesFromServer, uploadToServer }
}
