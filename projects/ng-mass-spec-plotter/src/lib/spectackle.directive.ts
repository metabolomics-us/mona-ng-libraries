import { Directive, OnChanges, Input, ElementRef, SimpleChanges } from '@angular/core';

declare var $: any;
declare var d3: any;
declare var st: any;

@Directive({
  selector: '[specktackleViewer]'
})
export class SpectackleDirective implements OnChanges {

  @Input() spectrum: string;
  @Input() librarySpectrum: string;
  @Input() normalize: number;

  @Input() spectrumLabel: string;
  @Input() libraryLabel: string;

  @Input() title: string;
  @Input() xLabel: string;
  @Input() yLabel: string;

  @Input() pmzMax: number;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {

    if (this.spectrum) {
      // parse spectrum
      const data = [this.parseSpectrum(this.spectrum, this.spectrumLabel)];

      if (this.librarySpectrum) {
        data.push(this.parseSpectrum(this.librarySpectrum, this.libraryLabel, true));
      }

      let mzMax: number;
      if (this.pmzMax) mzMax = this.pmzMax;
      else mzMax = 1.1 * (Math.max(...data[data.length - 1].peaks.map(x => x.mz)));

      // generate chart
      const container = $(this.el.nativeElement);
      const containerId: string = this.el.nativeElement.id;

      container.empty();

      // set default chart with axis labels
      let chart = st.chart
          .ms()
          .xlabel(this.xLabel || 'm/z')
          .ylabel(this.yLabel || 'Abundance')
          .labels(true);

      // add title if provided
      if (this.title) {
        chart = chart.title(this.title);
      }

      // add legend if spectrum labels are provided
      if (this.spectrumLabel || this.libraryLabel) {
        chart = chart.legend(true);
      }

      chart.render('#' + containerId);

      const handle = st.data
          .set()
          .xlimits([0, mzMax])
          .title('spectrumId')
          .x('peaks.mz')
          .y('peaks.intensity');

      // display labels by default
      d3.select('#st-options').style('display', 'none');
      d3.select('#st-label').style('stroke', '#333333');

      chart.load(handle);
      handle.add(data);
    }
  }

  private parseSpectrum(spectrum: string, spectrumId: string, invert: boolean = false) {
    const s: any = {peaks: []};
    let maxIntensity = 0;

    // parse spectrum string and compute maximum intensity
    spectrum.split(' ').forEach((ion: string) => {
      const x = ion.split(':');
      const mz = parseFloat(x[0]);
      const intensity = parseFloat(x[1]);

      maxIntensity = Math.max(intensity, maxIntensity);

      // use negative intensities for reverse/library spectrum
      s.peaks.push({mz, intensity: invert ? -intensity : intensity});
    });

    // normalize spectrum if requested or if plotting a heads-to-tails figure
    if (this.normalize || this.librarySpectrum) {
      const normalizationValue = this.normalize ? this.normalize : 100;
      s.peaks = s.peaks.map(x => ({mz: x.mz, intensity: normalizationValue * x.intensity / maxIntensity}));
    }

    // add the spectrum id as a label if provided
    if (spectrumId) {
      s.spectrumId = spectrumId;
    }

    return s;
  }
}
