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

  @Input() spectrumLabel: string;
  @Input() libraryLabel: string;

  @Input() title: string;
  @Input() xLabel: string;
  @Input() yLabel: string;

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {

    if (this.spectrum) {
      // parse spectrum
      const data = [this.parseSpectrum(this.spectrum, this.spectrumLabel)];

      if (this.librarySpectrum) {
        data.push(this.parseSpectrum(this.librarySpectrum, this.libraryLabel, true));
      }

      const mzMax = Math.max(...data[data.length - 1].peaks.map(x => x.mz));


      // generate chart
      const container = $(this.el.nativeElement);
      const containerId: string = this.el.nativeElement.id;

      container.empty();

      let chart = st.chart
          .ms()
          .xlabel(this.xLabel || 'm/z')
          .ylabel(this.yLabel || 'Abundance')
          .labels(true);

      if (this.title) {
        chart = chart.title(this.title);
      }

      chart.render('#' + containerId);

      const handle = st.data
          .set()
          .xlimits([0, 1.1 * mzMax])
          .title('spectrumId')
          .x('peaks.mz')
          .y('peaks.intensity');

      // display labels by default
      d3.select('#st-label').style('stroke', '#333333');

      chart.load(handle);
      handle.add(data);
    }
  }

  private parseSpectrum(spectrum: string, spectrumId: string, invert: boolean = false) {
    const s: any = {peaks: []};

    spectrum.split(' ').forEach((ion: string) => {
      const x = ion.split(':');
      const mz = parseFloat(x[0]);
      const intensity = parseFloat(x[1]);

      s.peaks.push({mz, intensity: invert ? -intensity : intensity});
    });

    if (spectrumId) {
      s.spectrumId = spectrumId;
    }

    return s;
  }
}
