const express = require('express')
const app = express()

let noOfRequestsForUser = {}
console.log(noOfRequestsForUser);

//
/*
🧠 Concept: "Req Object ek Jhole ki tarah hai"
Middleware sirf check nahi karta, wo req object ke andar naya saaman (data) daal bhi sakta hai.

Scenario: Ek User aata hai. Middleware check karta hai ki wo kaun hai, aur uska username nikaal ke req.username me daal deta hai. Taaki aage wale route ko DB call na karni pade, usko bana-banaya username mil jaye.

Syntax:- 
const modifier = (req, res, next) => {
    req.customData = "Ye maine chipkaya hai"; // Data attach kiya
    next();
}
*/

// middlewares
const addRequestId = (req, res, next) => {
    // generate a random no. 
    const id = Math.floor(Math.random()*10000)

    // save this into some id 
    req.id = id

    // log the things
    console.log(`Request started with the ID: ${req.id} `);

    next()
}

const validateInput = (req, res, next) => {
    // checck if they've given valid thigs or not 
    if(req.body.a && req.body.b) {
        next()
    } else {
        res.status(400).send("Wrong Input!!!")
    }
}

const verifyToken = (req, res, next) => {
    // take the authoriazation from the header of user 
    const auth = req.headers.authorization

    // now condn (it can be anything im just putting some bullshit)
    if(auth === 'secret-key-123') {
        next()
    } else {
        res.status(401).send("Unauthorized: Bhaag yahan se")
    }
}

// Rate Limiter middleware 
const rateLimiter = (req, res, next) => {
    console.log(req.headers);
    const userID = req.headers["user-id"]
    if(!userID) {
        res.status(401).send({error: "You are blocked!!!...you dont have userID"})
    } else if(noOfRequestsForUser[userID]) {
        noOfRequestsForUser[userID]++;
    } else {
        noOfRequestsForUser[userID] = 1; // coz by defualt it would be undefined toh hum undefined me 1 add karenge agar toh woh NaN bn jayega which will fuck everything up
    }

    console.log("current Status: ", noOfRequestsForUser);

    if(noOfRequestsForUser[userID] > 5) {
        res.status(404).send("No entry")
        next()
    }

}

// use the middleware
app.use(express.json())

app.use(addRequestId)

// routes 
app.get('/track-me', (req, res) => {
    const requestId = req.id
    console.log(requestId);
    res.send(`Thanks for visiting us....your request id is ${requestId}`)
})


app.post('/sum', rateLimiter, validateInput, (req, res) => {
    const a = req.body.a
    const b = req.body.b
    res.send(`Sum is: ${a + b}`)
})

// idhar pr verifyToken laga denge coz its admin rout idhar sirf sahi bande ko andar aane ki perimission honi chahiye....sb log visit nhi kar skte is route ko...its special
app.post('/admin-dashboard', verifyToken, (req, res) => {
    console.log("admin-dashboard started");
    res.send('Welcome Admin! Here is the vault data.')
})

app.post('/public', (req, res) => {
    res.send("It's for everyone!!! you dont need to be authorized for this.")
})

app.listen(3000, () => {
    console.log("Heyy!!! we are listening you sir !!!");
})