import { NgModule } from '@angular/core';
import { NgMassSpecPlotterComponent } from './ng-mass-spec-plotter.component';
import { NgSpecktackleComponent } from './ng-specktackle.component';

@NgModule({
  declarations: [NgMassSpecPlotterComponent, NgSpecktackleComponent],
  imports: [
  ],
  exports: [NgMassSpecPlotterComponent, NgSpecktackleComponent]
})
export class NgMassSpecPlotterModule { }
