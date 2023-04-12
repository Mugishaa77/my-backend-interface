// Require the Mongoose library
const mongoose = require("mongoose");

// Define the schema for the grocer product
const grocerProductSchema = new mongoose.Schema(
    {
        // Define the name field with type String and make it required
        name: {type: String, required:true},
        // Define the price field with type Number and make it required
        price: {type: Number, required: true},
        // Define the category field with type String and make it required
        category: {type: String, required:true},
        // Define the info field with type String
        info: {type: String},
        // Define the measurement field with type String and make it required
        measurement: {type: String, required:true},
        // Define the image field with type Object and make it required
        image: {type: Object, required: true}
    }, 
    // Add timestamps to the schema
    {
        timestamps: true
    }
);

// Create a model for the grocer product using the schema
const grocerProduct = mongoose.model("GrocerProduct", grocerProductSchema);

// Export the grocer product model
exports.GrocerProduct = grocerProduct;
