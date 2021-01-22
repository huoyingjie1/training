import { Component, OnInit, OnDestroy } from '@angular/core';
import { timer } from 'rxjs';
import { DeviceService } from '../device.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-door-component',
  templateUrl: './door-component.component.html',
  styleUrls: ['./door-component.component.css']
})
export class DoorComponentComponent implements OnInit, OnDestroy {
  door$ = null;
  interval = null;
  constructor(private deviceService: DeviceService, private authService: AuthService) {

  }
  ngOnInit(): void {
    setInterval(() => {
      this.door$ = this.deviceService.getDoor();
    },2000);
  }
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
  turnOn() {
    this.deviceService.toggleDoor(1).subscribe(
      () => {
        console.log('Turn on door');
        timer(1500).subscribe(() => {
          this.door$ = this.deviceService.getDoor();
        }
        );
      }
    );
  }
  turnOff() {
    this.deviceService.toggleDoor(0).subscribe(
      () => {
        console.log('Turn off door');
        timer(1500).subscribe(
          () => {
            this.door$ = this.deviceService.getDoor();
          }
        );
      }
    );
  }
  logout() {
    this.authService.logout();
  }
}
