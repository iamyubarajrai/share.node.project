const express = require("express");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const app = express();

//To look Request log on console
const morgan = require("morgan");
app.use(morgan("dev")); 
// app.listen(PORT, () => {
//     console.log(`Server is running at http://localhost:${PORT}`);
// });

//Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Session settings
app.use(session({
    secret: "my secret key",
    saveUninitialized: true,
    resave: false
}));

app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(cookieParser());

// set template engine
app.set("view engine", "ejs");
//static path
app.use(express.static('assets'));

//Middleware
import { checkAuth } from "./middleware/check_auth";

//Get routes
app.get("/", (req, res) => {
    res.render("index");
});
app.use("/user", require("./routes/user_routes"));
app.use("/dashboard", checkAuth, require("./routes/dashboard_routes"));
app.use("/api/v1/", require("./routes/api_routes"));

//Fallback route
app.use((req, res, next) => {
    let error = new Error("404 not found!");
    error.status = 404;
    next(error);
});

//Fallback route helper, error first callback, always
app.use((error, req, res, next) => {
    res.json({
        message: error.message
    });
});

module.exports = app;