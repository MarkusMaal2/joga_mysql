const express = require('express')
const router = express.Router()

const articleControllerClass = require("../controllers/article")

// define article ctrl
const articleCtrl = new articleControllerClass()

// use ctrl functions acc to route
router.get('/', (req, res) => articleCtrl.getAllArticles(req, res))

router.get("/article/:slug", (req, res) => articleCtrl.getArticleBySlug(req, res))

router.post("/article/create", (req, res) => articleCtrl.createNewArticle(req, res))

router.put("/article/edit/:id", (req, res) => articleCtrl.editArticle(req, res))


// export router for use in def application file
module.exports = router