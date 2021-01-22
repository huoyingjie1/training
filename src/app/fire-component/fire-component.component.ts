import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-fire-component',
  templateUrl: './fire-component.component.html',
  styleUrls: ['./fire-component.component.css']
})
export class FireComponentComponent implements OnInit, OnDestroy {

  fire$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.fire$ = this.deviceService.getFire();
    },2000);

  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleFire(1).subscribe(
      () => {
        console.log('Turn on fire');
        timer(1500).subscribe(() => {
          this.fire$ = this.deviceService.getFire();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleFire(0).subscribe(
      () => {
        console.log('Turn off fire');
        timer(1500).subscribe(
          () => {
            this.fire$ = this.deviceService.getFire();
          }
        );
      }
    );
  }
}
