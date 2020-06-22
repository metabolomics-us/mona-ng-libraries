import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgSpecktackleComponent } from './ng-specktackle.component';

describe('NgSpecktackleComponent', () => {
  let component: NgSpecktackleComponent;
  let fixture: ComponentFixture<NgSpecktackleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgSpecktackleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgSpecktackleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
