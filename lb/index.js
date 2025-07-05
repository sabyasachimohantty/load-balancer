import express from 'express'

const app = express()

const servers = [
    { url: 'http://localhost:3000', healthy: true },
    { url: 'http://localhost:3001', healthy: true },
    { url: 'http://localhost:3002', healthy: true },
]

let currentIndex = 0

function getNextServer() {
    let healthyServers = servers.filter(server => server.healthy)
    if (healthyServers.length === 0) {
        return null
    }
    const server = servers[currentIndex]
    currentIndex = (currentIndex + 1) % healthyServers.length
    return server.url
} 

async function healthCheck(server) {
    try {
        const response = await fetch(`${server.url}/health`)
        server.healthy = response.status === 200 ? true : false
        console.log(`${server.url} health check: ${server.healthy ? 'Healthy' : 'Unhealthy'}`)
    } catch (error) {
        server.healthy = false
        console.error(`${server.url} health check failed: ${error.message}`)
    }
}

// Cron job for health check
setInterval(() => {
    servers.forEach(healthCheck)
}, 5000)

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