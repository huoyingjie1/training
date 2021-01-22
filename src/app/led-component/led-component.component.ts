import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../device.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-led-component',
  templateUrl: './led-component.component.html',
  styleUrls: ['./led-component.component.css']
})
export class LedComponentComponent implements OnInit, OnDestroy {

  led$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.led$ = this.deviceService.getLed();
    }, 2000);

  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleLed(1).subscribe(
      () => {
        console.log('Turn on led');
        timer(1500).subscribe(() => {
          this.led$ = this.deviceService.getLed();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleLed(0).subscribe(
      () => {
        console.log('Turn off led');
        timer(1500).subscribe(
          () => {
            this.led$ = this.deviceService.getLed();
          }
        );
      }
    );
  }
}
