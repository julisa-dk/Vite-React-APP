const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
const fastify = require('fastify')({ logger: true });

const app = async () => {
    try{
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }       
}

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
app();

fastify.get('/api/products', async (req, res) => {
    const products = await Product.find({});   //the "find" is a promise to get a real data
    res.send(products);
});

fastify.post("/api/products", async (req, res) => {
    const newProduct = new Product(req.body);  //when we send data from frontend newProduct get all data 
    const savedProduct = await newProduct.save();  //save product inside in db
    res.send(savedProduct);
});