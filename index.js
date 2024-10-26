import express from "express"


const app = express()


const port = 3000
app.use(express.json());//to accept any data which comes in json format by POST or GET method


let teaData = []
let nextId = 1


//add a Tea
app.post('/teas', (req, res) => {
    const { name, price } = req.body
    let newTea = { id: nextId++, name, price }
    teaData.push(newTea)
    res.status(201).send(newTea)
})


//Get all tea
app.get('/teas', (req, res) => {
    res.status(201).send(teaData)
})


//if anything comes from body we use req.body and if anything comes from URL we use req.params
//req.params gives a string so to compare we parse it to int  here

//Get a tea with ID
app.get('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    res.status(200).send(tea)
})

//update tea
app.put('/teas/:id', (req, res) => {
    const tea = teaData.find(t => t.id === parseInt(req.params.id))
    if (!tea) {
        return res.status(404).send("Tea not found")
    }
    const { name, price } = req.body
    tea.name = name
    tea.price = price
    res.status(200).send(tea)
})

//delete a tea
app.delete('/teas/:id', (req, res) => {
    const Index = teaData.findIndex(t => t.id === parseInt(req.params.id))
    if (Index == -1) {
        return res.status(404).send('tea not found')
    }
    teaData.splice(Index, 1)
    res.status(204).send("Tea Deleted")
})

// app.get("/", (req, res) => {
//     res.send("Hello")
// })

// app.get("/login", (req, res) => {
//     res.send("User logged in")
// })

app.listen(port, () => {
    console.log(`Server is listening at port ${port}.....`);

})
