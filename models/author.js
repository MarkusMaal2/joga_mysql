const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
    constructor() {
        super("author");
    }

    async findAuthor(id) {
        const author = await super.findById(id);
        return author;
    }
}

module.exports = ArticleModel