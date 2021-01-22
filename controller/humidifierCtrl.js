
const iot = require('alibabacloud-iot-device-sdk');

//加湿器
const device1 = iot.device({
    productKey: 'a1BN9yhZDRZ', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'tem_hum_2',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '48646014fc1dc9c1da851aeb2fde3f63',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device1.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device1.subscribe('/a1BN9yhZDRZ/tem_hum_2/user/get'); //subscribe从阿里云收到东西
    console.log('加湿器温湿度连接成功!');
    device1.publish('/a1BN9yhZDRZ/tem_hum_2/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device1.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === '/a1BN9yhZDRZ/tem_hum_2/user/get') {
        CurrentHumidity = Number(payload.humidity);
        CurrentTemperature = Number(payload.temperature);
    }
});

const device2 = iot.device({
    productKey: 'a1JXPbBGJXW', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'humidifier',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: '4e9d74c51e97555f02f7cac52531e71b',//将<deviceSecret>修改为实际设备的DeviceSecret
});

//监听connect事件
device2.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device2.subscribe('/a1JXPbBGJXW/humidifier/user/get'); //subscribe从阿里云收到东西
    console.log('加湿器连接成功!');
    device2.publish('/a1JXPbBGJXW/humidifier/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device2.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === 'a1JXPbBGJXW/humidifier/user/get') {
        humStatus = Number(payload);
    }
});
var PowerSwitch1 = 0;
var humStatus = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device2.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'PowerSwitch') { //判断是否设置的是LightSwitch属性
            console.log('加湿器的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            PowerSwitch1 = cmd.params.PowerSwitch;
            humStatus = Number(cmd.params.PowerSwitch);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (PowerSwitch1 == 0) {
                console.log('加湿器从云端关闭');
            }
            else {
                console.log('加湿器从云端打开');
            }
            device2.postProps({ 'PowerSwitch': PowerSwitch1 });
        }
    }
})



module.exports = {
    report: function (req, resp) {

        // 获取PT上报的id和状态
        const id = req.params['id'];
        const hum_status = req.params['hum_status'];
        const humidity = req.params['humidity'];
        const temperature = req.params['temperature'];


        device1.postProps({
            CurrentHumidity: Number(humidity),
            CurrentTemperature: Number(temperature),
        }, (res) => {
            console.log(res);
        });

        device2.postProps({
            PowerSwitch: Number(hum_status)
        }, (res) => {
            console.log(res);
        });
        const obj = {
            id: id,
            success: true, // 是否成功 
            status: humStatus, // 将云服务器的设备状态放入status字段里 
            humidity: humidity,
            temperature: temperature,
        };
        // 创建应答对象 

        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },
}