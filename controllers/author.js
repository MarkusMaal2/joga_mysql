const authorDbModel = require("../models/author")
const authorModel = new authorDbModel()

class authorController {
    constructor() {
        const articles = []
    }

    async getAuthorArticles(req, res) {
        const articles = await authorModel.findArticles(req.params.id)
        res.status(201).json({articles: articles})
    }
}

module.exports = authorController