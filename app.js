const express = require('express');
const mysql = require('mysql');
let pagination = require('./pagination');
var cors = require('cors');
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'datatable'
});

db.connect((err) => {
    if (err) {
        console.log(err);
        throw err;
    }
    console.log("my sql connected successfully");
});

app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));

app.get("/getall/:_page/:_per_page", (req, res) => {
    let sql = 'SELECT * FROM sampletable';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        let pages = {};
        if (result.length > 0) {
            pages = pagination.pager(req.params._page, req.params._per_page, result);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(pages);
    });
});

app.get("/search/:start_date/:end_date/:_page/:_per_page", (req, res) => {
    let sql = `SELECT * FROM sampletable where start_date >= replace('${req.params.start_date}','-','/') and end_date <= replace('${req.params.end_date}','-','/')`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        let pages = {};
        if (result.length > 0) {
            pages = pagination.pager(req.params._page, req.params._per_page, result);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(pages);
    });
});
app.listen(3000, () => {
    console.log("server started on port 3000");
});
