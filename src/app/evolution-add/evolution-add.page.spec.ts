import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvolutionAddPage } from './evolution-add.page';

describe('EvolutionAddPage', () => {
  let component: EvolutionAddPage;
  let fixture: ComponentFixture<EvolutionAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvolutionAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvolutionAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
