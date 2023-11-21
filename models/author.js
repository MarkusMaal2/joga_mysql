const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
    constructor() {
        super("author");
    }

    async findArticles(id) {
        return await super.findByForeignKey("author_id", id, "article", "author_id");
    }
}

module.exports = ArticleModel