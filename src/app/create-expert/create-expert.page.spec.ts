import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateExpertPage } from './create-expert.page';

describe('CreateExpertPage', () => {
  let component: CreateExpertPage;
  let fixture: ComponentFixture<CreateExpertPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateExpertPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateExpertPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
