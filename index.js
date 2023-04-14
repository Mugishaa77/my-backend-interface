// extensions and dependancies (just not from the project)
const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');

// routes
const register = require('./routes/register');
const login = require('./routes/login');
const productsRoute = require('./routes/products');
const grocerProductsRoute = require('./routes/grocerProducts');
const farmerProfileRoutes = require('./routes/farmerProfile');
const grocerProfileRoutes = require('./routes/grocerProfile');

// root component
const products = require('./products');

// controllers
const profileController = require('./controllers/profileController');

// api end-points
app.use(express.json());
app.use(cors());
app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products", productsRoute);
app.use("/api/grocerProducts", grocerProductsRoute);
app.use("/api/farmerProfile", farmerProfileRoutes);
app.use("/api/grocerProfile", grocerProfileRoutes);

// routes for saving profiles
app.post('/farmer/profile', profileController.saveFarmerProfile);
app.post('/grocer/profile', profileController.saveGrocerProfile);



app.get('/', (req, res) => {
  res.send('Welcome to Evergreen');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/farmerProfile', (req, res) => {
  res.send('made it lil nigga');
})

// .env file
const port = process.env.PORT || 5000;
const backendApiUrl = process.env.BACKEND_API_URL;


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



fetch(`${backendApiUrl}/products`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error(error);
    console.log(error.response);
  });
