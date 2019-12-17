const controller = require('./controller')
const joi = require('@hapi/joi')

const createUserOptions = {
    validate : {
        payload : joi.object().keys({
            username : joi.string().required(),
            highScore: joi.number().required()
        }),
        auth : false
    }
}


exports.createUserOptions = createUserOptions;