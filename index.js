const express = require('express');
const cors = require('cors');
const app = express();
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
require('dotenv').config();

// connecting to the database
const { connectToDatabase, mongoose } = require('./db');

// Call connectToDatabase function
connectToDatabase();

// routes
// approved
const users = require('./routes/users');
const productsRoute = require('./routes/products');

// unapproved
const members = require('./routes/members');
const farmerProfilesRoute = require('./routes/farmerProfiles');
const grocerProfilesRoute = require('./routes/grocerProfiles');


// root component
const products = require('./products');

// 
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// api end-points(used /api prefixing for code best practices)
// approved
app.use('/users', users);
app.use('/api/products', productsRoute); // changed from "/api/products" to "/api/products"

// unapproved
app.use('/members', members);
app.use('/api/farmer-profiles', farmerProfilesRoute); // added this line
app.use('/api/grocer-profiles', grocerProfilesRoute);

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
fetch(`${backendApiUrl}/api/products`) // changed from "/products" to "/api/products"
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => {
    console.error(error);
    console.log(error.response);
  });
