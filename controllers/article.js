const articleDbModel = require("../models/article")
const authorDbModel = require("../models/author")
const articleModel = new articleDbModel()
const authorModel = new authorDbModel()

class articleController {
    constructor() {
        const articles = []
    }

    async getAllArticles(req, res) {
        const articles = await articleModel.findAll()
        res.status(201).json({articles: articles})
    }

    async getArticleBySlug(req, res) {
        const article = await articleModel.findOne(req.params.slug)
        res.status(201).json({article: article})
    }

    async createNewArticle(req, res) {
        const newArticle = {
            name: req.body.name,
            slug: req.body.slug,
            image: req.body.image,
            body: req.body.body,
            published: new Date().toISOString().slice(0, 19).replace("T", " "),
            author_id: req.body.author_id,
        }
        const articleId = await articleModel.create(newArticle);
        res.status(201).json({
            message: `created article with id ${articleId}`,
            article: {id: articleId, ...newArticle}
        })
    }

    async editArticle(req, res) {
        let sets = "";
        sets += `name = "${req.body.name}", `;
        sets += `slug = "${req.body.slug}", `;
        sets += `image = "${req.body.image}", `;
        sets += `body = "${req.body.body}", `;
        sets += `author_id = ${req.body.author_id}`;
        const rows = await articleModel.update(req.params.id, sets)
        const article = await articleModel.findOne(req.body.slug);
        article["author"] = await authorModel.findAuthor(req.body.author_id)
        res.status(201).json({
            message: `affected rows: ` + rows,
            article: article
        })
    }
}

module.exports = articleController