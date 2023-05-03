const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const FarmerProfile = require('../models/farmerProfile');

router.post('/farmer', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const farmerProfile = new FarmerProfile({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      contactNumber: req.body.contactNumber,
      stallName: req.body.stallName,
      stallNumber: req.body.stallNumber,
    });
    const result = await db.collection('farmerProfiles').insertOne(farmerProfile);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
