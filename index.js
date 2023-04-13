// extensions
const express = require('express');
const cors = require('cors');
const app = express();


// routes
const register = require('./routes/register');
const login = require('./routes/login');
const productsRoute = require('./routes/products');
const grocerProductsRoute = require('./routes/grocerProducts');


// root component
const products = require('./products');

// models
const { GrocerProduct } = require('./models/grocerProduct');
require("dotenv").config()

// api end-points
app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products", productsRoute);
app.use("/api/grocerProducts", grocerProductsRoute);


app.get('/', (req, res) => {
  res.send('Welcome to Evergreen');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('./grocerProducts', (req, res) => {
  res.send(grocerProductsRoute);
})

// .env file
const port = process.env.PORT || 5000;
const backendApiUrl = process.env.BACKEND_API_URL;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const fetch = require('node-fetch');
fetch(`${backendApiUrl}/api`);
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));