# Angular Mass Spectrum Plotter

A mass spectrum visualization tool for Angular.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Installation

```shell
npm install @wcmc/ng-mass-spec-plotter --save
```

## Usage

### Import the library
```typescript
import { NgMassSpecPlotterModule } from 'ng-mass-spec-plotter';
 
@NgModule({
 // ...
 imports: [
   // ...
   NgMassSpecPlotterModule
 ]
})
```

### Use the custom component in your module
The `lib-ng-mass-spec-plotter` component must be contained within an element with fixed height:

```html
<div style="width: 100%; height: 400px">
  <lib-ng-mass-spec-plotter
    spectrum="100:50 105:100 125:25"
    id="uniqueId"></lib-ng-mass-spec-plotter>
</div>
```

The component also accepts a `miniPlot` attribute to create a small, square, unlabeled figure for previews.
