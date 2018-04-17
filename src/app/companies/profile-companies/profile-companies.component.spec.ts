import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCompaniesComponent } from './profile-companies.component';

describe('ProfileCompaniesComponent', () => {
  let component: ProfileCompaniesComponent;
  let fixture: ComponentFixture<ProfileCompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCompaniesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
