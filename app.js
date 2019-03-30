const express = require('express');
const mysql = require('mysql');
let pagination = require('./pagination');
let bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getall/:_page/:_per_page", (req, res) => {
    let sql = 'SELECT * FROM sampletable order by id desc';
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
    let sql = `SELECT * FROM sampletable where start_date >= '${req.params.start_date}' and end_date <= '${req.params.end_date}' order by id desc`;
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

app.post("/update", (req, res) => {
    let body = req.body;
    let sql = `UPDATE sampletable set city = '${body.city}',
    start_date = '${body.start_date}',end_date = '${body.end_date}',
    price = ${body.price}, status = '${body.status}', color = '${body.color}' where id = ${body.id}`;
    console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({ mesage: 'success', status: "00" });
    });
});
app.post("/add", (req, res) => {
    let body = req.body;
    let sql = 'INSERT INTO sampletable SET ?';
    db.query(sql, body, (err, result) => {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({ mesage: 'success', status: "00", id: result.insertId });
    })
});

app.get("/delete/:id", (req, res) => {
    let sql = `DELETE FROM sampletable WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.setHeader('Content-Type', 'application/json');
        res.send({ mesage: 'success', status: "00" });
    })
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});
