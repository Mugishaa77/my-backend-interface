const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const users = require('./login');
const products = require("./products");

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Evergreen');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.get('/login', (req, res) => {
  res.send(users);
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  
  const token = jwt.sign({ id: user.id, role: user.role }, 'secret');

  
  res.json({ token });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


console.log(products)