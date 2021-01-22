import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../device.service';
import * as echarts from 'echarts';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-display-component',
  templateUrl: './display-component.component.html',
  styleUrls: ['./display-component.component.css']
})
export class DisplayComponentComponent implements OnInit, OnDestroy {
  fan$ = null;
  air$ = null;
  led$ = null;
  webcam$ = null;
  lock$ = null;
  door$ = null;
  humidifier$ = null;
  alarm$ = null;
  fire$ = null;
  water$ = null;
  interval1 = null;
  interval2 = null;
  interval3 = null;
  interval4 = null;
  constructor(private deviceService: DeviceService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.interval4 = setInterval(() => {
      this.air$ = this.deviceService.getAir();
      this.fan$ = this.deviceService.getFan();
      this.led$ = this.deviceService.getLed();
      this.webcam$ = this.deviceService.getWebcam();
      this.lock$ = this.deviceService.getLock();
      this.door$ = this.deviceService.getDoor();
      this.humidifier$ = this.deviceService.getHumidifier();
      this.alarm$ = this.deviceService.getAlarm();
      this.fire$ = this.deviceService.getFire();
      this.water$ = this.deviceService.getWater();
    },2000);
    this.TEMinitCharts1();
    this.TEMinitCharts2();
    this.PieinitCharts();
  }
  ngOnDestroy() {
    if (this.interval1) {
      clearInterval(this.interval1);
      this.interval1 = null;
    }
    if (this.interval2) {
      clearInterval(this.interval2);
      this.interval2 = null;
    }
    if (this.interval3) {
      clearInterval(this.interval3);
      this.interval3 = null;
    }
  }
  TEMinitCharts1() {

    this.interval1 = setInterval(() => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // 表示HTTP请求成果
          var sz = this.responseText.split("&");
          let time = [];
          let dataTem = [];
          let dataHum = [];
          time = sz[0].split(",");
          dataTem = sz[1].split(",");
          dataHum = sz[2].split(",");
          const ec = echarts as any;
          const lineChart = ec.init(document.getElementById('lineChart1'));

          const lineChartOption = {
            title: {
              text: '空调温湿度曲线图'
            },
            xAxis: {
              type: 'category',
              data: time,
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              data: dataTem,
              type: 'line',
            },
            {
              data: dataHum,
              type: 'line',
            }]
          }
          lineChart.setOption(lineChartOption);
        }
      };
      xhttp.open("GET", "http://192.168.43.177:8080/tem_hum1", true);
      xhttp.send();
    }, 2000);



  }

  TEMinitCharts2() {
    this.interval2 = setInterval(() => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // 表示HTTP请求成果
          var sz = this.responseText.split("&");
          let time = [];
          let dataTem = [];
          let dataHum = [];
          time = sz[0].split(",");
          dataTem = sz[1].split(",");
          dataHum = sz[2].split(",");
          const ec = echarts as any;
          const lineChart = ec.init(document.getElementById('lineChart2'));

          const lineChartOption = {
            title: {
              text: '加湿器温湿度曲线图'
            },
            xAxis: {
              type: 'category',
              data: time,
            },
            yAxis: {
              type: 'value',
            },
            series: [{
              data: dataTem,
              type: 'line',
            },
            {
              data: dataHum,
              type: 'line',
            }]
          }
          lineChart.setOption(lineChartOption);
        }
      };
      xhttp.open("GET", "http://192.168.43.177:8080/tem_hum2", true);
      xhttp.send();
    }, 2000);
  }

  PieinitCharts() {
    this.interval3 = setInterval(() => {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // 表示HTTP请求成果
          const sz = this.responseText.split("&");;
          var on = sz[0];
          var off = sz[1];
          const ec = echarts as any;
          const lineChart = ec.init(document.getElementById('lineChart3'));

          const lineChartOption = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 10,
              data: ['在线设备', '下线设备']
            },
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: ['50%', '70%'],
                avoidLabelOverlap: false,
                label: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                },
                labelLine: {
                  show: false
                },
                data: [
                  { value: on, name: '在线设备' },
                  { value: off, name: '掉线设备' },
                ]
              }
            ]
          }
          lineChart.setOption(lineChartOption);
        }
      };
      xhttp.open("GET", "http://192.168.43.177:8000/pie", true);
      xhttp.send();

    }, 2000);
  }

  logout() {
    this.authService.logout();
  }
}
