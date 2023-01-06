const express = require('express')
const app = express()

// add template engine
const path = require('path')
const hbs = require('express-handlebars')
// setup template dir and file exts
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
}))

// setup static public directory
app.use(express.static('public'))

const mysql = require('mysql')

//app.use(express.json())
//app.use(express.urlencoded({extended: true}))

let con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'qwerty',
    database: 'joga_mysql'
})

con.connect((err) => {
    if (err) throw err
    console.log("Database server connected")
    let sqlQuery = 'SELECT name,author_id FROM article'
    con.query(sqlQuery, (err, result) => {
        if (err) throw err
        console.log(result)
    })
})

app.get('/', (req, res) => {
    let sql = 'SELECT * FROM article'
    con.query(sql, (err, result) => {
        if (err) throw err
        articles = result
        res.render('index', {
            articles: articles
        })
    })
})

app.get('/article/:slug', (req, res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE slug = '${req.params.slug}'`
    con.query(query, (err, result) => {
        if (err) throw err
        res.render('article', {
            article: result
        })
    })
})

app.get('/author/:author_id', (req, res) => {
    let query = `SELECT article.id as 'id', article.name as 'name', article.slug as 'slug', article.image as 'image', article.body as 'body', article.published as 'published', author.name as 'author', author.id as 'author_id' FROM article INNER JOIN author ON article.author_id = author.id WHERE author_id = ${req.params.author_id};`
    let author = ''
    con.query(query, (err, result) => {
        if (err) throw err
        if (result.length > 0) {
            author = result[0].author
        }
        res.render('author', {
            articles: result,
            author: author
        })
    })
})

app.listen(3010, () => {
    console.log("Webapp started at http://localhost:3010")
})