import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as echarts from 'echarts';
@Component({
  selector: 'app-hum-component',
  templateUrl: './hum-component.component.html',
  styleUrls: ['./hum-component.component.css']
})


export class HumComponentComponent implements OnInit {

  constructor(private authService:AuthService) {
    
   }

   ngOnInit() {
    this.HUMinitCharts();
  }
  HUMinitCharts() {
    var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // 表示HTTP请求成果
            var sz=this.responseText.split("&");
            let time=[];
            let data=[];
            time=sz[0].split(",");
            data=sz[1].split(",");
            const ec = echarts as any;
            const lineChart = ec.init(document.getElementById('lineChart'));
        
            const lineChartOption = {
              title: {
                text: '湿度曲线图'
             },
              xAxis: {
                type: 'category',
                data: time,
              },
              yAxis: {
                type: 'value',
              },
              series: [{
                data: data,
                type: 'line',
              }]
            }
            lineChart.setOption(lineChartOption);
             
        }
    };
    xhttp.open("GET", "http://192.168.43.177:8080/humidity", true);
    xhttp.send();
  }
}