import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjetProfileComponent } from './projet-profile.component';

describe('ProjetProfileComponent', () => {
  let component: ProjetProfileComponent;
  let fixture: ComponentFixture<ProjetProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjetProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjetProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
