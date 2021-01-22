import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumidifierComponentComponent } from './humidifier-component.component';

describe('HumidifierComponentComponent', () => {
  let component: HumidifierComponentComponent;
  let fixture: ComponentFixture<HumidifierComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumidifierComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumidifierComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
