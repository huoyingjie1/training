const express = require("express");
const route = express.Router();
const userCtrl = require("../controller/userCtrl");
const airCtrl = require("../controller/airCtrl");
const fanCtrl = require("../controller/fanCtrl");
const ledCtrl = require("../controller/ledCtrl");
const webcamCtrl = require("../controller/webcamCtrl");
const lockCtrl = require("../controller/lockCtrl");
const humidifierCtrl = require("../controller/humidifierCtrl");
const selectTemHum2 = require("../controller/selectTemHum2");
const selectTemHum1 = require("../controller/selectTemHum1");
const alarmCtrl = require("../controller/alarmCtrl");
const fireCtrl = require("../controller/fireCtrl");
const waterCtrl = require("../controller/waterCtrl");
console.log("路由开启");

//用户
route.get("/users",userCtrl.seleteAll);
route.get("/users/:id",userCtrl.seleteOnly);
route.post("/user",userCtrl.add);
route.put("/user",userCtrl.update);
route.delete("/user/:id",userCtrl.delete);


//空调与温湿度
route.put("/tem/:id/:air_status/:temperature/:humidity",airCtrl.report);


//加湿器与温湿度
route.put("/hum/:id/:hum_status/:temperature/:humidity",humidifierCtrl.report);


//风扇
route.put("/fan/:id/:fan_status",fanCtrl.report);

//led
route.put("/led/:id/:led_status",ledCtrl.report);
route.post("/device3",ledCtrl.update);
route.get("/device3",ledCtrl.select);

//空调温湿度曲线
route.get("/tem_hum1",selectTemHum1.select);

//加湿器温湿度曲线
route.get("/tem_hum2",selectTemHum2.select);

//摄像头
route.put("/webcam/:id/:webcam_status/:alarmevent",webcamCtrl.report);
route.post("/device4",webcamCtrl.update);
route.get("/device4",webcamCtrl.select);

//门锁
route.put("/door/:id/:door_status/:lock_status",lockCtrl.report);


//报警器
route.put("/alarm/:id/:alarm_status",alarmCtrl.report);
route.post("/device8",alarmCtrl.update);
route.get("/device8",alarmCtrl.select);

//火灾
route.put("/fire/:id/:fire_status",fireCtrl.report);


//喷水器
route.put("/water/:id/:water_status",waterCtrl.report);
route.post("/device10",waterCtrl.update);
route.get("/device10",waterCtrl.select);



module.exports = route

