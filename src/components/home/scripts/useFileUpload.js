import { ref, onMounted } from 'vue'
import { createFileData } from './useFileUtils'

export function useFileUpload() {
  const uploadedFiles = ref([])

  const loadFilesFromServer = async () => {
    const res = await fetch('/api/files')
    const { files } = await res.json()
    uploadedFiles.value = files.map((f) => ({
      ...createFileData({
        name: f.originalName,
        type: '',
        size: 0,
        lastModified: 0,
      }),
      filename: f.filename,
      isFavorited: f.isFavorited,
      isTrashed: f.isTrashed,
      preview: f.url,
      url: f.url,
    }))
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
