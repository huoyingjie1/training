import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-water-component',
  templateUrl: './water-component.component.html',
  styleUrls: ['./water-component.component.css']
})
export class WaterComponentComponent implements OnInit, OnDestroy {

  water$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.water$ = this.deviceService.getWater();
    }, 2000);

  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleWater(1).subscribe(
      () => {
        console.log('Turn on water');
        timer(1500).subscribe(() => {
          this.water$ = this.deviceService.getWater();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleWater(0).subscribe(
      () => {
        console.log('Turn off water');
        timer(1500).subscribe(
          () => {
            this.water$ = this.deviceService.getWater();
          }
        );
      }
    );
  }
}
