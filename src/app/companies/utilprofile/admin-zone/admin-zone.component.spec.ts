import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminZoneComponent } from './admin-zone.component';

describe('AdminZoneComponent', () => {
  let component: AdminZoneComponent;
  let fixture: ComponentFixture<AdminZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
