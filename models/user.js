const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minLength: 3, maxLength: 30},
    lastName: {type: String, required: true, minLength: 3, maxLength: 30},
    email: {type: String, required: true, minLength: 3, maxLength: 200, unique:true},
    password: {type: String, required: true, minLength: 3, maxLength: 1024},
    idNumber: {type: String, required: true, minLength: 3, maxLength: 30},
    telephone: {type: String, required: true, minLength: 10, maxLength: 14},
     city: {type: String, required: true, minLength: 3, maxLength: 30},
    county: {type: String, required: true, minLength: 3, maxLength: 30},
    


});

const User = mongoose.model("User", userSchema);

exports.User = User;
