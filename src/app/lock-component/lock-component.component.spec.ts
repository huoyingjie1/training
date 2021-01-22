import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockComponentComponent } from './lock-component.component';

describe('LockComponentComponent', () => {
  let component: LockComponentComponent;
  let fixture: ComponentFixture<LockComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
