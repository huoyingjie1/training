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


var params = {
    "RegionId": "cn-shanghai",
    "CurrentPage": 1,
    "PageSize": 20,
}
var requestOption = {
    method: 'POST'
};
setInterval(function(){
    client.request('QueryProductList', params, requestOption).then((result) => {
        //console.log(JSON.stringify(result));
        var hyj = JSON.stringify(result.Data.List.ProductInfo);
        var obj = JSON.parse(hyj);
        //console.log(obj);
        var data = [];
        for (let i = 0; i < obj.length; i++) {
            var a = 0;
            a = [obj[i].GmtCreate, obj[i].ProductName, obj[i].NodeType, obj[i].DataFormat, obj[i].AuthType, obj[i].ProductKey, obj[i].DeviceCount];
            data.push(a);
        }
        dao.getStuDao("DELETE  FROM  product",function(err,result){
            return;
        });
        dao.getStuDao("INSERT INTO product (GmtCreate,ProductName,NodeType,DataFormat,AuthType,ProductKey,DeviceCount) VALUES ?", [data], 
        function (err, result) {
            return;
        });
    }, (ex) => {
        console.log(ex);
    });
},2000);


module.exports = {

    selectAll: function (req, resp) {
        console.log("查询所有");
        dao.getStuDao("SELECT * FROM product", function (err, result) {
            console.log(result);
            resp.send(result);
            resp.end();
        });
    },
    seleteOnly: function (req, resp) {
        console.log("查询id");//拦截get方法
        dao.getStuDao("SELECT * FROM product", function (err, result) {
            console.log(req.params);
            const id = req.params.GmtCreate;
            for (let product of result) {
                if (product.id === id) {
                    resp.send([product]);
                    break;
                }
            }
            resp.end();
        });
    },
    add:function(req,resp){
        console.log("添加");//拦截get方法
        var params = {
            "RegionId": "cn-shanghai",
            "NodeType": 0,
            "ProductName": req.body.ProductName,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('CreateProduct', params, requestOption).then((result) => {
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
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": req.params.ProductKey,
            "ProductName": req.params.ProductName,
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('DeleteProduct', params, requestOption).then((result) => {
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

}
