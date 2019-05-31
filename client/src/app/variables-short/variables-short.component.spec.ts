import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablesShortComponent } from './variables-short.component';

describe('VariablesShortComponent', () => {
  let component: VariablesShortComponent;
  let fixture: ComponentFixture<VariablesShortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariablesShortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariablesShortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
