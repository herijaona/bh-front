import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobOnCompProfileComponent } from './job-on-comp-profile.component';

describe('JobOnCompProfileComponent', () => {
  let component: JobOnCompProfileComponent;
  let fixture: ComponentFixture<JobOnCompProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobOnCompProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobOnCompProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
