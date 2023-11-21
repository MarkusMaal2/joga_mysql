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
}

module.exports = ArticleModel