// write a middleware to print the url of of every website ig 

const express = require('express')
const app = express()

// Middleware Funtion Definition
const loggerMiddleware = (req, res, next) => {
    const date = new Date().toISOString()
    const method = req.method   //will give you method of the request ...basically GET,POST
    const url = req.url     // /home, /login

    console.log(`[${date}] ${method} request came on: ${url}`);

    next()      //
}

// auth middleware
const checkTicket = (req, res, next) => {
    // Hum query param check karenge (e.g., localhost:3000/vip?ticket=true)
    const hasTicket = req.query.ticket 

    if(hasTicket === 'true') {
        next()
    } else {
        res.status(403).json({msg: "please stop sir....you dont have ticket to enter."})
    }
}


// mummy middleware
const mummyMiddleware = (req, res, next) => {
    const whatTime = req.query.time 

    if(whatTime !== 'night') {
        next()
    } else {
        res.status(403).send({'msg': "sojaaa saaaaleeeeeeeeeeee!!!!!!!!!"})
    }
}


// use the middleware nigga
// app.use(checkTicket)


// now use the middlware
app.use(loggerMiddleware)       //thats how u use a middleware

app.use(mummyMiddleware)

app.get('/vip', (req, res) => {
    res.send('Welcome to the VIP lounge! 🍸')
})


app.get('/', (req, res) => {
    res.send("Home page Guard ne allow kar diya")
})


app.get('/profile', (req, res) => {
    res.send('Profile Page')
})


app.get('/puttar', (req, res) => {
    res.send("Am studying sir!!!")
})


app.listen(3000, () => console.log("Server is running"))
