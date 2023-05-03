const express = require("express");
const cloudinary = require("../utils/cloudinary");
const router = express.Router();
const { Product } = require("../models/product");
const { mongoose } = require("../db");
// 

// create
router.post("/", async (req, res) => {
  console.log('products route is being called')
  const { name, price, category, info, measurement, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "farmersMarket",
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
      const savedProduct = await product.save();

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
