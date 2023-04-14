const { FarmerProfile }   = require('../models/FarmerProfile');
const  { GrocerProfile } = require('../models/GrocerProfile');



// function to save farmer profile
exports.saveFarmerProfile = async (req, res) => {
  try {
    const farmerProfile = new FarmerProfile(req.body);
    const savedProfile = await farmerProfile.save();
    res.status(200).json({ message: 'Farmer profile saved successfully!', data: savedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error saving farmer profile', error: error });
  }
};

// function to save grocer profile
exports.saveGrocerProfile = async (req, res) => {
  try {
    const grocerProfile = new GrocerProfile(req.body);
    const savedProfile = await grocerProfile.save();
    res.status(200).json({ message: 'Grocer profile saved successfully!', data: savedProfile });
  } catch (error) {
    res.status(500).json({ message: 'Error saving grocer profile', error: error });
  }
};
