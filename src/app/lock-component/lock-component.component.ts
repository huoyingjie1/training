import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-lock-component',
  templateUrl: './lock-component.component.html',
  styleUrls: ['./lock-component.component.css']
})
export class LockComponentComponent implements OnInit, OnDestroy {
  lock$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.lock$ = this.deviceService.getLock();
    },2000);

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleLock(1).subscribe(
      () => {
        console.log('Turn on lock');
        timer(1500).subscribe(() => {
          this.lock$ = this.deviceService.getLock();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleLock(0).subscribe(
      () => {
        console.log('Turn off lock');
        timer(1500).subscribe(
          () => {
            this.lock$ = this.deviceService.getLock();
          }
        );
      }
    );
  }

}
