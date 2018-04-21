import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOnCompProfileComponent } from './event-on-comp-profile.component';

describe('EventOnCompProfileComponent', () => {
  let component: EventOnCompProfileComponent;
  let fixture: ComponentFixture<EventOnCompProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventOnCompProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventOnCompProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
