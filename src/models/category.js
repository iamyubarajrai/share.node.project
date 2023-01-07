const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    article_ids: [{ 
        //every category has many articles: One-to-Many
        type: mongoose.Schema.Types.ObjectId,
        ref: "article"
    }],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Category", categorySchema);