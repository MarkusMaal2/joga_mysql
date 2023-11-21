const BaseSQLModel = require("./base");

class ArticleModel extends BaseSQLModel {
    constructor() {
        super("article");
    }

    async findAll() {
        return await super.findAll();
    }
}

module.exports = ArticleModel