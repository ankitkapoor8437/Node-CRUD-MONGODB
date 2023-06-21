const express = require('express')
const app = express()
// Contains the Schema of the Product DB.
const Product = require('../nodejs-mongo-crud/models/projectModel')
const mongoose = require('mongoose')


app.use(express.json())
// routes
app.get('/', (req, res) => {
    res.send("Hello Node API")
})

app.get('/about', (req, res) => {
    res.send("This is a about page.")
})

// POST API
// How to Post data
app.post('/products', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// GET API
// How to Fetch data
app.get('/products', async (req, res) => {
    try {
        const product = await Product.find({});
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// How to Fetch data by Id
app.get('/products/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


// PUT API
// How to Update Data
app.put('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if not find
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


// DELETE API
// How to Delete a data
app.delete('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: `Cannot find any product with ID ${id}` })
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json({ message: `Deleted successfully`, product })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})

// Connection with the DB.
mongoose
    .connect('mongodb+srv://ankitkapoor8437:Zxcvbn_8437@crud.arhlgta.mongodb.net/Node-Api?retryWrites=true&w=majority')
    .then(() => {
        app.listen(3000, () => {
            console.log(`App is running on port 3000`)
        })
        console.log('Connected to DB')
    }).catch((error) => {
        console.log(error)
    })