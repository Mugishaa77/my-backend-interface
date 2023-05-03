const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    const uri = process.env.DB_URI;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Mugisha,, successful');
  } catch (err) {
    console.error(err);
    console.log('Unsuccessful');
    process.exit(1);
  }
}

module.exports = { connectToDatabase, mongoose };
