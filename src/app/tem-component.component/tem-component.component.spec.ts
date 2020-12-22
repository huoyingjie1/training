import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemComponentComponent } from './tem-component.component';

describe('TemComponentComponent', () => {
  let component: TemComponentComponent;
  let fixture: ComponentFixture<TemComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
