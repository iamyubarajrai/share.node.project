import express from "express";
const userRouter = express.Router();

const { 
    //login controller
    getLoginController, 
    postLoginController,
    //logout controller
    logoutController,
    //register controller
    getRegisterController,
    postRegisterController
} = require("../controller/user_controller");
const { validateRegister } = require("../middleware/validate_register");

//login controller call
userRouter.get("/", getLoginController );
userRouter.post("/sign-in", postLoginController );
//logout controller call
userRouter.get("/sign-out", logoutController );
//register controller call
userRouter.get("/register", getRegisterController);
userRouter.post("/register", validateRegister, postRegisterController);

module.exports = userRouter;