const {check} = require('express-validator')

exports.contactCreateValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required'),
    check('phone')
        .notEmpty()
        .withMessage('Phone is required')
]
