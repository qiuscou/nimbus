export function useFileActions(loadFilesFromServer) {
  const deleteFile = async (file) => {
    await fetch(`/api/files/${file.filename}`, { method: 'DELETE' })
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
    const states = JSON.parse(localStorage.getItem('fileStates') || '{}')
    states[file.filename] = states[file.filename] || {}
    states[file.filename].isFavorited = file.isFavorited
    localStorage.setItem('fileStates', JSON.stringify(states))
  }

  const moveToTrash = async (file) => {
    const res = await fetch('/api/files/trash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.filename,
        isTrashed: true,
      }),
    })
    const { isTrashed } = await res.json()
    file.isTrashed = isTrashed
    const states = JSON.parse(localStorage.getItem('fileStates') || '{}')
    states[file.filename] = states[file.filename] || {}
    states[file.filename].isFavorited = file.isFavorited
    localStorage.setItem('fileStates', JSON.stringify(states))
  }

  const restoreFromTrash = async (file) => {
    const res = await fetch('/api/files/trash', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        filename: file.filename,
        isTrashed: false,
      }),
    })
    const { isTrashed } = await res.json()
    file.isTrashed = isTrashed
    const states = JSON.parse(localStorage.getItem('fileStates') || '{}')
    states[file.filename] = states[file.filename] || {}
    states[file.filename].isFavorited = file.isFavorited
    localStorage.setItem('fileStates', JSON.stringify(states))
  }

  return { restoreFromTrash, moveToTrash, toggleFavorite, deleteFile }
}
