const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('show', {mes:message});
});

app.get("/db", (req, res) => {
    db.serialize( () => {
        db.all("select name, title, level, combo from unit;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})

app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select name, title, level, combo from unit order by combo" + desc + " limit " + req.query.pop + ";";  
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})
app.get("/db/:id", (req, res) => {
db.serialize( () => {
db.all("select  title, level, combo from songs where unit_id=" + req.params.id + ";", (error, row) => {
if( error ) {
res.render('show', {mes:"エラーです"});
　　　　　　}
res.render('db', {data:row});
　　　　})
　　})
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});
app.listen(8080, () => console.log("Example app listening on port 8080!"));
