const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');
const genAuthToken = require('../utils/genAuthToken');

const router = express.Router();

router.post("/", async(req, res) => {
    
    const schema = Joi.object({
        firstName: Joi.string().min(3).max(30).required(),
        lastName: Joi.string().min(3).max(30).required(),
        idNumber: Joi.string().min(3).max(30).required(),
        city: Joi.string().min(3).max(30).required(),
        telephone: Joi.string().min(10).max(14).required(),
        county: Joi.string().min(3).max(30).required(),
        email: Joi.string().min(3).max(200).required().email(),
        password: Joi.string().min(3).max(200).required()

    });
    
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = User.findOne({email: req.body.email});
    if(user) return res.status(400).send("User already exists");

    user = new User ({
        firstName : req.body.firstName,
        lastName: req.body.lastName,
        idNumber: req.body.idNumber,
        telephone: req.body.telephone,
        county: req.body.county,
        city: req.body.city,
        email: req.body.email,
        password: req.body.password,
        
        
    
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password, salt)


    user = await user.save()

    const token = genAuthToken(user);

    res.send(token);
});

module.exports = router;