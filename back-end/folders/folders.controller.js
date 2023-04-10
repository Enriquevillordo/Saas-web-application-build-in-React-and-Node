const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateReq = require('middleware/validate-request');
const folderService = require('./folder.service');

// routes
router.get('/', get);
router.get('/:userId', getByUserId);
router.post('/create', createSchema, create);
router.post('/update', updateSchema, update)
router.post('/remove', remove);

module.exports = router;

function get(req, res, next) {
    folderService.get(req.params.userID)
        .then(result => {
            res.json({
                success: result.success,
                message: result.message,
                folders: result.folders
            })
        })
        .catch(next);
}

function getByUserId(req, res, next) {
    folderService.getByUserId(req.params.userId)
        .then(result => {
            res.json({
                success: result.success,
                message: result.message,
                folders: result.folders
            })
        })
        .catch(next);
}

function createSchema(req, res, next) {
    
    const schema = Joi.object({
        user_id: Joi.number().required(),
        folder_name: Joi.string().required(),
    });
    validateReq(req, res, next, schema);
}

function create(req, res, next) {
    folderService.create(req.body)
        .then(result => {
            res.json({ 
                success: result.success,
                message: result.message
            })
        })
        .catch(next);
}

function updateSchema(req, res, next) {
    
    const schema = Joi.object({
        id: Joi.number().required(),
        folder_name: Joi.string().required(),
    });
    validateReq(req, res, next, schema);
}

function update(req, res, next) {
    folderService.update(req.body)
        .then(result => {
            res.json({ 
                success: result.success,
                message: result.message
            })
        })
        .catch(next);
}

function remove(req, res, next) {
    console.log(JSON.stringify(req.body.id))
    folderService.remove(req.body.id)
        .then(result => {
            res.json({ 
                success: result.success,
                message: result.message
            })
        })
        .catch(next);
}
 

 