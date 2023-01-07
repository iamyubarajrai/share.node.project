import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { json } from "express";
import { validationResult, matchedData } from "express-validator";

// Models
import User from "../models/user";

exports.getLoginController = (req, res) => {
    res.render("user/login/index", {
        title: "Login User"
    });
}

exports.postLoginController = async (req, res, next) => {
    //login logic
    const { email, password } = await req.body;
    
    try {
        let user = await User.findOne({email});
        if(!user) {
            res.status(400).json({error: "Please try to login with correct credentials!"});
        }
        
        const pwdCompare = await bcrypt.compareSync(password, user.password);
        if(!pwdCompare) {
            res.status(400).json({error: "Please try to login with correct credentials!"});
        }

        const payload = {
            user: {
                id: user._id,
                email: user.email
            }
        }
        const auth_token = await jwt.sign( payload, process.env.JWT_SECRET, { expiresIn: '1h'});
        let user_token = await User.findByIdAndUpdate(user._id, {token: 'bearer ' + auth_token});
        user_token.save((err) => {
            if(err) {
                res.json({message: err.message, type: 'danger'});
            } else {
                req.session.message = {
                    type: 'success',
                    message: 'User login successful!'
                }
                res.cookie(`user_log`, {id: user._id, email: user.email}, {
                    maxAge: 24 * 60 * 60 * 1000, //ms = 1d
                    secure: true
                });
                res.redirect("/dashboard");
            }
        });
    } catch(error) {
        console.error(error.message);
        res.status(500).send("Internal server error!");
    }
}

exports.logoutController = async (req, res) => {
    const user_id = req.cookies.user_log.id;
    let user_logout = await User.findByIdAndUpdate(user_id, {token: ""});
    await res.clearCookie('user_log');
    res.redirect("/user");
}

exports.getRegisterController = (req, res) => {
    res.render("user/register/index", {
        title: "Register User"
    });
}

exports.postRegisterController = (req, res) => {
    const errors = validationResult(req);
    if (errors.errors.length != 0) {
        //return res.status(400).json({ errors: errors.mapped() });
        const alert = errors.array();
        const user = matchedData(req);
        res.render('user/register/index', {title: "Register Page", alert, user });
        exit();
    }

    const salt = bcrypt.genSaltSync(10);
    let secPass = bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        fullname: req.body.fullname,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email,
        password: secPass,
        salt: salt
    });

    const signData = {
        user: {
            id: user._id
        }
    } 

    const auth_token = jwt.sign(signData, process.env.JWT_SECRET, {expiresIn: '1h'});
    
    user.save((err) => {
        if(err) {
            res.json({message: err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: "User registered successfully!"
            }
            res.redirect("/user");
        }
    });
}