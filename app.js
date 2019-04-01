const express = require('express');
const mysql = require('mysql');
const pagination = require('./pagination');
const bodyParser = require('body-parser');
const cors = require('cors');
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
    'Access-Control-Allow-Origin': '*',
}));

app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/getall/:pageData/:perPageData", (req, res) => {
    let sql = 'SELECT * FROM sampletable order by id desc';
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        let pages = {};
        if (result.length > 0) {
            pages = pagination.pager(req.params.pageData, req.params.perPageData, result);
        }

        res.send(pages);
    });
});

app.get("/search/:startDate/:endDate/:pageData/:perPageData", (req, res) => {
    let sql = `SELECT * FROM sampletable where startDate >= '${req.params.startDate}' and endDate <= '${req.params.endDate}' order by id desc`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        let pages = {};
        if (result.length > 0) {
            pages = pagination.pager(req.params.pageData, req.params.perPageData, result);
        }

        res.send(pages);
    });
});

app.post("/update", (req, res) => {
    let body = req.body;
    let sql = `UPDATE sampletable set city = '${body.city}',
    startDate = '${body.startDate}',endDate = '${body.endDate}',
    price = ${body.price}, status = '${body.status}', color = '${body.color}' where id = ${body.id}`;
    console.log(sql);
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

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

        res.send({ mesage: 'success', status: "00", id: result.insertId });
    })
});

app.get("/delete/:id", (req, res) => {
    let sql = `DELETE FROM sampletable WHERE id = ${req.params.id}`;
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }

        res.send({ mesage: 'success', status: "00" });
    })
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});
