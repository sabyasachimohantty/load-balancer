import express from 'express'

const app = express()

app.get('/', async (req, res) => {
    // console.log(`
    //   Received request from ${req.ip} 
    //   ${req.method} ${req.path} HTTP/${req.httpVersion}
    //   Host: ${req.headers['host']}
    //   User-Agent: ${req.headers['user-agent']} 
    //   Accept: ${req.headers['accept']}
    // `)
    
    try {
        const response = await fetch('http://localhost:3000')
        const data = await response.json()
        res.send(data.mssg)
    } catch (error) {
        console.log(error)
    }
})

app.listen(8080, (error) => {
    if (error) {
        console.log(error)
        return
    }
    console.log(`The lb is running on port 8080`)
})