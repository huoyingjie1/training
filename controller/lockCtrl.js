const iot = require('alibabacloud-iot-device-sdk');
const Core = require('@alicloud/pop-core');
const device = iot.device({
    productKey: 'a1U37Uw7KZD', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'lock',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'f1d2cb34ae5f53c58aaf7c3e5ab110b1',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device.subscribe('/a1U37Uw7KZD/lock/user/get'); //subscribe从阿里云收到东西
    console.log('门锁连接成功!');
    device.publish('/a1U37Uw7KZD/lock/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === 'a1U37Uw7KZD/lock/user/get') {
        lockstatus = Number(payload);
    }
});
var lockstatus = 0;
var LockState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'LockState') { //判断是否设置的是LightSwitch属性
            console.log('门锁的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            LockState = cmd.params.LockState;
            lockstatus = Number(cmd.params.LockState);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (LockState == 1) {
                console.log('门锁从云端关闭');
            }
            else {
                console.log('门锁从云端打开');
            }
            device.postProps({ 'LockState': LockState });
        }
    }
})



const device1 = iot.device({
    productKey: 'a1OitLKNLCt', //将<productKey>修改为实际产品的ProductKey
    deviceName: 'door',//将<deviceName>修改为实际设备的DeviceName
    deviceSecret: 'f882ffa35df9d6a8f9109c61e877f3d3',//将<deviceSecret>修改为实际设备的DeviceSecret
});


//监听connect事件
device1.on('connect', () => {
    //将<productKey> <deviceName>修改为实际值
    device1.subscribe('/a1OitLKNLCt/door/user/get'); //subscribe从阿里云收到东西
    console.log('门连接成功!');
    device1.publish('/a1OitLKNLCt/door/user/update', 'hello world!');//publish发消息给谁
});

//监听message事件
device1.on('message', (topic, payload) => {
    console.log(topic, payload.toString());
    if (topic === '/a1OitLKNLCt/door/user/get') {
        doorstatus = Number(payload);
    }
});
var doorstatus = 0;
var DoorOpeningState = 0;
// 监听云端设置属性服务消息，示例代码为一个灯
device1.onProps((cmd) => {
    console.log('>>>onProps', cmd); //打印完整的属性设置消息
    for (var key in cmd.params) {
        if (key == 'DoorOpeningState') { //判断是否设置的是LightSwitch属性
            console.log('门的状态 ', key);
            //示例代码将云端设置的属性在本地进行保存，实际产品开发时需要修改为去将灯打开或者关闭
            DoorOpeningState = cmd.params.DoorOpeningState;
            doorstatus = Number(cmd.params.DoorOpeningState);
            //本地设置完毕之后，将更新后的状态报告给云端。
            //注意：云端下发命令后，云端属性的值并不会改变，云端需要等待来自设备端的属性上报
            if (DoorOpeningState == 0) {
                console.log('门从云端关闭');
            }
            else {
                console.log('门从云端打开');
            }
            device1.postProps({ 'DoorOpeningState': DoorOpeningState });
        }
    }
})
module.exports = {
    report: function (req, resp) {
        // 获取PT上报的id和状态
        const id = req.params['id'];
        const door_status = req.params['door_status'];
        const lock_status = req.params['lock_status'];
        device.postProps({
            LockState : Number(lock_status)
        }, (res) => {
            // console.log(res); 
        });

        device1.postProps({
            DoorOpeningState:Number(door_status)
        }, (res) => {
            // console.log(res); 
        });
        // 创建应答对象 
        if(lockstatus===0){
            doorstatus=0;
        }
        const obj = {
            id: id,
            success: true, // 是否成功 
            lockstatus: lockstatus, // 将云服务器的设备状态放入status字段里 
            doorstatus: doorstatus
        };
        // 发送给PT 
        resp.write(JSON.stringify(obj));
        // 结束应答 
        resp.end();
    },

}