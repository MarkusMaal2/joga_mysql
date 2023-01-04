const express = require('express')
const app = express()
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

app.listen(3010, () => {
    console.log("Webapp started at http://localhost:3010")
})