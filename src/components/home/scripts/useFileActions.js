export function useFileActions(loadFilesFromServer) {
  const deleteFile = async (file) => {
    await fetch(`/api/files/${file.filename}`, { method: 'DELETE' })
    await loadFilesFromServer()
  }

  const restoreFiles = async (filenames) => {
    await fetch('/api/files/restore', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filenames }),
    })
    await loadFilesFromServer()
  }

  const toggleFavorite = async (file) => {
    const res = await fetch('/api/files/favorite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.filename }),
    })
    const { isFavorited } = await res.json()
    file.isFavorited = isFavorited
  }

  return { deleteFile, restoreFiles, toggleFavorite }
}
