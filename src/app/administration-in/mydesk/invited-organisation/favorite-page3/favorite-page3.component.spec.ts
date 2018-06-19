import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePage3Component } from './favorite-page3.component';

describe('FavoritePage3Component', () => {
  let component: FavoritePage3Component;
  let fixture: ComponentFixture<FavoritePage3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePage3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePage3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
