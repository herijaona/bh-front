import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPageContentComponent } from './project-page-content.component';

describe('ProjectPageContentComponent', () => {
  let component: ProjectPageContentComponent;
  let fixture: ComponentFixture<ProjectPageContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectPageContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPageContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
