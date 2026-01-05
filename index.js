const fs = require('fs')

// this funtion says ki read the fil async ly and when its read then execute the callback functoin
fs.readFile("a.txt", 'utf-8', function (err, data) {
    console.log(data);
})



const express = require('express')

const app = express()

// in the same way it says 
// create a fresh of the express
// iske baad define all of your route handlers

// ki if a request comes on '/'(Slash) endpoint then what should happen
app.get('/', function(req, res) {
    // so basically when a get request comes to slash endpoint then is code ko run karo dena which is being passed as the callback 
    res.send('Hello World!!')
})


app.get('/asd', function(req, res) {
    // so basically when a get request comes to slash endpoint then is code ko run karo dena which is being passed as the callback 

    // here the res and req are basiclaly for the server or backend so basically here we are saying 
    /* 
    that hey dudee listen....whenever you want to acess some data from the frontend then use req....

    and whenever frontend ask something you gotta give response then use res object...

    thes req and res objects are actually provided by the express library....
    */
    res.send('Hello from the ASD')
})


// on which port our app should listen to
app.listen(3000)

console.log("nvim says hii");