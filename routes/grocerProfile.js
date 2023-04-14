const express = require('express');
const router = express.Router();
const GrocerProfile = require('../models/grocerProfile');

router.post('/grocer-profile', async (req, res) => {
  const { fullName, emailAddress, contactNumber, stallName, stallNumber } = req.body;

  try {
    const profile = new GrocerProfile({
      fullName,
      emailAddress,
      contactNumber,
      stallName,
      stallNumber,
      role: 'grocer'
    });

    await profile.save();
    res.status(200).json({ message: 'Profile saved successfully!' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while saving the profile.' });
  }
});

module.exports = router;
