const express = require("express");
const { GrocerProduct } = require("../models/grocerProduct");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

// create a grocer product
router.post("/", async (req, res) => {
  const { name, price, category, info, measurement, image } = req.body;

  try {
    if (image) {
      const uploadRes = await cloudinary.uploader.upload(image, {
        upload_preset: "farmersMarket",
      });

      // create a new GrocerProduct instance with the uploaded image URL
      const grocerProduct = new GrocerProduct({
        name,
        price,
        category,
        info,
        measurement,
        image: uploadRes.url,
      });

      // save the new grocer product to the database
      const savedGrocerProduct = await grocerProduct.save();

      res.status(200).send(savedGrocerProduct);
    } else {
      res.status(400).send("No image provided");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

// get all grocer products
router.get("/", async (req, res) => {
  try {
    const grocerProducts = await GrocerProduct.find();
    res.status(200).send(grocerProducts);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;

