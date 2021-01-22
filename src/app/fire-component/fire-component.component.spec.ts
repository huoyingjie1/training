import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FireComponentComponent } from './fire-component.component';

describe('FireComponentComponent', () => {
  let component: FireComponentComponent;
  let fixture: ComponentFixture<FireComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FireComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FireComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
