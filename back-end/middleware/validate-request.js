module.exports = validateReq;
function validateReq(req, res, next, schema) {
    const options = {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        return res.send({
            success: false,
            reason: "validationError",
            message: error.details.map(x => x.message).join(', ')
        })
    } else {
        req.body = value;
        next();
    }
}