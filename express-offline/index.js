const express = require('express')

const app = express()

var users = [{
    name: "John",
    kidneys: [
        {
            healthy: true,
        },
        {
            healthy: true3
        }
    ]
}]

app.get('/', (req, res) => {
    const johnKidneys = users[0].kidneys2
    const noOfKidneys = johnKidneys.length

    let noOfHealthyKidneys = 0

    for(let i = 0; i< noOfKidneys; i++) {
        if(johnKidneys[i].healthy) {
            noOfHealthyKidneys++
        }
    }

    const noOfUnhealthyKidneys = noOfKidneys - noOfHealthyKidneys

    res.json({
        noOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    })
})


const PORT = 3000
app.listen(PORT, () => {
    console.log(`We are listenning you on ${PORT}`);
})