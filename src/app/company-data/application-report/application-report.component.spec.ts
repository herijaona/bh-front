import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionApplicationComponent } from './question-application.component';

describe('QuestionApplicationComponent', () => {
  let component: QuestionApplicationComponent;
  let fixture: ComponentFixture<QuestionApplicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionApplicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
