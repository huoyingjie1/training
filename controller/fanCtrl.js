const iot = require('alibabacloud-iot-device-sdk');
const Core = require('@alicloud/pop-core');

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
    console.log('风扇连接成功!');
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

module.exports = {
    report: function (req, resp) {
        // 获取PT上报的id和状态
        const id = req.params['id'];
        const fan_status = req.params['fan_status'];
        // 打印id和状态

        device3.postProps({
            PowerSwitch: Number(fan_status)
        }, (res) => {
            console.log(res);
        });
        const obj = {
            id: id,
            success: true, // 是否成功 
            status: fanStatus, // 将云服务器的设备状态放入status字段里 
        };
        // 创建应答对象 
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
}