const mysql = require("mysql");
const dao = require("../Dao/dao");

module.exports ={
    select:function(req,resp){
        dao.getStuDao("SELECT * FROM tem_hum1",function(err,result){
            var time = [];
            var dataTem = [];
            var dataHum = [];
            for (var i = 0; i < result.length; i++) {
                time[i] = result[i].time;
                dataTem[i] = result[i].temperature
                dataHum[i] = result[i].humidity;
            }
            resp.send(time + "&" + dataTem+"&"+dataHum);
            resp.end();
        });
    }
}