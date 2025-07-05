import express from 'express'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.status(200).json({ mssg: `Hello from Backend Server running on port ${PORT}\n` })
})

app.get('/health', (req, res) => {
  res.status(200).send('Server is healthy')
})

app.listen(PORT, (error) => {
  if (error) {
    console.log(error)
    return
  }
  console.log(`Server is successfully running on port ${PORT}`)
})