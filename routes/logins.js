const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Login = require('../models/login');

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({ email });
    if (!user) {
      return res.status(401).send('Invalid login credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid login credentials');
    }
    res.send('User authenticated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;
