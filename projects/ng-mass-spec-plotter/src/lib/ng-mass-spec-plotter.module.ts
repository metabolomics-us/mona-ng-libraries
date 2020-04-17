import { NgModule } from '@angular/core';
import { NgMassSpecPlotterDirective } from './ng-mass-spec-plotter.directive';
import { NgMassSpecPlotterComponent } from './ng-mass-spec-plotter.component';

@NgModule({
  declarations: [NgMassSpecPlotterDirective, NgMassSpecPlotterComponent],
  imports: [
  ],
  exports: [NgMassSpecPlotterComponent]
})
export class NgMassSpecPlotterModule { }
