import { Directive, ElementRef, OnChanges, SimpleChanges, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[libNgMassSpecPlotter]'
})
export class NgMassSpecPlotterDirective implements OnChanges, OnInit {

  @Input('libNgMassSpecPlotter') spectrum: string;
  @Input('miniPlot') miniPlot: boolean;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {}

  ngOnInit(): void {
    const parsedData = this.parseData(this.spectrum);
    const data = parsedData.data;
    const annotations = parsedData.annotations;

    // Compute plot limits
    const mzMax = Math.max.apply(Math, data.map(x => x[0]));
    const intensityMax = Math.max.apply(Math, data.map(x => x[1]));
  }

  /**
   * Find the maximum intensity in the given range+
   * @param data plot data
   * @param min minimum m/z
   * @param max maximum m/z
   */
  maxIntensityInRange(data, min, max) {
    let maxLocalIntensity = 0;

    for (const x of data) {
      if (x[0] >= max) {
        break;
      }

      else if (x[0] >= min && x[1] >= maxLocalIntensity) {
        maxLocalIntensity = x[1];
      }
    }

    return Math.max(maxLocalIntensity, 0.1);
  }

  /**
   * Find the n ions with the highest intensity in the given range
   * @param data spectrum data
   * @param plot plot object
   * @param n number of highest intensity ions
   */
  getTopPeaks(data, plot, n = 3) {
    // Get plot minimum and maximum
    const min = plot.getXAxes()[0].options.min;
    const max = plot.getXAxes()[0].options.max;

    // Get data within range and sort by decreasing intensity
    const reducedData = data.filter(x => min <= x[0] && x[0] <= max);
    reducedData.sort((a, b) => b[1] - a[1]);

    // Return the top n hits
    return reducedData.slice(0, n);
  }

  /**
   * Parse data into a plottable format
   * @param originalData spectrum data
   */
  parseData(originalData) {
    let data = [];
    const annotations = [];

    // Parse data if it is in the standard string format
    if (typeof originalData === 'string') {
      data = originalData.split(' ').map(x => x.split(':').map(Number));
    }

    // Check that the data is in a readable form already
    else if (Array.isArray(originalData) && originalData.length > 0 && Array.isArray(originalData[0])) {
      data = originalData;
    }

    // Reduce the object-form of the mass spectrum
    else if (Array.isArray(originalData) && originalData.length > 0 && typeof originalData[0] === 'object') {
      originalData.forEach(x => {
        if (typeof x.selected === 'undefined' || x.selected === true) {
          data.push([x.ion, x.intensity]);

          if (x.annotation && x.annotation !== '') {
            annotations.push([x.ion, x.annotation]);
          }
        }
      });
    }

    if (data.length > 1000) {
      data.sort((a, b) => b[1] - a[1]);
      data = data.slice(0, 1000);
    }

    // Sort data by m/z
    data.sort((a, b) => a[0] - b[0]);

    // Return parsed data
    return {data, annotations};
  }
}
