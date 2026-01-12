const { error } = require('console')
const express = require('express')
const fs = require('fs/promises')
const { type } = require('os')

const app = express()

app.use(express.json())

// path of the file 
const DATA_FILE = './todos.json'

// disk me data is in json string btw



// write the get request nigga

app.get('/todos', async (req, res) => {
    try {
        // read the file first 
        const data = await fs.readFile(DATA_FILE, 'utf-8')        
        console.log(typeof data);   //its string so we have to convert it into json object arr (idkd if thats waht we call it)

        const parsedData = JSON.parse(data)

        // now send this data to those users
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

        if(!req.body.name) {
            return res.status(400).json(
                {
                    error: "atleast send your name buddy!!!"
                }
            )
        }

        // now get the user ka data new 
        const newData = req.body

        console.log(typeof newData); //object

        // as its object so itsko directly oldata mepush karodo then usko string banake write karo ig 

        parseDataArray.push(newData)

        // now stringfy this parseDataArray and aage badho
        const finalData = JSON.stringify(parseDataArray, null, 2)

        await fs.writeFile(DATA_FILE, finalData)

        res.send({
            message: "we got your data!! thanks!!!",
            data: req.body
        })
    } catch (error) {
        res.status(500).send({
            error: "There was some problem while writing data!!! !!"
        })
    }
})



// delete request likho bc 
app.delete('/todos', async (req, res) => {
    try {

        // first get the name from the request
        const name = req.body.name  //string

        // cehck ki name bheja bsdk ya nhi 
        if(!name) {
            return res.status(400).json({error: "Please tell your name !!"})
        }

        // get the old arr data by reading it 
        const data = await fs.readFile(DATA_FILE, 'utf-8')  //string

        // conver tthis into json object arr
        const dataArr = JSON.parse(data)

        // filter the arr nigga

        const filteredData = dataArr.filter((item) => item.name !== name)

        if(dataArr.length == filteredData.length) {
            return res.status(404).json({error: "this guy is not in the list"})
        }

        // stringy this json object arr
        const stringiFiedData = JSON.stringify(filteredData, null, 2)

        // now rewrite the json file with this updated data

        await fs.writeFile(DATA_FILE, stringiFiedData)

        res.send({
            message: "task deleted"
        })

    } catch (error) {
        res.status(500).send({
            error: "There's some error."
        })
    }
})

//write put request 

app.put('/todos', async (req, res) => {
    try {
        // first get the name/title form the body
        const targetName = req.body.name
        const newDetails = req.body;
        
        // check fi the name is empty ya kuch hai bhi us me 
        if(!targetName) {
            return res.status(400).json({error: "atleast send some data for god sake!!!"})
        }

        // now get the old data please
        const oldDataString = await fs.readFile(DATA_FILE, 'utf-8')

        // parse it into json arr 
        let todos = JSON.parse(oldDataString)

        let found = false

        // now go through this arr and match if the name exist or not 
        todos = todos.map((item) => {
            if(item.name == targetName) {
                found = true
                return {...item, ...newDetails}
            }
            return item
        })

        // agar manlo bnda mila hi nhai toh????
        if(!found) {
            return res.status(400).json({error: "Couldn't found the guy!!! Sorry!!!"})
        }

        // convert the todos data arr into a string
        const todosString = JSON.stringify(todos, null, 2)

        // now write the updated todo in the db 
        await fs.writeFile(DATA_FILE, todosString)

        res.json({
            message: "Details sucessfully updated!!!",
            updatedData: newDetails
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error. Update Failed....Sorry!!!"})
    }
})

const PORT = 3000


app.listen(3000, () => {
    console.log("We are listening youu!!! ");
})