import { NgModule } from '@angular/core';
import { NgMassSpecPlotterComponent } from './ng-mass-spec-plotter.component';
import { NgSpecktackleComponent } from './ng-specktackle.component';
import { SpectackleDirective } from './spectackle.directive';

@NgModule({
  declarations: [NgMassSpecPlotterComponent, NgSpecktackleComponent, SpectackleDirective],
  imports: [
  ],
  exports: [NgMassSpecPlotterComponent, NgSpecktackleComponent, SpectackleDirective]
})
export class NgMassSpecPlotterModule { }
