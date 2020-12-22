import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AirComponentComponent } from './air-component.component';

describe('AirComponentComponent', () => {
  let component: AirComponentComponent;
  let fixture: ComponentFixture<AirComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AirComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AirComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
