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
const farmerProfileRoute = require('./routes/farmerProfile');
const grocerProfileRoute = require('./routes/grocerProfile');

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
app.use("/api/farmer", farmerProfileRoute);
app.use("/api/grocer", grocerProfileRoute);

// routes for saving profiles
app.post('/farmer/profile', profileController.saveFarmerProfile);
app.post('/grocer/profile', profileController.saveGrocerProfile);



app.get('/', (req, res) => {
  res.send('Welcome to Evergreen');
});

app.get('/products', (req, res) => {
  res.send(products);
});


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
