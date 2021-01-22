import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-webcam-component',
  templateUrl: './webcam-component.component.html',
  styleUrls: ['./webcam-component.component.css']
})
export class WebcamComponentComponent implements OnInit, OnDestroy {

  webcam$ = null;
  interval = null;
  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.webcam$ = this.deviceService.getWebcam();
    }, 2000);
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleWebcam(1).subscribe(
      () => {
        console.log('Turn on webcam');
        timer(1500).subscribe(() => {
          this.webcam$ = this.deviceService.getWebcam();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleWebcam(0).subscribe(
      () => {
        console.log('Turn off webcam');
        timer(1500).subscribe(
          () => {
            this.webcam$ = this.deviceService.getWebcam();
          }
        );
      }
    );
  }
}
