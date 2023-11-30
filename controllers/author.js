const authorDbModel = require("../models/author")
const articleDbModel = require("../models/article")
const authorModel = new authorDbModel()
const articleModel = new articleDbModel();

class authorController {
    constructor() {
        const author = []
    }

    async getAuthorArticles(req, res) {
        console.log(req.params.id)
        const author = await authorModel.findAuthor(req.params.id)
        author["articles"] = await articleModel.findMany(req.params.id);
        res.status(201).json({author})
    }
}

module.exports = authorController