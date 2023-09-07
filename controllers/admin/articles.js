const con = require('../../utils/db.js')
// display article creation form (GET)
const showArticleForm = (req, res) => {
    let query2 = `SELECT author.id as 'id', author.name as 'name' FROM author`
    con.query(query2, (err, result2) => {
        res.render('create', {
            message: "",
            authors: result2
        })
    })
}

// create new article (POST)
const createNewArticle = (req, res) => {
    // source: https://stackoverflow.com/questions/5129624/convert-js-date-time-to-mysql-datetime
    let currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
    let query = `INSERT INTO article (name, slug, image, body, published, author_id) VALUES ('${req.body.name}', '${req.body.slug}', '${req.body.image}', '${req.body.body}', '${currentDate}', ${req.body.author})`

    let query2 = `SELECT author.id as 'id', author.name as 'name' FROM author`
    con.query(query2, (err, result2) => {
        con.query(query, (err, result) => {
            if (err) throw err
            res.render('create', {
                message: "New article created successfully!",
                authors: result2
            })
        })
    })
}

// show article update form
const updateArticle = (req, res) => {
    if (req.method === "POST") {
        if (req.body.action === "erase") {
            let query = `DELETE FROM article WHERE id = ${req.params.id}`;
            con.query(query, (err, result) => {
                if (err) throw err
                console.log(`Deleted record with id=${req.params.id}`)
                res.redirect("/")
            })
        } else if (req.body.action === "edit") {
            // POST
            let query = `UPDATE article
                         SET name='${req.body.name}',
                             slug='${req.body.slug}',
                             image='${req.body.image}',
                             body='${req.body.body}',
                             author_id=${req.body.author}
                         WHERE id = ${req.params.id}`;
            con.query(query, (err, result) => {
                if (err) throw err
                res.redirect("/")
            })
        }
    } else {
        // GET
        let query = `SELECT author.id as 'id', author.name as 'name' FROM author`
        let query2 = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published' /*, author.name as 'author', author.id as 'author_id' */ FROM article /* INNER JOIN author ON article.author_id = author.id */ WHERE id = '${req.params.id} LIMIT 1'`
    con.query(query, (err, result2) => {
        con.query(query2, (err, result) => {
            if (err) throw err
            if (result.length === 0) {
                res.render('edit', {
                    message: "This article does not exist!",
                    article: null,
                    authors: null
                })
                return;
            }
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