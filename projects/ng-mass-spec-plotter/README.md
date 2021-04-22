# Angular Mass Spectrum Plotter

A mass spectrum visualization component for Angular.

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Installation

```shell
npm install @wcmc/ng-mass-spec-plotter --save
```

## Flot Plotter Usage

### Import the library
```typescript
import { NgMassSpecPlotterModule } from '@wcmc/ng-mass-spec-plotter';
 
@NgModule({
 // ...
 imports: [
   // ...
   NgMassSpecPlotterModule
 ]
})
```

### Add required scripts to the angular configuration
In `angular.json` under `architect.build.options` within your project definition, add the following scripts

```json
"scripts": [
  "./node_modules/flot/jquery.js",
  "./node_modules/flot/jquery.flot.js",
  "./node_modules/flot/jquery.flot.resize.js",
  "./node_modules/flot/jquery.flot.selection.js"
]
```

### Use the custom component in your module
The `lib-ng-mass-spec-plotter` component must use a unique id and be contained within an element with fixed height:

```html
<div style="width: 100%; height: 400px">
  <lib-ng-mass-spec-plotter
    spectrum="100:50 105:100 125:25"
    id="uniqueId"></lib-ng-mass-spec-plotter>
</div>
```

Additional optional attributes include:
* `miniPlot`: Creates a small, square, unlabeled figure for previews.
* `pmzMax`: Sets the maximum value of the x-axis. If undefined, @wcmc/ng-mass-spec-plotter determines it automatically.
* `truncate`: Sets the number label of each peak to four decimal places.

## SpeckTackle Usage

[SpeckTackle](https://bitbucket.org/sbeisken/specktackle/) is a D3.js based spectrum viewer that supports heads-to-tails spectral comparisons.

### Install dependencies

```shell
npm install bitbucket:sbeisken/specktackle --save

```

### Add required scripts to the angular configuration
In `angular.json` under `architect.build.options` within your project definition, add the following scripts

```json
"styles": [
  "./node_modules/st/css/st.css"
],
"scripts": [
  "./node_modules/st/st.js",
  "./node_modules/st/libs/jquery/jquery.js",
  "./node_modules/st/libs/d3/d3.js",
]
```

If any issues arise, place `st.js` is included near the beginning of the list.

### Use the SpeckTackle directive in your module
The `specktackleViewer` directive must use a unique id and must have a unique width and height:

```html
<div specktackleViewer
  spectrum="100:50 105:100 125:25"
  id="uniqueId"
  style="width: 100%; height: 400px"></div>
```

To plot a heads-to-tails figure:

```html
<div specktackleViewer
  spectrum="100:50 105:100 125:25"
  librarySpectrum="100:12 121:100 150:40"
  id="uniqueId"
  style="width: 100%; height: 400px"></div>
```

Additional optional attributes include:
* `normalize`: numerical value to which to normalize spectra (default: 100 for heads-to-tails plots, no scaling for single spectrum)
* `title`: plot title (no title by default)
* `xLabel`: x-axis label (default: m/z)
* `yLabel`: y-axis label (default: Abundance)
* `spectrumLabel`: a label for the primary spectrum for the legend
* `libraryLabel`: a label for the reverse/library spectrum for the legend
