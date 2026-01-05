const express = require('express')
const fs = require('fs/promises')

const app = express()

app.use(express.json())

// path of the file 
const DATA_FILE = './todos.json'



// write the get request nigga

app.get('/todos', async (req, res) => {
    try {
        // read the file first 
        const data = await fs.readFile(DATA_FILE, 'utf-8')        
        console.log(typeof data);   //its string so we have to convert it into json object arr (idkd if thats waht we call it)

        const parsedData = JSON.parse(data)

        // now send this data to those mfking users
        res.send(parsedData)

    } catch (error) {
        res.status(500).send({
            "Error" : "Couldn't find the stuff sorry"
        })
    }
})

// write post reqeust sir 
app.post("/todos", async (req,res) => {
    // basic idea is fs.writeFIle will rewrite everything toh purane users ki thodi lg jayegi lanka for that reason we will first get the old data by reading the file and usko arr me convert kardegne...then
    // we will get the user ka new data using req.body and usko arr me convert karke arr me push kardenge then final chiz ko string meconvert karke sidha write kar denge
    try {
        // get the old data first by reading the disk
        const oldData = await fs.readFile(DATA_FILE, 'utf-8')

        // parse this string json into json object arr
        const parseDataArray = JSON.parse(oldData)

        // now get the user ka data new 


    } catch (error) {
        
    }
})

app.listen(3000, () => console.log("We are listening you !!!"))