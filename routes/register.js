const express = require('express');
const router = express.Router();
const { User } = require('../models/user');

router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, idNumber, phoneNumber, email, password, role } = req.body;
    const user = new User({ firstName, lastName, idNumber, phoneNumber, email, password, role });
    await user.save();
    res.send('User registered successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error registering user!');
  }
});

module.exports = router;
