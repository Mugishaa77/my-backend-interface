const express = require("express");
const { Product } = require("../models/product");
const cloudinary = require("../utils/cloudinary");

const router = express.Router();

//create

router.post("/", async(req, res) => {

    const {name, price, image} = req.body;

    try {
        if(image){
           const uploadRes = await cloudinary.uploader.upload(image, {
             upload_preset: "farmersMarket"

           });

           if(uploadRes){
            constProduct = new Product({
                name, 
                price,
                image: uploadRes
            });

            const savedProduct = await product.save ()

            req.statusCode(200).send(savedProduct);
           } 

        }
    }catch(error){
        console.log(error)

        res.status(500).send(error);

    }

})

module.exports = router