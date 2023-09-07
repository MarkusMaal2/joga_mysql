const con = require('../../utils/db.js')
// display article creation form (GET)
const showArticleForm = (req, res) => {
    res.render('create', {
        message: ""
    })
}

// create new article (POST)
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

// show article update form
const updateArticle = (req, res) => {
    if (req.method === "POST") {
        // POST
        let query = `UPDATE article SET name='${req.body.name}', slug='${req.body.slug}', image='${req.body.image}', body='${req.body.body}', author_id=${req.body.author} WHERE id = ${req.params.id}`;
        con.query(query, (err, result) => {
            if (err) throw err
            res.redirect("/")
        })
    } else {
        // GET
        let query = `SELECT author.id as 'id', author.name as 'name' FROM author`
        let query2 = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published' /*, author.name as 'author', author.id as 'author_id' */ FROM article /* INNER JOIN author ON article.author_id = author.id */ WHERE id = '${req.params.id} LIMIT 1'`
    con.query(query, (err, result2) => {
        con.query(query2, (err, result) => {
            if (err) throw err
            res.render('edit', {
                message: "",
                article: result,
                authors: result2
            })
        })
    })
    }
}

// export ctrl functions
module.exports = {
    showArticleForm,
    updateArticle,
    createNewArticle
}