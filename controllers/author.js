const authorDbModel = require("../models/author")
const authorModel = new authorDbModel()

class authorController {
    constructor() {
        const author = []
    }

    async getAuthorArticles(req, res) {
        const author = await authorModel.findArticles(req.params.id)
        res.status(201).json(author)
    }
}

module.exports = authorController