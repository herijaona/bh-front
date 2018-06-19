import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePage2Component } from './favorite-page2.component';

describe('FavoritePage2Component', () => {
  let component: FavoritePage2Component;
  let fixture: ComponentFixture<FavoritePage2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePage2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
