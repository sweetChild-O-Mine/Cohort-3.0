const express = require('express')

const app = express()

app.use(express.json())

let todos = []



// create the post req
// post req is for the data send by the user....so basically the user is sending something 
// app.post('/test', function(req, res) {
//     // extract the ccontent form the req 
//     const data = req.body
//     console.log(data);

//     // now put this data into your todos arr
//     todos.push(data)

    

//     res.send("Recieved you data!!")
//     console.log(todos);
// })

app.post('/', (req, res) => {
    // get the data from the req body 
    const data = req.body
    // generate random id for this mfker
    const id = Math.random()*1000

    // create the object for thus mfker 
    const userData = {
        id: id,
        title : data.title,
        completed: false
    }

    todos.push(userData)

    // user ko btao toh ki uske data ka system ho gya
    res.send("Got you data budyy")
    console.log(`Got this data for ${id}`);
    console.log(todos);

})


// create a get request (user is dmeanding something mtlb humne kuch bhejna padega)

app.get('/', function(req, res) {
    console.log("Here' your data: ",todos);
    res.json(todos)
})


// do the update operatoin nigga
// and for that we'll use pur request 
app.put('/', (req, res) => {
    // get the di from the req
    const id = req.body.id
    let found = false

    for(let i = 0; i<todos.length; i++) {
        if(todos[i].id == id) {
            todos[i].completed = true;
            found = true;
            console.log(todos);
            return res.send('Mkaed as done')
        }
    }

    res.status(404).send("ID doesn't match")
})

app.delete('/', (req, res) => {
    const idToDelete = req.body.id

    todos = todos.filter((item) => String(item.id) !== String(idToDelete))

    console.log('updated Todo:', todos);

    res.send(`Task ${idToDelete} is deleted!!!`)
})



app.listen(3000)
