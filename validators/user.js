const {check} = require('express-validator')

exports.userRegisterValidator = [
    check('name')
        .notEmpty()
        .withMessage('Name is required')
        .isString()
        .withMessage('Name must be a string'),
    check('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long'),
    // check('cfpassword')
    //             .isLength({ min: 6 })
    //             .withMessage('Confirm password is required.')
    //             .matches('password')
    //             .withMessage('Passwords must match.'),
]

exports.userSigninValidator = [
    check('email')
        .isEmail()
        .withMessage('Must be a valid email address'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
]
