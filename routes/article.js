const express = require('express')
const router = express.Router()

// define article ctrl
const articleCtrl = require('../controllers/article')
const articleAdminCtrl = require('../controllers/admin/articles')

// use ctrl functions acc to route
router.get('/', articleCtrl.getAllArticles)
router.get('/article/:slug', articleCtrl.getArticleBySlug)
router.get('/admin/article/create', articleAdminCtrl.showArticleForm)
router.post('/admin/article/create', articleAdminCtrl.createNewArticle)
router.get('/admin/article/edit/:id', articleAdminCtrl.updateArticle)
router.post('/admin/article/edit/:id', articleAdminCtrl.updateArticle)

// export router for use in def application file
module.exports = router