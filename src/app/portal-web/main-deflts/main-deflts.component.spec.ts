import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDefltsComponent } from './main-deflts.component';

describe('MainDefltsComponent', () => {
  let component: MainDefltsComponent;
  let fixture: ComponentFixture<MainDefltsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainDefltsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDefltsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
