import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as echarts from 'echarts';

@Component({
  selector: 'app-devicestatus-component',
  templateUrl: './devicestatus-component.component.html',
  styleUrls: ['./devicestatus-component.component.css']
})
export class DevicestatusComponentComponent implements OnInit,OnDestroy {
interval =null;
  constructor(private fb: FormBuilder, private httpClient: HttpClient) {

  }

  ngOnInit() {
    this.PieinitCharts();
  }
  ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  PieinitCharts() {
    this.interval=setInterval(() =>{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          // 表示HTTP请求成果
          const sz = this.responseText.split("&");;
          var on = sz[0];
          var off = sz[1];
          const ec = echarts as any;
          const lineChart = ec.init(document.getElementById('lineChart'));

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

    },2000);
  }

}
