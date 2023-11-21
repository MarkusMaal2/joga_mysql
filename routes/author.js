const express = require('express')
const router = express.Router()

const authorControllerClass = require("../controllers/author")

// define article ctrl
const authorCtrl = new authorControllerClass()

// use ctrl functions acc to route
router.get("/:id", (req, res) => authorCtrl.getAuthorArticles(req, res))


// export router for use in def application file
module.exports = router