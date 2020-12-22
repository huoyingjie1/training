import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-air-component',
  templateUrl: './air-component.component.html',
  styleUrls: ['./air-component.component.css']
})
export class AirComponentComponent implements OnInit {
   air$ = null;

  constructor(private deviceService: DeviceService) {

  }
  ngOnInit(): void {
    this.air$ = this.deviceService.getAir();
  }
  turnOn() {
    this.deviceService.toggleAir(1).subscribe(
      () => {
        console.log('Turn on air');
        timer(1500).subscribe(() => {
          this.air$ = this.deviceService.getAir();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleAir(0).subscribe(
      () => {
        console.log('Turn off air');
        timer(1500).subscribe(
          () => {
            this.air$ = this.deviceService.getAir();
          }
        );
      }
    );
  }

  
  
}
