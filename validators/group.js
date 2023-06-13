const {check} = require('express-validator')

exports.groupCreateValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
]
