const mongoose = require('mongoose');

const farmerProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  stallName: { type: String, required: true },
  stallNumber: { type: String, required: true },
});

const FarmerProfile = mongoose.model('FarmerProfile', farmerProfileSchema);

module.exports = FarmerProfile;
