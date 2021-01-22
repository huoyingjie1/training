import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Temhum2ComponentComponent } from './temhum2-component.component';

describe('Temhum2ComponentComponent', () => {
  let component: Temhum2ComponentComponent;
  let fixture: ComponentFixture<Temhum2ComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Temhum2ComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Temhum2ComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
