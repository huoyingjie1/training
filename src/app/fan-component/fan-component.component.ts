import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-fan-component',
  templateUrl: './fan-component.component.html',
  styleUrls: ['./fan-component.component.css']
})
export class FanComponentComponent implements OnInit {

  fan$ = null;

  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    this.fan$ = this.deviceService.getFan();
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
