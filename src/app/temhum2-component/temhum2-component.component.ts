import { Component, OnInit, OnDestroy } from '@angular/core';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-temhum2-component',
  templateUrl: './temhum2-component.component.html',
  styleUrls: ['./temhum2-component.component.css']
})
export class Temhum2ComponentComponent implements OnInit,OnDestroy {
  interval = null;
  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.TEMinitCharts();
  }
  ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  TEMinitCharts() {
    this.interval = setInterval(() => {
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
          const lineChart = ec.init(document.getElementById('lineChart'));

          const lineChartOption = {
            title: {
              text: '温湿度曲线图'
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
}
