const express = require("express");
const { Product } = require("../models/product");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

//create

router.post("/", async(req, res) => {

    const {name, price, category, info, measurement, image} = req.body;

    try {
        if(image){
           const uploadRes = await cloudinary.uploader.upload(image, {
             upload_preset: "farmersMarket"

           });

           if(uploadRes){
            constProduct = new Product({
                name, 
                price,
                category,
                measurement,
                info,
                image: uploadRes
            });

            const savedProduct = await product.save ()

            res.status(200).send(savedProduct);
           } 

        }
    }catch(error){
        console.log(error)

        res.status(500).send(error);

    }

})

router.get("/", async(req, res) => {

    try {
         const products = await Product.find()
         res.status(200).send(products)

    } catch(error) {

        console.log(error)
        res.status(500).send(error);


    }
     
   
})

module.exports = router