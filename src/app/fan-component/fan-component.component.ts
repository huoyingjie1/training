import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-fan-component',
  templateUrl: './fan-component.component.html',
  styleUrls: ['./fan-component.component.css']
})
export class FanComponentComponent implements OnInit, OnDestroy {

  fan$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.fan$ = this.deviceService.getFan();
    },2000);

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleFan(1).subscribe(
      () => {
        console.log('Turn on fan');
        timer(1500).subscribe(() => {
          this.fan$ = this.deviceService.getFan();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleFan(0).subscribe(
      () => {
        console.log('Turn off fan');
        timer(1500).subscribe(
          () => {
            this.fan$ = this.deviceService.getFan();
          }
        );
      }
    );
  }
}
