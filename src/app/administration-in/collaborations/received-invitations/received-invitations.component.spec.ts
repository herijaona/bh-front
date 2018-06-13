import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivedInvitationsComponent } from './received-invitations.component';

describe('ReceivedInvitationsComponent', () => {
  let component: ReceivedInvitationsComponent;
  let fixture: ComponentFixture<ReceivedInvitationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceivedInvitationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
