const express = require("express");
const route = express.Router();

const deviceCtrl = require("../aliyun/deviceCtrl");
const airCtrl = require("../aliyun/airCtrl");
const pieCtrl = require("../aliyun/pieCtrl");
const fanCtrl = require("../aliyun/fanCtrl");
const fireCtrl = require("../aliyun/fireCtrl");
const humidifierCtrl = require("../aliyun/humidifierCtrl");
const lockCtrl = require("../aliyun/lockCtrl");
const productCtrl = require("../aliyun/productCtrl");


//设备管理
route.get("/device",deviceCtrl.seleteAll);
route.get("/device/:id",deviceCtrl.seleteOnly);
route.post("/device",deviceCtrl.add);
route.delete("/device/:id/:productkey/:name",deviceCtrl.delete);

//产品管理
route.get("/product",productCtrl.selectAll);
route.get("/product/:id",productCtrl.seleteOnly);
route.post("/product",productCtrl.add);
route.delete("/product/:ProductName/:ProductKey",productCtrl.delete);


//空调
route.post("/device1",airCtrl.update);
route.get("/device1",airCtrl.select);

//风扇
route.post("/device2",fanCtrl.update);
route.get("/device2",fanCtrl.select);

//火灾
route.post("/device9",fireCtrl.update);
route.get("/device9",fireCtrl.select);

//加湿器
route.post("/device7",humidifierCtrl.update);
route.get("/device7",humidifierCtrl.select);

//门锁
route.post("/device5",lockCtrl.update);
route.get("/device5",lockCtrl.select);

//门
route.post("/device6",lockCtrl.update1);
route.get("/device6",lockCtrl.select1);

//设备统计与饼图
route.get("/pie",pieCtrl.select);

module.exports = route