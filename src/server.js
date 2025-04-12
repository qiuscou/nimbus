import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import os from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000
const HOST = '0.0.0.0'

app.use(express.static(join(__dirname, 'dist')))

app.get('/user/:id', (req, res) => {
  res.send(`User ID is: ${req.params.id}`)
})

app.get(/\/(.*)/, (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'))
})

app.listen(PORT, HOST, () => {
  console.log(`Server running on:
  - http://localhost:${PORT}
  - http://${getLocalIpAddress()}:${PORT}`)
})

function getLocalIpAddress() {
  const interfaces = os.networkInterfaces()
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
  return 'localhost'
}
