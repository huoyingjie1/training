const iot = require('alibabacloud-iot-device-sdk');
const Core = require('@alicloud/pop-core');
const container = require('rhea');
const crypto = require('crypto');
const device5 = iot.device({
    productKey: 'a1SwjEhqQ3j', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'hyj123456',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'd9794a99458d1e7c77808cb8c7d0bb58',//将<deviceSecret>修改为实际设备的DeviceSecret
});

const ledSubTopic = 'a1SwjEhqQ3j/hyj123456/user/get'
//监听connect事件
device5.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device5.subscribe('/a1SwjEhqQ3j/hyj123456/user/get'); //subscribe从阿里云收到东西
    console.log('路灯连接成功!');
    device5.publish('/a1SwjEhqQ3j/hyj123456/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device5.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === ledSubTopic) {
        aliLedStatus = Number(payload);
    }
});
var aliLedStatus = 0;
var LightStatus = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device5.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LightStatus') { //判断是否设置的是LightSwitch属性
            console.log('灯的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            LightStatus = cmd.params.LightStatus;
            aliLedStatus = Number(cmd.params.LightStatus);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (LightStatus == 0) {
                console.log('灯从云端关闭');
            }
            else {
                console.log('灯从云端打开');
            }
            device5.postProps({ 'LightStatus': LightStatus });
        }
    }
})



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

var lockstatus = 0;
container.on('message', function (context) {
    var msg = context.message;
    var messageId = msg.message_id;
    var topic = msg.application_properties.topic;
    var obj = Buffer.from(msg.body.content);
    var content = obj.toString();
    if (topic === '/a1U37Uw7KZD/lock/thing/event/property/post') {
        const resp = JSON.parse(content);
        lockstatus =resp.items.LockState.value;
    }
    context.delivery.accept();
});

function hmacSha1(key, context) {
    return Buffer.from(crypto.createHmac('sha1', key).update(context).digest()).toString('base64');
}

module.exports = {
    report: function (req, resp) {
        // 获取PT上报的id和状态
        const id = req.params['id'];
        const led_status = req.params['led_status'];

        device5.postProps({
            LightStatus: Number(led_status)
        }, (res) => {
            // console.log(res); 
        });

        // 创建应答对象 
        const obj = {
            id: id,
            success: true, // 是否成功 
            status: aliLedStatus, // 将云服务器的设备状态放入status字段里
            lock_status:lockstatus, 
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },

    update: function (req, resp) {
        const obj = req.body;
        const items = {
            LightStatus: obj.status
        };
        var params = {
            "RegionId": "cn-shanghai",
            "Items": JSON.stringify(items),
            "ProductKey": "a1SwjEhqQ3j",
            "DeviceName": "hyj123456"
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
    select: function (req, resp) {
        var params = {
            "RegionId": "cn-shanghai",
            "ProductKey": "a1SwjEhqQ3j",
            "DeviceName": "hyj123456"
        }
        var requestOption = {
            method: 'POST'
        };
        client.request('QueryDevicePropertyStatus', params, requestOption).then((result) => {
            if (result.Success) {
                for (let statusInfo of result.Data.List.PropertyStatusInfo) {
                    if (statusInfo.Identifier === 'LightStatus') {
                        LightStatus = Number(statusInfo.Value);
                        console.log(LightStatus);
                        // 这里设置获得的属性值 
                    }
                }
            }
        }, (ex) => {
            console.log(ex);
        });
        var result = {
            succ: true,
            status: LightStatus
        };
        resp.send(JSON.stringify(result));
        resp.end();
    },
}