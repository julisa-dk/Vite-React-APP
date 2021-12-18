const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express(); //run express as a function and set result in the variable
app.use(bodyParser.json());

//initialase MongoDB
mongoose.connect("mongodb://localhost/react-shopping-cart-db");

//define model and it accept two parameters (name of collection inside in db and list of fields)
const Product = mongoose.model(
    "products", 
    new mongoose.Schema({
        _id: { type: String, default: shortid.generate },  
        //when we create new product, in "shortid" generate new id for this product and set in _id
        title: String,
        description: String,
        image: String,
        price: Number,
        availableSize: [String],
})
);

// end point
app.get("/api/products", async (req, res) => {      // async / await use for get real data
    const products = await Product.find({});   //the "find" is a promise to get a real data
    res.send(products);  //send to client
});

// go to create product
app.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);  //when we send data from frontend newProduct get all data 
    const savedProduct = await newProduct.save();  //save product inside in db
    res.send(savedProduct);
});

app.delete("/api/products/:id", async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

// create express server to listen the port and launch the server
// define the port
const port = process.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"));