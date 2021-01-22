import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-humidifier-component',
  templateUrl: './humidifier-component.component.html',
  styleUrls: ['./humidifier-component.component.css']
})
export class HumidifierComponentComponent implements OnInit, OnDestroy {

  humidifier$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.humidifier$ = this.deviceService.getHumidifier();
    },2000);

  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleHumidifier(1).subscribe(
      () => {
        console.log('Turn on humidifier');
        timer(1500).subscribe(() => {
          this.humidifier$ = this.deviceService.getHumidifier();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleHumidifier(0).subscribe(
      () => {
        console.log('Turn off humidifier');
        timer(1500).subscribe(
          () => {
            this.humidifier$ = this.deviceService.getHumidifier();
          }
        );
      }
    );
  }
}
