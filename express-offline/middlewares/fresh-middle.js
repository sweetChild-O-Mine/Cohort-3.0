const express = require('express')
const app = express()

// define the middlware

// loggerMiddleware
const loggerMiddleware = (req, res, next) => {

    // 1. checking the main logic here
    const date = new Date()
    // will give you the method
    const method = req.method

    const url = req.url

    const ipAddress = req.ip

    // 2. so called modify 
    console.log(`on ${date} ${method} request came on : ${url}, client ip : ${ipAddress}`);

    // 3. Decide  next() or res.send()
    next()
}

// Age check middlware
const ageCheck = (req, res, next) => {

    const url = req.url
    const age = req.query.age
    const isAdmin = req.query.admin
    
    // if admin exist then let him go irrespetive of his age
    if(isAdmin) {
        next()
    } else if (age >= 18 ) {
        next()
    } else {
        res.json({msg: "Sorry kiddo this website ain't for yaaaa!!!!"})
    }
    console.log("ageChecck executed");
}



// use themiddlewar

app.use(loggerMiddleware)
app.use(express.json())

// now the write the endepoints
app.get('/vip', (req, res) => {
    res.send('Welcome toe the vip lounge bhai')
})

app.get('/', (req, res) => {
    res.send("Home page allowed you my brother")
})

app.get('/home', (req, res) => {
    res.send("Hii...we welcome you on the database!!!")
})

// also put middleware for this speicifc route only 
app.get('/ride', ageCheck, (req, res) => {
    res.send("Welcome to the site guysss!!!!")
})

app.get('/dashboard', ageCheck, (req, res) => {
    res.send("Hii Admin..no ahh ahha ahh")
})


// post route for pw
app.post('/login', (req, res) => {
    console.log(req.body);
    res.send(`User ${req.body.name} logged in!!!`)
})


app.get('/crash', (req, res) => {
    const user = undefined
    console.log(user.name);
    throw new Error("Code Phat gaya!!!")
    res.send("Ye kabhi print nahi hoga")
})


// gloabl error handler
const gloabalCatch = (err, req, res, next) => {
    console.log("Got these error: ", err.message);
    res.status(500).json({
        msg: "Server aint really working so can you comeback after some Time 🥺!!!",
        error: "Something went wrong"
    })
}

app.use(gloabalCatch)

app.listen(3000, () => {
    console.log("Server is running babe!!!");
})

