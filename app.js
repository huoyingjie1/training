"use strict";
const express = require('express');
const logger = require("morgan");
const bodyParser = require('body-parser');
const route = require("./routers/aliyunRouter");

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

const container = require('rhea');
const crypto = require('crypto');
const Core = require('@alicloud/pop-core');
const iot = require('alibabacloud-iot-device-sdk');
const mysql = require('mysql');

//---------------------------------------端口-----------------------------
app.listen(8000, function () {
    console.log('服务器在8000端口启动');
});
//----------------------------------------------------------------------

//----------------------------------------阿里云上的数据回调-------------------------------------


var client = new Core({
    accessKeyId: 'LTAI4FhM9xDGqiFcrYvSyDvJ',
    accessKeySecret: 'XR1TfgKPKByC5860sx8CBkWdJ1rJgt',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});


const dttime = new Date();
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。 
    'host': '1050368617544906.iot-amqp.cn-shanghai.aliyuncs.com', //${YourHost}
    'port': 5671,
    'transport': 'tls',
    'reconnect': true,
    'idle_time_out': 60000,
    //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId，购买的实例请填写实例ID，公共实例请填 空字符串""。 

    'username': '00-F4-8D-6F-92-6F|authMode=aksign,signMethod=hmacsha1,timestamp=' + dttime.getTime() + ',authId=LTAI4FhM9xDGqiFcrYvSyDvJ,iotInstanceId=,consumerGroupId=DEFAULT_GROUP|',

    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。 
    'password': hmacSha1('XR1TfgKPKByC5860sx8CBkWdJ1rJgt', //${YourAccessKeySecret}
        'authId=LTAI4FhM9xDGqiFcrYvSyDvJ&timestamp=' + dttime.getTime()), // authId=${accessKey}&timestamp=1573489088171。
});

//创建Receiver连接。 
var receiver = connection.open_receiver();

//接收云端推送消息的回调函数。
//空调 
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var obj = Buffer.from(msg.body.content);
    var content = obj.toString();

    //console.log(topic);
    //console.log(content);
    if (topic === '/a1bvhxLEenr/air_2/thing/event/property/post') { //获取空调机回调函数
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value,resp.iotId], function (err, result) {
        });
        connection.end();
        //const resp = JSON.parse(content); 
        //ws.send2All(Number(resp.items.LightStatus.value)); 
        //devDao.receiveUpdate(Number(resp.items.LightStatus.value)); 
        // led.status = resp.items.LightStatus.value;
        // 针对msg.body.content进行简单的处理 
        //动态增改，1.依赖aliyun、TSDB、MNS、Datav,2.TSDB---------influxDB、MQTT ---ActiveMQ
    }
    
    else if (topic === '/a1rsSvDc3Ur/fan_1/thing/event/property/post') { //获取风扇回调函数
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1SwjEhqQ3j/hyj123456/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.LightStatus.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.LightStatus.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.LightStatus.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1az4fyN9jT/webcam/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.AlarmSwitch.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.AlarmSwitch.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.AlarmSwitch.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1U37Uw7KZD/lock/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.LockState.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.LockState.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.LockState.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1OitLKNLCt/door/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.DoorOpeningState.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.DoorOpeningState.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.DoorOpeningState.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1JXPbBGJXW/humidifier/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.PowerSwitch.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1eu5XqqBnB/alarm/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.AlarmSwitch.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.AlarmSwitch.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.AlarmSwitch.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1P5LOZdBnU/water/thing/event/property/post') {
        const resp = JSON.parse(content);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });        
        connection.connect();
        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.WorkSwitch.value);
        var sql1 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql1, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.WorkSwitch.value], function (err, result) {
        });
        var sql2 = "UPDATE device SET productkey=?,name=?,type=?,status=? WHERE id=?";
        connection.query(sql2, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.WorkSwitch.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1ry4yj6TnN/smoke/thing/event/property/post') {
        const resp = JSON.parse(content);

        console.log(resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.SmokeState.value);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });
        connection.connect();
        var sql2 = "INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)";
        connection.query(sql2, [resp.iotId,resp.productKey,resp.deviceName,resp.deviceType,resp.items.SmokeState.value], function (err, result) {
        });
        var sql3 = "UPDATE device SET productkey=?,name=?,type=?,status WHERE id=?";
        connection.query(sql3, [resp.productKey,resp.deviceName,resp.deviceType,resp.items.SmokeState.value,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1ZbtZBOr79/tem_hum/thing/event/property/post') { //获取空调温湿度回调函数并将数据上传到数据库
        const resp = JSON.parse(content);
        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var hour = dt.getHours();
        var minute = dt.getMinutes();
        var seconds = dt.getSeconds();
        var time = year + '/' + month + '/' + day + ' ' + hour + ":" + minute + ':' + seconds;
        console.log(time, Number(resp.items.CurrentTemperature.value));
        console.log(time, Number(resp.items.CurrentHumidity.value));
        console.log(resp.iotId,resp.deviceName,resp.deviceType);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });
        connection.connect();
        var sql1 = "INSERT INTO tem_hum1 (time,temperature,humidity) VALUES (?,?,?)";
        connection.query(sql1, [time, Number(resp.items.CurrentTemperature.value),Number(resp.items.CurrentHumidity.value)], function (err, result) {
        });
        var sql2 = "INSERT INTO device (id,name,type) VALUES (?,?,?)";
        connection.query(sql2, [resp.iotId,resp.deviceName,resp.deviceType], function (err, result) {
        });
        var sql3 = "UPDATE device SET name=?,type=? WHERE id=?";
        connection.query(sql3, [resp.deviceName,resp.deviceType,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    else if (topic === '/a1BN9yhZDRZ/tem_hum_2/thing/event/property/post') { //获取空调温湿度回调函数并将数据上传到数据库
        const resp = JSON.parse(content);

        var dt = new Date();
        var year = dt.getFullYear();
        var month = dt.getMonth() + 1;
        var day = dt.getDate();
        var hour = dt.getHours();
        var minute = dt.getMinutes();
        var seconds = dt.getSeconds();
        var time = year + '/' + month + '/' + day + ' ' + hour + ":" + minute + ':' + seconds;
        console.log(time, Number(resp.items.CurrentTemperature.value));
        console.log(time, Number(resp.items.CurrentHumidity.value));
        console.log(resp.iotId,resp.deviceName,resp.deviceType);
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });
        connection.connect();
        var sql = "INSERT INTO tem_hum2 (time,temperature,humidity) VALUES (?,?,?)";
        connection.query(sql, [time, Number(resp.items.CurrentTemperature.value),Number(resp.items.CurrentHumidity.value)], function (err, result) {
        });
        var sql2 = "INSERT INTO device (id,name,type) VALUES (?,?,?)";
        connection.query(sql2, [resp.iotId,resp.deviceName,resp.deviceType], function (err, result) {
        });
        var sql3 = "UPDATE device SET name=?,type=? WHERE id=?";
        connection.query(sql3, [resp.deviceName,resp.deviceType,resp.iotId], function (err, result) {
        });
        connection.end();
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。 
    context.delivery.accept();
});


//计算password签名。 s
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest()).toString('base64');
}


