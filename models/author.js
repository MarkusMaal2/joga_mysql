const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
    constructor() {
        super("author");
    }

    async findArticles(id) {
        const author = await super.findById(id);
        author["articles"] = await super.findByForeignKey("author_id", id, "article", "author_id");
        return {author};
    }
}

module.exports = ArticleModel