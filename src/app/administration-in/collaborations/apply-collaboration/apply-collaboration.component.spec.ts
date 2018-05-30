import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCollaborationComponent } from './apply-collaboration.component';

describe('ApplyCollaborationComponent', () => {
  let component: ApplyCollaborationComponent;
  let fixture: ComponentFixture<ApplyCollaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyCollaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplyCollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
