import express from 'express'

const app = express()

const servers = [
    'http://localhost:3000',
    'http://localhost:3001',
]

let currentIndex = 0

function getNextServer() {
    const server = servers[currentIndex]
    currentIndex = (currentIndex + 1) % servers.length
    return server
}   

app.use(async (req, res, next) => {

    const server = getNextServer()
    
    try {
        const backendUrl = `${server}${req.url}`
        const options = {
            method: req.method,
            headers: req.headers
        }
        const response = await fetch(backendUrl, options)
        const data = await response.json()
        res.status(response.status).send(data.mssg)
        next()
    } catch (error) {
        console.log(error)
    }
})

app.listen(8000, (error) => {
    if (error) {
        console.log(error)
        return
    }
    console.log(`The lb is running on port 8000`)
})