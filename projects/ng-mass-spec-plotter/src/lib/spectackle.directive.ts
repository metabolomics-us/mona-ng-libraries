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

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {

    console.log(this.spectrum);
    console.log(this.librarySpectrum);

    if (this.spectrum) {
      // parse spectrum
      const data = [{peaks: this.parseSpectrum(this.spectrum)}];

      if (this.librarySpectrum) {
        data.push({peaks: this.parseSpectrum(this.librarySpectrum, true)});
      }

      console.log(data);

      const mzMax = Math.max(...data[data.length - 1].peaks.map(x => x.mz));


      // generate chart
      const container = $(this.el.nativeElement);
      const containerId: string = this.el.nativeElement.id;

      container.empty();

      const chart = st.chart
          .ms()
          .xlabel('m/z')
          .ylabel('Abundance')
          .labels(true)
          .legend(false);

      chart.render('#' + containerId);

      const handle = st.data
          .set()
          .xlimits([0, 1.1 * mzMax])
          .title('spectrumId')
          .x('peaks.mz')
          .y('peaks.intensity');

      chart.load(handle);
      handle.add(data);
    }
  }

  private parseSpectrum(spectrum: string, invert: boolean = false) {
    const peaks = [];

    spectrum.split(' ').forEach((ion: string) => {
      const x = ion.split(':');
      const mz = parseFloat(x[0]);
      const intensity = parseFloat(x[1]);

      peaks.push({mz, intensity: invert ? -intensity : intensity});
    });

    return peaks;
  }
}
