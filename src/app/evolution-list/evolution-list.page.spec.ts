import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionListPage } from './evolution-list.page';

describe('EvolutionListPage', () => {
  let component: EvolutionListPage;
  let fixture: ComponentFixture<EvolutionListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
