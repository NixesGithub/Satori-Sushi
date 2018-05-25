import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositariasDinamicTableComponent } from './depositarias-dinamic-table.component';

describe('DepositariasDinamicTableComponent', () => {
  let component: DepositariasDinamicTableComponent;
  let fixture: ComponentFixture<DepositariasDinamicTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositariasDinamicTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositariasDinamicTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
