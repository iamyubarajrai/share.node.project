import express from "express";
const apiRouter = express.Router();

const {
    getArticleController,
    getCategoryController
} = require("../controller/api_controller");

apiRouter.get("/articles", getArticleController);
apiRouter.get("/categories", getCategoryController);

module.exports = apiRouter;