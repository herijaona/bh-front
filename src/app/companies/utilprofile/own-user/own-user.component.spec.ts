import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnUserComponent } from './own-user.component';

describe('OwnUserComponent', () => {
  let component: OwnUserComponent;
  let fixture: ComponentFixture<OwnUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OwnUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
