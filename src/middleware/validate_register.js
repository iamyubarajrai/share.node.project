import { body } from "express-validator";
import User from "../models/user";

exports.validateRegister = [
    body("fullname", "Fullname is required!").exists().trim().isLength({min: 3}),
    body("address", "Address is required!").exists().trim().isLength({ min: 5 }),
    body("phone", "Phone only supports integers!").trim().exists().isMobilePhone(),
    body("email", "Email invalid!").isEmail().trim().exists()
        .custom((value, {req}) => {
            return new Promise((resolve, reject) => {
                User.findOne({email:req.body.email}, function(err, user){
                    if(err) {
                        reject(new Error('Server Error'))
                    }
                    if(Boolean(user)) {
                        reject(new Error('E-mail already in use'))
                    }
                    resolve(true)
                });
            });
        }),
    body("password").trim().not().isEmpty()
        .withMessage("Password is required")
        .isStrongPassword()
        .withMessage('Enter strong password!'),
    body("cpassword", "Passwords do not match").exists()
        .custom((value, { req }) => value === req.body.password)
    // body("cpassword").custom((value, { req }) => {
    //     if (value !== req.body.password) {
    //         throw new Error('Password confirmation is incorrect');
    //     }
    //     return true;
    // })
]

/**
 * https://youtu.be/oiuzVGCCWGs
 * 
 * https://www.freecodecamp.org/news/how-to-choose-which-validator-to-use-a-comparison-between-joi-express-validator-ac0b910c1a8c/
 */