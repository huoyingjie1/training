import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmComponentComponent } from './alarm-component.component';

describe('AlarmComponentComponent', () => {
  let component: AlarmComponentComponent;
  let fixture: ComponentFixture<AlarmComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlarmComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
