const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

const users = require('./login');
const products = require('./products');

const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb://localhost:27017/my_database";

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err, client) {
  if(err) {
    console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
  }
  console.log('Connected...');

  const collection = client.db("my_database").collection("user data");

  // perform a query
  collection.find({}).toArray(function(err, docs) {
    console.log(docs);
    client.close();
  });
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  idNumber: String,
  city: String,
  telephone: String,
  county: String,
  email: {
    type: String,
    unique: true, // Ensure emails are unique
    required: true, // Ensure emails are required
  },
  password: {
    type: String,
    required: true, // Ensure passwords are required
  },
});


const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { firstName, lastName, idNumber, city, telephone, county, email, password } = req.body;

  try {
    // Check if user with email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User with email already exists' });
    }

    // Create new user object
    const user = new User({ firstName, lastName, idNumber, city, telephone, county, email, password });

    // Save user object to database
    await user.save();

    // Return success message
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

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
