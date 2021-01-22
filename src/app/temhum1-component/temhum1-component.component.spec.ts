import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temhum1ComponentComponent } from './temhum1-component.component';

describe('Temhum1ComponentComponent', () => {
  let component: Temhum1ComponentComponent;
  let fixture: ComponentFixture<Temhum1ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temhum1ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temhum1ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
