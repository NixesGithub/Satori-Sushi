import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Section2Form2Component } from './section2-form2.component';

describe('Section2Form2Component', () => {
  let component: Section2Form2Component;
  let fixture: ComponentFixture<Section2Form2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Section2Form2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Section2Form2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
