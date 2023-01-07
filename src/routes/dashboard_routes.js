import express from "express";
import multer from "multer";
const dashboardRouter = express.Router();

// Image upload
var storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single("image");

//Controller call on URLs
const {
    //dashboard controller
    getDashboardController,
    //article controller
    getArticleController,
    getArticleAddController,
    postArticleAddController,
    getArticleEditController,
    postArticleUpdateController,
    getArticleDeleteController,
    //category controller
    getCategoryController,
    getCategoryAddController,
    postCategoryAddController,
    getCategoryDeleteController
} = require("../controller/dashboard_controller");

//dashboard controller call
dashboardRouter.get("/", getDashboardController);
//article controller call
dashboardRouter.get("/articles", getArticleController);
dashboardRouter.get("/articles/add", getArticleAddController);
dashboardRouter.post("/articles/add", upload, postArticleAddController);
dashboardRouter.get("/articles/edit/:id", getArticleEditController);
dashboardRouter.post("/articles/update/:id", upload, postArticleUpdateController);
dashboardRouter.get("/articles/delete/:id", getArticleDeleteController);
//category controller call
dashboardRouter.get("/categories", getCategoryController);
dashboardRouter.get("/categories/add", getCategoryAddController);
dashboardRouter.post("/categories/add", postCategoryAddController);
dashboardRouter.get("/categories/delete/:id", getCategoryDeleteController);

module.exports = dashboardRouter;