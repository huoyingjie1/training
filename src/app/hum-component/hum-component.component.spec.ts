import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumComponentComponent } from './hum-component.component';

describe('HumComponentComponent', () => {
  let component: HumComponentComponent;
  let fixture: ComponentFixture<HumComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
