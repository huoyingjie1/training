"use strict";
const mysql = require('mysql');
const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const logger = require("morgan");
app.use(logger("dev"));
app.use(bodyParser.urlencoded());
const container = require('rhea');
const crypto = require('crypto');
const Core = require('@alicloud/pop-core');
const iot = require('alibabacloud-iot-device-sdk');


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length,Authorization,Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,Post,Get,DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
//----------------------------端口号------------------------------------
app.listen(8080, function () {
    console.log('服务器在8080端口启动');
});

//-----------------------------------用户登录验证和增删改查----------------------

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



//查询所有用户数据
app.get('/users', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM users";
    connection.query(sql, function (err, result) {
        console.log(result);
        resp.send(result);
    });
});

//查询单个用户数据
app.get('/users/:id', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM users";
    connection.query(sql, function (err, result) {
        console.log(req.params);
        const id = req.params.id;
        for (let user of result) {
            if (user.id === id) {
                resp.send([user]);
                break;
            }
        }
        resp.end();


    });
});


//添加用户数据数据
app.post('/user', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "INSERT INTO users (id,userName,password) VALUES (?,?,?)";
    connection.query(sql, [req.body.id, req.body.userName, req.body.password], function (err, result) {
        console.log(req.body);
        resp.send({ succ: true });
        resp.end();

    });
});

//修改用户
app.put('/user', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "UPDATE users SET userName=?,password=? WHERE id=?";
    connection.query(sql, [req.body.userName, req.body.password, req.body.id], function (err, result) {

        console.log(req.body);
        resp.send();
        resp.end();
    });
});

//删除用户
app.delete('/user/:id', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "DELETE  FROM  users WHERE id=?";
    connection.query(sql, [req.params.id], function (err, result) {
        console.log(req.params);
        resp.send();
        resp.end();
    });
});


//---------------------------------温湿度传感器---------------------------------

//device1是空调温湿度
const device1 = iot.device({
    productKey: 'a1ZbtZBOr79', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'tem_hum',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '3833d649033f798435cadb1b37fc6c5b',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device1.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device1.subscribe('/a1ZbtZBOr79/tem_hum/user/get'); //subscribe从阿里云收到东西
    console.log('connect successfully!');
    device1.publish('/a1ZbtZBOr79/tem_hum/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device1.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === '/a1ZbtZBOr79/tem_hum/user/get') {
        CurrentHumidity = Number(payload.humidity);
        CurrentTemperature = Number(payload.temperature);
    }
});

//device4是风扇温湿度
const device4 = iot.device({
    productKey: 'a1BN9yhZDRZ', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'tem_hum_1',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'b080a907c0be21ab1ba9c4a896ae8d9f',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device4.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device4.subscribe('/a1BN9yhZDRZ/tem_hum_1/user/get'); //subscribe从阿里云收到东西
    console.log('connect successfully!');
    device4.publish('/a1BN9yhZDRZ/tem_hum_1/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device4.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === '/a1BN9yhZDRZ/tem_hum_1/user/get') {
        CurrentHumidity = Number(payload.humidity);
        CurrentTemperature = Number(payload.temperature);
    }
});




//-------------------------------------air空调机-----------------------------------------------
const device2 = iot.device({
    productKey: 'a1bvhxLEenr', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'air_2',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '20a87f2dd8ac7dab439ea703418edad7',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device2.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device2.subscribe('/a1bvhxLEenr/air_2/user/get'); //subscribe从阿里云收到东西
    console.log('connect successfully!');
    device2.publish('/a1bvhxLEenr/air_2/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device2.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === 'a1bvhxLEenr/air_2/user/get') {
        airStatus = Number(payload);
    }
});
var PowerSwitch1 = 0;
var airStatus = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device2.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('空调的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            PowerSwitch1 = cmd.params.PowerSwitch;
            airStatus = Number(cmd.params.PowerSwitch);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (PowerSwitch1 == 0) {
                console.log('空调从云端关闭');
            }
            else {
                console.log('空调从云端打开');
            }
            device2.postProps({ 'PowerSwitch': PowerSwitch1 });
        }
    }
})

//连接阿里云iot studio和pt
app.put('/tem/:id/:air_status/:temperature/:humidity', function (req, resp) {
    // 获取PT上报的id和状态
    const id = req.params['id'];
    const air_status = req.params['air_status'];
    const humidity = req.params['humidity'];
    const temperature = req.params['temperature'];
    // 打印id和状态
    console.log(id);
    console.log(air_status);
    console.log(humidity);
    console.log(temperature);

    device1.postProps({
        CurrentHumidity: Number(humidity),
        CurrentTemperature: Number(temperature),
    }, (res) => {
        console.log(res);
    });

    device2.postProps({
        PowerSwitch: Number(air_status)
    }, (res) => {
        console.log(res);
    });
    const obj = {
        id: id,
        success: true, // 是否成功 
        status: airStatus, // 将云服务器的设备状态放入status字段里 
        humidity: humidity,
        temperature: temperature,
    };
    // 创建应答对象 

    // 发送给PT 
    resp.write(JSON.stringify(obj));
    // 结束应答 
    resp.end();
});
//------------------------------------------------------------------------------------------


//-----------------------------------------------风扇--------------------------------------
const device3 = iot.device({
    productKey: 'a1rsSvDc3Ur', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'fan_1',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'ac5e74e134f2cee1ceccfe380baf82ae',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device3.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device3.subscribe('/a1rsSvDc3Ur/fan_1/user/get'); //subscribe从阿里云收到东西
    console.log('connect successfully!');
    device3.publish('/a1rsSvDc3Ur/fan_1/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device3.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === '/a1rsSvDc3Ur/fan_1/user/get') {
        fanStatus = Number(payload);
    }
});

var PowerSwitch2 = 0;
var fanStatus = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device3.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('风扇的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            PowerSwitch2 = cmd.params.PowerSwitch;
            fanStatus = Number(cmd.params.PowerSwitch);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (PowerSwitch2 == 0) {
                console.log('风扇从云端关闭');
            }
            else {
                console.log('风扇从云端打开');
            }
            device3.postProps({ 'PowerSwitch': PowerSwitch2 });
        }
    }
})

//连接阿里云iot studio和pt
app.put('/fan/:id/:fan_status/:temperature/:humidity', function (req, resp) {
    // 获取PT上报的id和状态
    const id = req.params['id'];
    const fan_status = req.params['fan_status'];
    const humidity = req.params['humidity'];
    const temperature = req.params['temperature'];

    // 打印id和状态
    console.log(id);
    console.log(fan_status);
    console.log(humidity);
    console.log(temperature);

    device4.postProps({
        CurrentHumidity: Number(humidity),
        CurrentTemperature: Number(temperature),
    }, (res) => {
        console.log(res);
    });

    device3.postProps({
        PowerSwitch: Number(fan_status)
    }, (res) => {
        console.log(res);
    });
    const obj = {
        id: id,
        success: true, // 是否成功 
        status: fanStatus, // 将云服务器的设备状态放入status字段里 
        temperature:temperature,
        humidity:humidity,
    };
    // 创建应答对象 

    // 发送给PT 
    resp.write(JSON.stringify(obj));
    // 结束应答 
    resp.end();
});
//----------------------------------------------------------------------------------------------



//----------------------------------------阿里云上的数据回调-------------------------------------


var client = new Core({
    accessKeyId: 'LTAI4FhM9xDGqiFcrYvSyDvJ',
    accessKeySecret: 'XR1TfgKPKByC5860sx8CBkWdJ1rJgt',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});


const dt = new Date();
var connection = container.connect({
    //接入域名，请参见AMQP客户端接入说明文档。 
    'host': '1050368617544906.iot-amqp.cn-shanghai.aliyuncs.com', //${YourHost}
    'port': 5671,
    'transport': 'tls',
    'reconnect': true,
    'idle_time_out': 60000,
    //userName组装方法，请参见AMQP客户端接入说明文档。其中的iotInstanceId，购买的实例请填写实例ID，公共实例请填 空字符串""。 

    'username': '00-F4-8D-6F-92-6F|authMode=aksign,signMethod=hmacsha1,timestamp=' + dt.getTime() + ',authId=LTAI4FhM9xDGqiFcrYvSyDvJ,iotInstanceId=,consumerGroupId=DEFAULT_GROUP|',

    //计算签名，password组装方法，请参见AMQP客户端接入说明文档。 
    'password': hmacSha1('XR1TfgKPKByC5860sx8CBkWdJ1rJgt', //${YourAccessKeySecret}
        'authId=LTAI4FhM9xDGqiFcrYvSyDvJ&timestamp=' + dt.getTime()), // authId=${accessKey}&timestamp=1573489088171。
});

//创建Receiver连接。 
var receiver = connection.open_receiver();

//接收云端推送消息的回调函数。 
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var obj = Buffer.from(msg.body.content);
    var content = obj.toString();

    console.log(topic);
    console.log(content);
    if (topic === '/a1bvhxLEenr/air_2/thing/event/property/post') { //获取空调机回调函数
        //const resp = JSON.parse(content); 
        //ws.send2All(Number(resp.items.LightStatus.value)); 
        //devDao.receiveUpdate(Number(resp.items.LightStatus.value)); 
        // led.status = resp.items.LightStatus.value;
        // 针对msg.body.content进行简单的处理 
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。 
    context.delivery.accept();
});

//接收云端推送消息的回调函数。 
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var obj = Buffer.from(msg.body.content);
    var content = obj.toString();

    console.log(topic);
    console.log(content);
    if (topic === '/a1rsSvDc3Ur/fan_1/thing/event/property/post') { //获取风扇回调函数
        //const resp = JSON.parse(content); 
        //ws.send2All(Number(resp.items.LightStatus.value)); 
        //devDao.receiveUpdate(Number(resp.items.LightStatus.value)); 
        // led.status = resp.items.LightStatus.value;
        // 针对msg.body.content进行简单的处理 
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。 
    context.delivery.accept();
});

//接收云端推送消息的回调函数。 
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var obj = Buffer.from(msg.body.content);
    var content = obj.toString();

    console.log(topic);
    console.log(content);
    if (topic === '/a1ZbtZBOr79/tem_hum/thing/event/property/post') { //获取空调温湿度回调函数并将数据上传到数据库
        const resp = JSON.parse(content);
        const year = dt.getFullYear(); 
        const month = dt.getMonth()+1;
        const day = dt.getDate();
        const hour = dt.getHours();
        const minute = dt.getMinutes();
        const seconds = dt.getSeconds();
        const time = year+'/'+month+'/'+day+' '+hour+":"+minute+':'+seconds;
        console.log(time,Number(resp.items.CurrentTemperature.value));
        console.log(time,Number(resp.items.CurrentHumidity.value));
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });
        connection.connect();
        var sql1 = "INSERT INTO temperature (time,temperature) VALUES (?,?)";
        connection.query(sql1, [time,Number(resp.items.CurrentTemperature.value)], function (err, result) {
        });

        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            port: '3306',
            database: 'lm1'
        });
        connection.connect();
        var sql2 = "INSERT INTO humidity (time,humidity) VALUES (?,?)";
        connection.query(sql2, [time,Number(resp.items.CurrentHumidity.value)], function (err, result) {
        });

        //ws.send2All(Number(resp.items.LightStatus.value)); 
        //devDao.receiveUpdate(Number(resp.items.LightStatus.value)); 
        // led.status = resp.items.LightStatus.value;
        // 针对msg.body.content进行简单的处理 
    }
    //发送ACK，注意不要在回调函数有耗时逻辑。 
    context.delivery.accept();
});



//计算password签名。 s
function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest()).toString('base64');
}
//-----------------------------------------------------------------------------------------------


//----------------------------------------连接阿里云----------------------------------------------
//设置空调机属性
app.post('/device1', function (req, resp) {
    const obj = req.body;
    const items = {
        PowerSwitch: obj.status
    };
    var params = {
        "RegionId": "cn-shanghai",
        "Items": JSON.stringify(items),
        "ProductKey": "a1bvhxLEenr",
        "DeviceName": "air_2"
    }
    var requestOption = {
        method: 'POST'
    };
    client.request('SetDeviceProperty', params, requestOption).then((result) => {
        console.log(JSON.stringify(result));
    }, (ex) => {
        console.log(ex);
    });
    var result = {
        succ: true
    };
    resp.send(JSON.stringify(result));
});

//得到空调机属性
app.get('/device1', function (req, resp) {
    var params = {
        "RegionId": "cn-shanghai",
        "ProductKey": "a1bvhxLEenr",
        "DeviceName": "air_2"
    }
    var requestOption = {
        method: 'POST'
    };
    client.request('QueryDevicePropertyStatus', params, requestOption).then((result) => {
        if (result.Success) {
            for (let statusInfo of result.Data.List.PropertyStatusInfo) {
                if (statusInfo.Identifier === 'PowerSwitch') {
                    PowerSwitch1 = Number(statusInfo.Value);
                    console.log(PowerSwitch1);
                    // 这里设置获得的属性值 
                }
            }
        }
    }, (ex) => {
        console.log(ex);
    });
    var result = {
        succ: true,
        status:PowerSwitch1
    };
    resp.send(JSON.stringify(result));
});



//设置风扇属性
app.post('/device2', function (req, resp) {
    const obj = req.body;
    const items = {
        PowerSwitch: obj.status
    };
    var params = {
        "RegionId": "cn-shanghai",
        "Items": JSON.stringify(items),
        "ProductKey": "a1rsSvDc3Ur",
        "DeviceName": "fan_1"
    }
    var requestOption = {
        method: 'POST'
    };
    client.request('SetDeviceProperty', params, requestOption).then((result) => {
        console.log(JSON.stringify(result));
    }, (ex) => {
        console.log(ex);
    });
    var result = {
        succ: true
    };
    resp.send(JSON.stringify(result));
});

//得到风扇属性
app.get('/device2', function (req, resp) {
    var params = {
        "RegionId": "cn-shanghai",
        "ProductKey": "a1rsSvDc3Ur",
        "DeviceName": "fan_1"
    }
    var requestOption = {
        method: 'POST'
    };
    client.request('QueryDevicePropertyStatus', params, requestOption).then((result) => {
        if (result.Success) {
            for (let statusInfo of result.Data.List.PropertyStatusInfo) {
                if (statusInfo.Identifier === 'PowerSwitch') {
                    PowerSwitch2 = Number(statusInfo.Value);
                    console.log(PowerSwitch2);
                    // 这里设置获得的属性值 
                }
            }
        }
    }, (ex) => {
        console.log(ex);
    });
    var result = {
        succ: true,
        status:PowerSwitch2
    };
    resp.send(JSON.stringify(result));
});


//-----------------------------------设备增删改查--------------------------------------


//查询所有用户数据
app.get('/device', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        console.log(result);
        resp.send(result);
    });
});

//查询单个用户数据
app.get('/device/:id', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM device";
    connection.query(sql, function (err, result) {
        console.log(req.params);
        const id = req.params.id;
        for (let device of result) {
            if (device.id === id) {
                resp.send([device]);
                break;
            }
        }
        resp.end();


    });
});


//添加用户数据数据
app.post('/device', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "INSERT INTO device (id,name,type,status) VALUES (?,?,?,?)";
    connection.query(sql, [req.body.id, req.body.name, req.body.type,req.body.status], function (err, result) {
        console.log(req.body);
        resp.send({ succ: true });
        resp.end();

    });
});

//修改用户
app.put('/device', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "UPDATE device SET name=?,type=?,status=? WHERE id=?";
    connection.query(sql, [req.body.name, req.body.type,req.body.status, req.body.id], function (err, result) {

        console.log(req.body);
        resp.send();
        resp.end();
    });
});

//删除用户
app.delete('/device/:id', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "DELETE  FROM  device WHERE id=?";
    connection.query(sql, [req.params.id], function (err, result) {
        console.log(req.params);
        resp.send();
        resp.end();
    });
});
//------------------------------------------------------------------------------------------------------


//---------------------------------------------读取数据库中的温湿度数据到angular-----------------------------------
//查询温度数据
app.get('/temperature', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM temperature";
    connection.query(sql, function (err, result) {
        console.log(result);
        var time =[];
        var data =[];
        for(var i = 0;i<result.length;i++){
            time[i] = result[i].time;
            data[i] = result[i].temperature;
        }
        console.log({time,data})
        resp.send(time+"&"+data);
    });
});




//查询湿度数据
app.get('/humidity', function (req, resp) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'lm1'
    });
    connection.connect();
    var sql = "SELECT * FROM humidity";
    connection.query(sql, function (err, result) {
        console.log(result);
        var time =[];
        var data =[];
        for(var i = 0;i<result.length;i++){
            time[i] = result[i].time;
            data[i] = result[i].humidity;
        }
        console.log({time,data})
        resp.send(time+"&"+data);
    });
});
