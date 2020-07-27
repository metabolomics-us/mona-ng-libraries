import { NgModule } from '@angular/core';
import { NgMassSpecPlotterComponent } from './ng-mass-spec-plotter.component';
import { SpectackleDirective } from './spectackle.directive';

@NgModule({
  declarations: [NgMassSpecPlotterComponent, SpectackleDirective],
  imports: [
  ],
  exports: [NgMassSpecPlotterComponent, SpectackleDirective]
})
export class NgMassSpecPlotterModule { }
