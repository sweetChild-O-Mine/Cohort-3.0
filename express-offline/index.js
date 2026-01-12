const express = require('express')

const app = express()

var users = [{
    name: "John",
    kidneys: [
        {
            healthy: true,
        },
        {
            healthy: false
        }
    ]
}]





app.get('/', (req, res) => {
    const johnKidneys = users[i].kidneys.length
    const noOfKidneys = johnKidneys.length

    let noOfHealthyKidneys = 0

    for(let i = 0; i< noOfKidneys; i++)

    res.send(ans) 

})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`We are listenning you on ${PORT}`);
})