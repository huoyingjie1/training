const dao = require("../Dao/dao");
const iot = require('alibabacloud-iot-device-sdk');
const Core = require('@alicloud/pop-core');
//device1是烟雾传感器
const device1 = iot.device({
    productKey: 'a1ry4yj6TnN', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'smoke',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '1799c70f4bf303469516fc4540842a43',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device1.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device1.subscribe('/a1ry4yj6TnN/smoke/user/get'); //subscribe从阿里云收到东西
    console.log('烟雾传感器连接成功!');
    device1.publish('/a1ry4yj6TnN/smoke/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device1.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === '/a1ry4yj6TnN/smoke/user/get') {
        firestatus = Number(payload.Alarm);
    }
});

var SmokeState = 0;
var firestatus = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device1.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'SmokeState') { //判断是否设置的是LightSwitch属性
            console.log('火警的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            SmokeState = cmd.params.SmokeState;
            firestatus = Number(cmd.params.SmokeState);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (SmokeState == 0) {
                console.log('火警从云端关闭');
            }
            else {
                console.log('火警从云端打开');
            }
            device1.postProps({ 'SmokeState': SmokeState });
        }
    }
})



module.exports = {
    report: function (req, resp) {

        // 获取PT上报的id和状态
        const id = req.params['id'];
        const fire_status = req.params['fire_status'];
        // 打印id和状态



        device1.postProps({
            SmokeState: Number(fire_status),
        }, (res) => {
            console.log(res);
        });
        const obj = {
            id: id,
            success: true, // 是否成功 
            status: firestatus, // 将云服务器的设备状态放入status字段里 
        };
        // 创建应答对象 

        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },

}