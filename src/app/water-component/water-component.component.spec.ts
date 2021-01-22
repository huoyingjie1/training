import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterComponentComponent } from './water-component.component';

describe('WaterComponentComponent', () => {
  let component: WaterComponentComponent;
  let fixture: ComponentFixture<WaterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
