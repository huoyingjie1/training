import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedComponentComponent } from './led-component.component';

describe('LedComponentComponent', () => {
  let component: LedComponentComponent;
  let fixture: ComponentFixture<LedComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
