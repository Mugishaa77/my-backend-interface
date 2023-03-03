const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const users = [
  {
    id: 1,
    username: 'customer',
    password: 'customer123',
    role: 'customer',
  },
  {
    id: 2,
    username: 'farmer',
    password: 'farmer123',
    role: 'farmer',
  },
  {
    id: 3,
    username: 'grocer',
    password: 'grocer123',
    role: 'grocer',
  },
];

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to Evergreen');
});

app.get('/products', (req, res) => {
  res.send(products);
});

app.post('/login', (req, res) => {
  // Get username and password from request body
  const { username, password } = req.body;

  // Find user in the users array
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    // Return error response if user not found
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  // Generate JWT token with user id and role as payload
  const token = jwt.sign({ id: user.id, role: user.role }, 'secret');

  // Return token as response
  res.json({ token });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
