import { Component, ElementRef, OnChanges, OnInit, Renderer2, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';

declare var $: any;

class ChartSelection {
  xaxis: {
    from: number;
    to: number;
  };
  yaxis: {
    from: number;
    to: number;
  };
  maxPeak: number;
}

@Component({
  selector: 'lib-ng-mass-spec-plotter',
  templateUrl: './ng-mass-spec-plotter.component.html',
  styleUrls: ['./ng-mass-spec-plotter.component.scss']
})
export class NgMassSpecPlotterComponent implements OnInit, OnChanges {

  @Input() spectrum: string;
  @Input() miniPlot: boolean;

  // Set min/max of x-axis
  @Input() pmzMin: number;
  @Input() pmzMax: number;
  // Sets m/z decimal places to 4, intensity decimal places to 2
  @Input() truncate: boolean;
  // Choose whether to normalize y-axis on scale of 0-100
  @Input() normalize: number;
  @Input() sciY: boolean;

  // Emit limits of user selection
  @Output() selection = new EventEmitter<any>();
  @Output() redrawn = new EventEmitter<boolean>();
  @Output() reset = new EventEmitter<boolean>();

  parsedData: any;
  plot;
  placeholder;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    // Watch the data source for changes to spectrum, pmzMin, or pmzMax
    if (this.plot) {
      if (changes.spectrum) {
        this.parsedData = this.parseData(this.spectrum);
        this.redrawPlot();
      } else if (this.spectrum && (changes.pmzMax || changes.pmzMin)) {
        // No need to parse data again if adjusting x-axis
        this.redrawPlot();
      }
    } else if (this.spectrum) {
      this.initializePlot();
    }
  }

  ngOnInit(): void {}

  computePlotLimits(data: any[]) {
    const mzMin = this.pmzMin ? this.pmzMin : 0;
    const mzMax = this.pmzMax ? this.pmzMax : Math.max.apply(Math, data.map(x => x[0]));
    const intensityMax = Math.max.apply(Math, data.map(x => x[1]));
    return [mzMin, mzMax, intensityMax];
  }

  initializePlot() {
    this.parsedData = this.parseData(this.spectrum);
    let data = this.parsedData.data;
    const annotations = this.parsedData.annotations;

    // Compute plot limits
    let [mzMin, mzMax, intensityMax] = this.computePlotLimits(data);

    // Base options
    const options: any = {
      series: {
        color: '#00f',
        lines: {show: true, lineWidth: 0.5},
        shadowSize: 0
      },

      grid: {
        labelMargin: 15,

        backgroundColor: '#fff',
        color: '#e2e6e9',

        borderWidth: {top: 0, right: 0, bottom: 1, left: 1},
        borderColor: null
      },

      legend: {show: false}
    };

    // Format plot if a thumbnail version is desired
    if (typeof this.miniPlot !== 'undefined') {
      // Remove tick labels and set plot limits
      options.xaxis = {min: mzMin, max: Math.max(1.05 * mzMax, 500), ticks: false};
      options.yaxis = {min: 0, max: intensityMax, ticks: false};

      // Filter low intensity peaks
      data = data.filter(x => x[1] > 0.05 * intensityMax);
    }

    // Otherwise, set up plot selection zoom and tooltips
    else {
      // Set up plot limits
      options.xaxis = {min: mzMin, max: 1.05 * mzMax};
      options.yaxis = {min: 0, max: intensityMax};

      // User defined Y axis ticks in scientific notation
      if (this.sciY) {
        options.yaxis.tickFormatter = (val: number) => val > 0 ? val.toExponential(2) : 0;
      }

      // Set plot selection mode
      options.selection = {mode: 'x'};

      // Set hoverable plot properties
      options.grid.hoverable = true;
      options.grid.mouseActiveRadius = 10;
    }

    // Find placeholder element and plot the mass spectrum
    const plotData = data.map(x => ({data: [[x[0], 0], x], lines: {show: true, lineWidth: 0.75}}));

    const containerId: string = this.el.nativeElement.id;
    this.placeholder = $('#' + containerId).find('.masspec');
    this.plot = $.plot(this.placeholder, plotData, options);


    // Set up interactivity if this is a full plot
    if (typeof this.miniPlot === 'undefined') {
      // Plot annotations
      this.plotAnnotations();

      // Define selection zoom functionality
      this.placeholder.bind('plotselected', (event, range) => {
        // Get maximum intensity in given range
        const maxLocalIntensity = this.maxIntensityInRange(data, range.xaxis.from, range.xaxis.to);

        // Set x-axis range
        $.each(this.plot.getXAxes(), (_, axis) => {
          axis.options.min = range.xaxis.from;
          axis.options.max = range.xaxis.to;
        });

        // Set y-axis range
        $.each(this.plot.getYAxes(), (_, axis) => {
          axis.options.min = 0;
          axis.options.max = maxLocalIntensity;
        });

        // Redraw plot
        this.plot.setupGrid();
        this.plot.draw();
        this.plot.clearSelection();
        this.plotAnnotations();

        // Emit selected region of chart
        let region: ChartSelection = range;
        region.maxPeak = maxLocalIntensity;
        this.selection.emit(region);
      });

      // Add button to reset selection zooming
      $('<div><i class="fa fa-arrows-alt fa-2x"></i></div>').css({
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
        'font-size': 'smaller',
        color: '#000',
        // 'background-color': '#eee',
        padding: '2px'
      }).appendTo(this.placeholder).click((event) => {
        event.preventDefault();
        this.redrawPlot();
        this.reset.emit(true);
      });


      // Define functionality for plot hover / tooltips
      this.placeholder.bind('plothover', (event, pos, item) => {
        const showTooltip = (contents) => {
          $('canvas').css('cursor', 'pointer');

          const p = this.plot.pointOffset({x: pos.x, y: pos.y});

          $('<div id="masspec-tooltip">' + contents + '</div>').css({
            position: 'absolute',
            top: p.top + 5,
            left: p.left + 5,
            'font-size': 'smaller',
            background: '#fff',
            'z-index': '1040',
            padding: '0.4em 0.6em',
            'border-radius': '0.5em',
            border: '1px solid #111',
            'white-space': 'nowrap'
          }).appendTo(this.placeholder);
        };


        // Remove current tooltip and highlight
        $('#masspec-tooltip').remove();
        $('canvas').css('cursor', 'auto');
        this.plot.unhighlight();


        // If datapoint is selected, show the tooltip
        if (item) {
          showTooltip('m/z = ' + item.datapoint[0] + '<br />abundance = ' + item.datapoint[1]);
        }

        // Otherwise, check if line being hovered over
        else {
          // Find nearest ion
          const nearestIon: any = {
            dist: -1
          };

          const cursor = this.plot.pointOffset({x: pos.x, y: pos.y});

          $.each(data, (i, x) => {
            const p = this.plot.pointOffset({x: x[0], y: x[1]});

            if (nearestIon.dist === -1 ||
              (Math.abs(p.left - cursor.left) < nearestIon.dist && pos.y > 0 && pos.y < x[1])) {
              nearestIon.dist = Math.abs(p.left - cursor.left);
              nearestIon.i = i;
              nearestIon.datapoint = x;
            }
          });

          // Set tooltip if we are near an ion peak
          if (nearestIon.dist !== -1 && nearestIon.dist < this.plot.getOptions().grid.mouseActiveRadius) {
            showTooltip('m/z = ' + nearestIon.datapoint[0] + '<br />abundance = ' + nearestIon.datapoint[1]);
          }
        }
      });

      // Replot annotations when window is resized
      this.placeholder.resize(() => this.plotAnnotations());
    }
  }

  redrawPlot() {
    const plotData = this.parsedData.data.map(x => ({data: [[x[0], 0], x], lines: {show: true, lineWidth: 0.75}}));
    this.plot.setData(plotData);

    // Compute plot limits
    let [mzMin, mzMax, intensityMax] = this.computePlotLimits(this.parsedData.data);

    // Reset x-axis range
    $.each(this.plot.getXAxes(), (_, axis) => {
      axis.options.min = mzMin;
      axis.options.max = 1.05 * mzMax;
    });

    // Reset y-axis range
    $.each(this.plot.getYAxes(), (_, axis) => {
      axis.options.min = 0;
      axis.options.max = intensityMax;
    });

    // Redraw plot
    this.plot.setupGrid();
    this.plot.draw();
    this.plot.clearSelection();

    if (typeof this.miniPlot === 'undefined') {
      this.plotAnnotations();
    }
    this.redrawn.emit(true);
  }

  /**
   * Add annotations for the top n ions
   * @param data spectrum data
   * @param plot plot element
   * @param placeholder placeholder element
   * @param n number of top ions
   */
  plotAnnotations(n = 3) {
    // Remove all annotation elements
    $('.masspec-annotation').remove();

    // Add annotations
    for (const peak of this.getTopPeaks(this.parsedData.data, this.plot, n)) {
      const p = this.plot.pointOffset({x: peak[0], y: peak[1]});

      // Place annotation and then reposition to center on ion
      const annotation = $('<div class="masspec-annotation">' + peak[0] + '</div>').css({
        position: 'absolute',
        top: p.top - 12,
        color: '#f00',
        'font-size': 'x-small',
        'text-align': 'center'
      });
      annotation.appendTo(this.placeholder);
      annotation.css({left: p.left - annotation.width() / 2});
    }
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

    if (this.normalize) {
      // console.log('normalizing...');
      const normalizationValue = this.normalize ? this.normalize : 100;
      let max = Math.max( ...Array.from(data, x => x[1]) );
      data = data.map(x => [x[0], (x[1] / max) * normalizationValue]);
    }

    data = this.truncate ? data.map(x => [Number(x[0].toFixed(4)), Number(x[1].toFixed(2))]) : data;

    // Return parsed data
    return {data, annotations};
  }
}
