import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicestatusComponentComponent } from './devicestatus-component.component';

describe('DevicestatusComponentComponent', () => {
  let component: DevicestatusComponentComponent;
  let fixture: ComponentFixture<DevicestatusComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicestatusComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicestatusComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
