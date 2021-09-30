const {check, validationResult} = require('express-validator');



 function validateit(username,email,password){
    return [
        check(username).notEmpty().withMessage('user name is empty'),
        check(email).notEmpty().withMessage('email is empty').isEmail().withMessage('this is not email'),
        check(password).notEmpty().withMessage('password is empty').isIP().withMessage('not ip')
    ]
}

module.exports = validateit;
