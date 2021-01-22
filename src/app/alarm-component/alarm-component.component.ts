import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-alarm-component',
  templateUrl: './alarm-component.component.html',
  styleUrls: ['./alarm-component.component.css']
})
export class AlarmComponentComponent implements OnInit,OnDestroy {

  alarm$ = null;
  interval =null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() =>{
         this.alarm$ = this.deviceService.getAlarm(); 
    },2000);
  }
  ngOnDestroy(){
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  turnOn() {
    this.deviceService.toggleAlarm(1).subscribe(
      () => {
        console.log('Turn on alarm');
        timer(1500).subscribe(() => {
          this.alarm$ = this.deviceService.getAlarm();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleAlarm(0).subscribe(
      () => {
        console.log('Turn off alarm');
        timer(1500).subscribe(
          () => {
            this.alarm$ = this.deviceService.getAlarm();
          }
        );
      }
    );
    }
}
