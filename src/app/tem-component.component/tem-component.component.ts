import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import * as echarts from 'echarts';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-tem-component',
  templateUrl: './tem-component.component.html',
  styleUrls: ['./tem-component.component.css']
})


export class TemComponentComponent implements OnInit {

  constructor(private authService:AuthService,private httpClient: HttpClient) {
    
   }

   ngOnInit() {
     this.TEMinitCharts();
  }
  TEMinitCharts() {
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
                text: '温度曲线图'
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
    xhttp.open("GET", "http://192.168.43.177:8080/temperature", true);
    xhttp.send();
  }
}