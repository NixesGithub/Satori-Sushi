import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section1Form2Component } from './section1-form2.component';

describe('Section1Form2Component', () => {
  let component: Section1Form2Component;
  let fixture: ComponentFixture<Section1Form2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section1Form2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section1Form2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
