const express = require('express');
const router = express.Router();
const GrocerProfile = require('../models/grocerProfile');

router.post('/grocer', async (req, res) => {
  try {
    const grocerProfile = new GrocerProfile({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      contactNumber: req.body.contactNumber,
      stallName: req.body.stallName,
      stallNumber: req.body.stallNumber,
    });
    await grocerProfile.save();
    res.status(201).send('Profile created successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
