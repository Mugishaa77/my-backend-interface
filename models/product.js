const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
    name: {type: String, required:true},
    price: {type: Number, required: true},
    category: {type: String, required:true},
    info: {type: String},
    measurement: {type: String, required:true},
    image: {type: Object, required: true}
}, {
    timestamps: true
});
// 

const Product = mongoose.model("Product", productSchema);

exports.Product = Product;



