import { Component, ElementRef, OnChanges, SimpleChanges, Input, Renderer2 } from '@angular/core';

declare var $: any;
declare var st: any;
// import 'st';


@Component({
  selector: 'lib-ng-specktackle',
  templateUrl: './ng-specktackle.component.html',
  styleUrls: ['./ng-specktackle.component.scss']
})
export class NgSpecktackleComponent implements OnChanges {

  @Input() spectrum: string;
  @Input() librarySpectrum: string;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {

    if (this.spectrum !== null) {
      // parse spectrum
      const data = [{peaks: this.parseSpectrum(this.spectrum)}];

      if (this.librarySpectrum !== null) {
        data.push({peaks: this.parseSpectrum(this.librarySpectrum, true)});
      }

      const mzMax = Math.max(...data[data.length - 1].peaks.map(x => x.mz));

      // generate chart
      const container = $(this.el.nativeElement);
      const containerId: string = this.el.nativeElement.id;
      const viewerId = `${containerId}_viewer`;

      // create canvas
      container.empty();
      const canvas = this.renderer.createElement('div');
      this.renderer.setProperty(canvas, 'id', viewerId);
      this.renderer.setProperty(canvas, 'width', '100%');
      this.renderer.setProperty(canvas, 'height', '100%');


      const chart = st.chart
          .ms()
          .xlabel('m/z')
          .ylabel('Abundance');

        console.log(containerId);
      chart.render('#' + viewerId);

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

    this.spectrum.split(' ').forEach((ion: string) => {
      const x = ion.split(':');
      const mz = parseFloat(x[0]);
      const intensity = parseFloat(x[1]);

      peaks.push({mz, intensity: invert ? -intensity : intensity});
    });

    return peaks;
  }
}
