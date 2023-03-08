const bcrypt = require('bcrypt');
const Joi = require('joi');
const express = require('express');

const router = express.Router();

router.post("/", (req, res) => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
         email: Joi.string().min(3).max(200).required().email(),
          password: Joi.string().min(3).max(200).required()

    })
})