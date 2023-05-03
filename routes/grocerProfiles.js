const express = require('express');
// creates a router instance
const router = express.Router();

// connects to database
const connectToDatabase = require('../db');

// imports the schema
const GrocerProfile = require('../models/grocerProfile');

router.post('/grocer', async (req, res) => {
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
