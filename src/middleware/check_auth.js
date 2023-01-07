import jwt from "jsonwebtoken";
import User from "../models/user";

exports.checkAuth = async (req, res, next) => {
    try {   
        const user_id = req.cookies.user_log.id;
        const user_token = await User.findOne({_id: user_id});
        
        let token = user_token.token.split(" ")[1];
        let decoded = await jwt.verify(token, process.env.JWT_SECRET);

        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({
            message: "Auth failed!"
        })
    }
}
