const mongoose = require('mongoose');

const grocerProfileSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  emailAddress: { type: String, required: true },
  contactNumber: { type: String, required: true },
  stallName: { type: String, required: true },
  stallNumber: { type: String, required: true },
});

const GrocerProfile = mongoose.model('GrocerProfile', grocerProfileSchema);

module.exports = GrocerProfile;
