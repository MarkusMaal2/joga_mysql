const con = require('../../utils/db.js')
// show all articles (index)
const showArticleForm = (req, res) => {
    res.render('create', {
        message: ""
    })
}

// show article by a slug
const createNewArticle = (req, res) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    let query = `INSERT INTO article (name, slug, image, body, published) VALUES ('${req.body.name}', '${req.body.slug}', '${req.body.image}', '${req.body.body}', '${currentDate}')`

    con.query(query, (err, result) => {
        if (err) throw err
        res.render('create', {
            message: "New article created successfully!"
        })
    })
}

// export ctrl functions
module.exports = {
    showArticleForm,
    createNewArticle
}