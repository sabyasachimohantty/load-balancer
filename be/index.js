import express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.status(200).json({mssg: `Hello from Backend Server\n`})  
})

app.listen(3000, (error) => {
    if (error) {
        console.log(error)
        return
    }
    console.log(`Server is successfully running on port 3000`)
})