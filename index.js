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

app.listen(3010, () => {
    console.log("Webapp started at http://localhost:3010")
})