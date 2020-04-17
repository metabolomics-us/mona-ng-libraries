import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgMassSpecPlotterComponent } from './ng-mass-spec-plotter.component';

describe('NgMassSpecPlotterComponent', () => {
  let component: NgMassSpecPlotterComponent;
  let fixture: ComponentFixture<NgMassSpecPlotterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgMassSpecPlotterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgMassSpecPlotterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
