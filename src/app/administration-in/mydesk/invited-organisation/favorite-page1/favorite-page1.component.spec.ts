import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePage1Component } from './favorite-page1.component';

describe('FavoritePage1Component', () => {
  let component: FavoritePage1Component;
  let fixture: ComponentFixture<FavoritePage1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoritePage1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoritePage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
