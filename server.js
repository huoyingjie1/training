"use strict";
const express = require('express');
const logger = require("morgan");
const bodyParser = require('body-parser');
const route = require("./routers/indexRouter");

const app = express();
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept,X-Requested-With,Cookie,Cookies");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") res.send(200);
    else next();
}); 
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + "/src"));
app.use(route);


const mysql = require('mysql');

//----------------------------端口号------------------------------------
app.listen(8080, function () {
    console.log('服务器在8080端口启动');
});
//----------------------------------------------------

//用户登录验证
app.post('/login', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM users";
    console.log(sql);
    console.log(req.body);
    connection.query(sql, function (err, result) {
        console.log("userName:" + req.body.userName + "," + "password:" + req.body.password);
        console.log(result);
        let founded = false;
        for (let user of result) {
            if (user.userName === req.body.userName) {
                if (user.password === req.body.password) {
                    founded = true;
                    break;
                }
                break;
            }
        }
        if (founded) {
            resp.send({ succ: true });
        }
        else {
            resp.send({ succ: false, msg: '没有找到用户!' });
        }
        resp.end();
    });
});

