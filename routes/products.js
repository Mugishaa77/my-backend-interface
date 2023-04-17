const express = require("express");
const mongoose = require("mongoose");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();
const uri = process.env.DB_URI

// connecting to mongoDB
// 

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Sally's new connection successful..."))
.catch((err) => console.log("Sally's new connection failed...", err.message))

//  Get a reference to your products collection
const { Product } = require("../models/product");
const productsCollection = Product.collection;

// create
router.post("/", async (req, res) => {
  const { name, price, category, info, measurement, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "farmersMarket",
      });

      // insert a new product document into your products collection
      const result = await productsCollection.insertOne({
        name,
        price,
        category,
        info,
        measurement,
        image: uploadRes.url,
      });

      // create a new Product instance with the uploaded image URL
      const product = new Product({
        name,
        price,
        category,
        info,
        measurement,
        image: uploadRes.url,
      });

      // save the new product to the database
       const savedProduct = result.ops[0];

      res.status(200).send(savedProduct);
    } else {
      res.status(400).send("No image provided");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// read
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send(products);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;