import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FanComponentComponent } from './fan-component.component';

describe('FanComponentComponent', () => {
  let component: FanComponentComponent;
  let fixture: ComponentFixture<FanComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FanComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FanComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
