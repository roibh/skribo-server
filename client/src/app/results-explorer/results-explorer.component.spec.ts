import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsExplorerComponent } from './results-explorer.component';

describe('ResultsExplorerComponent', () => {
  let component: ResultsExplorerComponent;
  let fixture: ComponentFixture<ResultsExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
