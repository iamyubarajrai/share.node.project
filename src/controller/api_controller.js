import Artcle from "../models/article";
import Category from "../models/category";
exports.getArticleController = (req, res) => {
    Artcle.find((err, result) => {
        res.json({"articles": result});
    });
}

exports.getCategoryController = (req, res) => {
    Category.find((err, result) => {
        res.json({"categories": result});
    });
}