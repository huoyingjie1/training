import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorComponentComponent } from './door-component.component';

describe('DoorComponentComponent', () => {
  let component: DoorComponentComponent;
  let fixture: ComponentFixture<DoorComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
