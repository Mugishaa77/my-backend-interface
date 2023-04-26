const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type: String, required: true, minLength: 3, maxLength: 30},
    lastName: {type: String, required: true, minLength: 3, maxLength: 30},
    idNumber: {type: String, required: true, minLength: 3, maxLength: 30},
    phoneNumber: {type: String, required: true, minLength: 3, maxLength: 14},
    email: {type: String, required: true, minLength: 3, maxLength: 200, unique:true},
    password: {type: String, required: true, minLength: 3, maxLength: 1024},
    role: {type: String, required:true, }
    
});

const User = mongoose.model("User", userSchema);

exports.User = User;
