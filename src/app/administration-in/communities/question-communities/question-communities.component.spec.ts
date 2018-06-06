import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCommunitiesComponent } from './question-communities.component';

describe('QuestionCommunitiesComponent', () => {
  let component: QuestionCommunitiesComponent;
  let fixture: ComponentFixture<QuestionCommunitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCommunitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCommunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
