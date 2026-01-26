const express = require('express')
const app = express()

// middlewares

const blockDelete = (req, res, next) => {
    const method = req.method

    if(method === "DELETE"){
        res.status(405).json({error: "405 Method not Allowed!!!"})
    } else {
        next()
        console.log("next executed nigga");
    }
}

// logger middleware
const logger = (req, res, next) => {
    // get the url 
    const url = req.url

    // also get the method
    const method = req.method

    // now log the shit on the terminal 
    console.log(`The url : ${url} and the Method : ${method}`);

    next()
}

// use the middleware
app.use(logger)


app.use(blockDelete)


// routes 

app.delete('/remove', (req, res) => {
    console.log("Deleted your chick mfk!!!");

    res.send("This will never be reached.")
})

app.get("/data", (req, res) => {
    res.send("Here's your data sir!!!")
})

app.get('/status', (req, res) => {
    res.send("i am alive budddyyyyy!!!!")
})


app.listen(3000, () => {
    console.log("Heyy!!! we are listening you sir !!!");
})