const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('TIme', Date.now());
    next()
})

const myMiddleware = (req,res, next) => {
    // 1. LOGIC
    console.log("Koi aya toh waht to do ???");

    // 2. Faisla (Decision)
    // or just send the response here and end it 

    // YA fir agle bande ko pass kardo system 
    next()

}