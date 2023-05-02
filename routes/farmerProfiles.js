const express = require('express');
const router = express.Router();
const FarmerProfile = require('../models/farmerProfile');

router.post('/farmer', async (req, res) => {
  try {
    const farmerProfile = new FarmerProfile({
      fullName: req.body.fullName,
      emailAddress: req.body.emailAddress,
      contactNumber: req.body.contactNumber,
      stallName: req.body.stallName,
      stallNumber: req.body.stallNumber,
    });
    await farmerProfile.save();
    res.status(201).send('Profile created successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
