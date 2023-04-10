const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateReq = require('middleware/validate-request');
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticateSchema, authenticate);
router.post('/register', registerSchema, register);


module.exports = router;

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    validateReq(req, res, next, schema);
}

function authenticate(req, res, next) {
    
    userService.authenticate(req.body)
        .then(user => { 
            if(user.success == false ) {
                res.json({
                    success: user.success,
                    message: "Username or password is incorrect!",
                })
            } else {
                res.json({
                    success: true,
                    message: "Login successful!",
                    user
                })
            }
        })
        .catch(next);
}

function registerSchema(req, res, next) {
    
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().min(6).required(),
        email: Joi.string().required(),
    });
    validateReq(req, res, next, schema);
}

function register(req, res, next) {
    userService.create(req.body)
        .then(register => {
            res.json({ 
                success: register.success,
                message: register.message,
                user: register.user
            })
        })
        .catch(next);
}
 

 