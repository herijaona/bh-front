import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationReceivedbyCollaborationComponent } from './application-receivedby-collaboration.component';

describe('ApplicationReceivedbyCollaborationComponent', () => {
  let component: ApplicationReceivedbyCollaborationComponent;
  let fixture: ComponentFixture<ApplicationReceivedbyCollaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicationReceivedbyCollaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationReceivedbyCollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
