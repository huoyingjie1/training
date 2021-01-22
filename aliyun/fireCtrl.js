
const Core = require('@alicloud/pop-core');


var client = new Core({
    accessKeyId: 'LTAI4FhM9xDGqiFcrYvSyDvJ',
    accessKeySecret: 'XR1TfgKPKByC5860sx8CBkWdJ1rJgt',
    endpoint: 'https://iot.cn-shanghai.aliyuncs.com',
    apiVersion: '2018-01-20'
});
var SmokeState=0;
module.exports = {

    update:function(req,resp){
        const obj = req.body;
        const items = {
            SmokeState: obj.status,
        };
        var params = {
            "RegionId": "cn-shanghai",
            "Items": JSON.stringify(items),
            "ProductKey": "a1ry4yj6TnN",
            "DeviceName": "smoke"
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
        resp.end();
    },

    select:function(req,resp){
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": "a1ry4yj6TnN",
            "DeviceName": "smoke"
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('QueryDevicePropertyStatus', params, requestOption).then((result) => {
            if (result.Success) {
                for (let statusInfo of result.Data.List.PropertyStatusInfo) {
                    if (statusInfo.Identifier === 'SmokeState') {
                        SmokeState = Number(statusInfo.Value);
                        console.log(SmokeState);
                        // 这里设置获得的属性值 
                    }
                }
            }
        }, (ex) => {
            console.log(ex);
        });
        var result = {
            succ: true,
            status: SmokeState
        };
        resp.send(JSON.stringify(result));
        resp.end();
    },

    
}