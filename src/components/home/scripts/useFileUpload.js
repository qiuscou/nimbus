import { ref, onMounted } from 'vue'
import { createFileData } from './useFileUtils'

export function useFileUpload() {
  const uploadedFiles = ref([])

  const loadFilesFromServer = async () => {
    const res = await fetch('/api/files')
    const { files } = await res.json()

    const savedStates = JSON.parse(localStorage.getItem('fileStates') || '{}')

    uploadedFiles.value = files.map((f) => {
      const dummyFile = new File([], f.originalName, {
        type: f.type,
        lastModified: f.lastModified || Date.now(),
      })

      const base = {
        ...createFileData(dummyFile),
        filename: f.filename,
        isFavorited: f.isFavorited,
        isTrashed: f.isTrashed,
        preview: f.url,
        url: f.url,
      }

      if (savedStates[f.filename]) {
        base.isFavorited = savedStates[f.filename].isFavorited
        base.isTrashed = savedStates[f.filename].isTrashed
      }

      return base
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
