import fs from "fs";

//Models
import Article from "../models/article";
import Category from "../models/category";

exports.getDashboardController = (req, res) => {
    res.render("dashboard/index", {
        title: "Homepage"
    });
}

exports.getArticleController = (req, res) => {
    Article.find().sort({"_id": -1}).exec((err, articles) => {
        if(err) {
            res.json({message: err.message});
        } else {
            Category.find().sort({"_id": -1}).exec((err, categories) => {
                if(err) {
                    res.json({message: err.message});
                } else {
                    res.render("dashboard/article/index", {
                        title: "Articles",
                        articles: articles,
                        categories
                    });
                }
            });
        }
    });
}

exports.getArticleAddController = (req, res) => {
    Category.find().exec((err, categories) => {
        if(err) {
            res.json({message: err.message});
        } else {
            res.render("dashboard/article/add", {
                title: "Add Article",
                categories
            });
        }
    });
}

exports.postArticleAddController = (req, res) => {
    const article = new Article({
        title: req.body.title, 
        team_name: req.body.team_name, 
        wins: req.body.wins, 
        defeats: req.body.defeats, 
        author: req.body.author, 
        image: req.file.filename, 
        content: req.body.content,
        category_id: req.body.category
    });

    article.save((err) => {
        if(err) {
            res.json({message: err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: "Article added succefully!"
            }

            Category.findByIdAndUpdate(req.body.category, {
                $push: { article_ids: article._id  }
            }, {
                new: true,
                runValidators: true
            }, (err, result) => {
                if(err) {
                    res.json({message: err.message, type: 'danger'});
                }
            });

            res.redirect("/dashboard/articles");
        }
    });
}

exports.getArticleEditController = (req, res) => {
    let id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) {
            res.redirect("/dashboard/articles");
        } else {
            if(article == null) {
                res.redirect("/dashboard/articles");
            } else {
                let currCat = article.category_id.valueOf();

                Category.find().exec((err, categories) => {
                    if(err) {
                        res.json({message: err.message});
                    } else {
                        res.render("dashboard/article/edit", {
                            title: "Edit Article",
                            article,
                            categories,
                            currCat
                        });
                    }
                });
            }
        }
    }); 
}

exports.postArticleUpdateController = (req, res) => {
    let id = req.params.id;
    const currcat = req.body.currcat;
    const newcat = req.body.category;
    let new_image = '';

    if(req.file) {
        new_image = req.file.filename;
        try {
            fs.unlinkSync('./uploads/' + req.body.old_image);
        } catch(err) {
            console.log(err);
        }
    } else {
        new_image = req.body.old_image;
    }

    Article.findByIdAndUpdate(id, {
        title: req.body.title, 
        team_name: req.body.team_name, 
        wins: req.body.wins, 
        defeats: req.body.defeats, 
        author: req.body.author, 
        image: new_image,
        content: req.body.content,
        category_id: req.body.category
    }, (err, result) => {
        if(err) {
            res.json({message: err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: "Article updated successfully!"
            };

            if(currcat != newcat) {
                Category.findByIdAndUpdate(currcat, {
                    $pull: { article_ids: id  }
                }, {
                    edit: true
                }, (err, result) => {
                    if(err) {
                        res.json({message: err.message, type: 'danger'});
                    }
                });
            }

            Category.findByIdAndUpdate(newcat, {
                $addToSet: { article_ids: id  }
            }, {
                edit: true
            }, (err, result) => {
                if(err) {
                    res.json({message: err.message, type: 'danger'});
                }
            });

            res.redirect("/dashboard/articles/edit/" + id);
        }
    })
}

exports.getArticleDeleteController = (req, res) => {
    let id = req.params.id;
    
    Article.findByIdAndRemove(id, (err, result) => {
        if(result.image != '') { 
            try{
                fs.unlinkSync('./uploads/' + result.image);
            } catch(err) {
                console.log(err);
            }
        }
        
        if(err) {
            res.json({message: err.message });
        } else {
            req.session.message = {
                type: "info",
                message: "Article deleted successfully!"
            }

            Category.findByIdAndUpdate(result.category_id.valueOf(), {
                $pull: { article_ids: id  }
            }, (err, result) => {
                if(err) {
                    res.json({message: err.message, type: 'danger'});
                }
            });

            res.redirect("/dashboard/articles");
        }
    });
}

exports.getCategoryController = (req, res) => {
    Category.find().sort({"_id": -1}).exec((err, categories) => {
        if(err) {
            res.json({message: err.message});
        } else {
            res.render("dashboard/category/index", {
                title: "Categories",
                categories: categories
            });
        }
    });
}

exports.getCategoryAddController = (req, res) => {
    res.render("dashboard/category/add", {
        title: "Add Category"
    });
}

exports.postCategoryAddController = (req, res) => {
    const category = new Category({
        name: req.body.name, 
        desc: req.body.desc
    });

    category.save((err) => {
        if(err) {
            res.json({message: err.message, type: 'danger'});
        } else {
            req.session.message = {
                type: 'success',
                message: "Category added succefully!"
            }

            res.redirect("/dashboard/categories");
        }
    });
}

exports.getCategoryDeleteController = (req, res) => {
    let id = req.params.id;
    
    Category.findByIdAndRemove(id, (err, result) => {
        if(err) {
            res.json({message: err.message });
        } else {
            req.session.message = {
                type: "info",
                message: "Category deleted successfully!"
            }

            Category.findOne({name: "Uncategorized"}, (err, result) => {
                if(err) {
                    res.json({message: err.message, type: 'danger'});
                }

                Article.updateMany({category_id: {$in: id}}, {
                    category_id: result._id
                }, (err, result) => {
                    if(err) {
                        res.json({message: err.message, type: 'danger'});
                    }
                });

            });

            res.redirect("/dashboard/categories");
        }
    });
}