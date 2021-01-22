const mysql = require("mysql");
const dao = require("../Dao/dao");
const iot = require('alibabacloud-iot-device-sdk');
const Core = require('@alicloud/pop-core');


var client = new Core({
    accessKeyId: 'LTAI4FhM9xDGqiFcrYvSyDvJ',
    accessKeySecret: 'XR1TfgKPKByC5860sx8CBkWdJ1rJgt',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});

module.exports= {

    seleteAll:function(req,resp){
        console.log("查询所有");//拦截get方法
        dao.getStuDao("SELECT * FROM device",function(err,result){
            console.log(result);
            resp.send(result);
            resp.end();
        });
    },
    
    seleteOnly:function(req,resp){
        console.log("查询id");//拦截get方法
        dao.getStuDao("SELECT * FROM device",function(err,result){
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
    },

    add:function(req,resp){
        console.log("添加");//拦截get方法
        console.log(req.body.productkey);
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": req.body.productkey,
            "DeviceName": req.body.name,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('RegisterDevice', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            dao.getStuDao("INSERT INTO device (id,productkey,name,type,status) VALUES (?,?,?,?,?)",[req.body.id,req.body.productkey,req.body.name,req.body.type,req.body.status],function(err,result){
                console.log(req.body);
                return;
            });
        }, (ex) => {
            console.log(ex);
        });
        var result = {
            succ: true,
        };
        resp.send(JSON.stringify(result));
        resp.end();
    },

    delete:function(req,resp){
        console.log("删除");//拦截get方法
        console.log(req.params.productkey);
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": req.params.productkey,
            "DeviceName": req.params.name,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('DeleteDevice', params, requestOption).then((result) => {
            console.log(JSON.stringify(result));
            dao.getStuDao("DELETE  FROM  device WHERE id=?",[req.params.id],function(err,result){
                console.log(req.params);
                return;
            });
        }, (ex) => {
            console.log(ex);
        });
        var result = {
            succ: true,
        };
        resp.send(JSON.stringify(result));
        resp.end();
    },
/*
    update:function(req,resp){
        console.log("修改");
        dao.getStuDao("UPDATE device SET name=?,type=?,status=? WHERE id=?",[req.body.name, req.body.type, req.body.status, req.body.id],function(err,result){
            console.log(req.body);
            resp.end();
        });
    },*/
}
