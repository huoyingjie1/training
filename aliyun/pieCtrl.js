const mysql = require("mysql");
const dao = require("../Dao/dao");
const Core = require('@alicloud/pop-core');


var client = new Core({
    accessKeyId: 'LTAI4FhM9xDGqiFcrYvSyDvJ',
    accessKeySecret: 'XR1TfgKPKByC5860sx8CBkWdJ1rJgt',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});

var params = {
    "RegionId": "cn-shanghai",
}
var requestOption = {
    method: 'POST'
};
setInterval(function(){
client.request('QueryDeviceStatistics', params, requestOption).then((result) => {
    
        console.log(JSON.stringify(result));
        const success =JSON.stringify(result.Success)
        const on = JSON.stringify(result.Data.onlineCount);
        const off = JSON.stringify(result.Data.deviceCount)-JSON.stringify(result.Data.onlineCount);
        dao.getStuDao("INSERT INTO pie (success,onlineCount,offCount) VALUES (?,?,?)", [success,on,off], function (err, result) {
            return;
        });
        dao.getStuDao("UPDATE pie SET success=?,onlineCount=?,offCount=?",[success,on,off],function(err,result){
            return;
        });
}, (ex) => {
    console.log(ex);
});
},2000);

module.exports ={
    select:function(req,resp){
        dao.getStuDao("SELECT * FROM pie",function(err,result){
            var on = result[0].onlineCount;
            var off = result[0].offCount;
            console.log(on,off)
            resp.send(on + "&" + off);
            resp.end();
        });
    }
}