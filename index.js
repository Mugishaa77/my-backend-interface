const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const register = require('./routes/register');
const login = require('./routes/login');
const productsRoute = require('./routes/products');
const grocerProductsRoute = require('./routes/grocerProducts');




const app = express();

const products = require('./products');
const { GrocerProduct } = require('./models/grocerProduct');
require("dotenv").config()

app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("api/products", productsRoute);
app.use("api/grocerProducts", grocerProductsRoute);

app.get('/', (req, res) => {
  res.send('Welcome to Evergreen');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('./grocerProducts', (req, res) => {
  res.send(grocerProductsRoute);
})

const port = process.env.PORT || 5000;
const uri = process.env.DB_URI
const backendApiUrl = process.env.BACKEND_API_URL;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


fetch(`${backendApiUrl}/api/my-endpoint`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));