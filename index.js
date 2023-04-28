// extensions and dependancies (just not from the project)
const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');


// routes
// approved
const users = require('./routes/users');
const productsRoute = require('./routes/products');

// unapproved
const logins = require('./routes/logins');
const grocerProductsRoute = require('./routes/grocerProducts');
const farmerProfileRoute = require('./routes/farmerProfile');
const grocerProfileRoute = require('./routes/grocerProfile');

// root component
const products = require('./products');

// controllers
const profileController = require('./controllers/profileController');

// 
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// api end-points(used /api prefixing for code best practices)
// approved
app.use('/users', users);
// remeber to make it store all input...
app.use("/api/products", productsRoute);
app.use("/logins", logins);

// unapproved
app.use("/api/grocerProducts", grocerProductsRoute);
app.use("/api/farmer", farmerProfileRoute);
app.use("/api/grocer", grocerProfileRoute);

// routes for saving profiles
app.post('/farmer/profile', profileController.saveFarmerProfile);
app.post('/grocer/profile', profileController.saveGrocerProfile);

// route for sending an stk push to safaricom
// untested
app.post("/stk", (req, res) => {
  console.log("Received STK request:", req.body); // Add this line
  const phone = req.body.phone;
  const amount = req.body.amount;

  res.json({phone, amount})
});
// end of untested


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


// front end is fresh market/basket one(is the main display and is entirely for testing)
fetch(`${backendApiUrl}/products`)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error(error);
    console.log(error.response);
  });
