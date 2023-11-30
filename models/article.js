const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
    constructor() {
        super("article");
    }

    async findAll() {
        return await super.findAll();
    }

    async findOne(slug) {
        return await super.findOne("slug", slug)
    }

    async findMany(id) {
        return await super.findMany('author_id', id)
    }

    async create(article) {
        return await super.create(article);
    }

    async update(id, data) {
        return await super.update(id, data);
    }

    async delete(id) {
        return await super.delete(id);
    }
}

module.exports = ArticleModel