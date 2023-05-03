const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const GrocerProfile = require('../models/grocerProfile');

router.post('/', async (req, res) => { // change '/grocer' to '/'
  try {
    const db = await connectToDatabase();
    const grocerProfile = new GrocerProfile({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      contactNumber: req.body.contactNumber,
      stallName: req.body.stallName,
      stallNumber: req.body.stallNumber,
    });
    const result = await db.collection('grocerProfiles').insertOne(grocerProfile);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
