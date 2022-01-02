
//  exports.userSignupValidator = (req,res)=>{
//     req.check('name', "Name is required").notEmpty()
//     req.check('email', "Email is between 3 and 32 charachters").matches(/.+\@.+\..+/)
//     .withMessage('Email must contain @')
//     .isLength({
//         min: 4 , max: 32
//     })

//     req.check('password, "Password is requierd').notEmpty()
//     req.check('password').isLength({min: 6  }).withMessage('Password must contain at least 6 charachters')
//     .matches(/\d/)
//     .withMessage('Password must contain a number')

    

//     next()
// }