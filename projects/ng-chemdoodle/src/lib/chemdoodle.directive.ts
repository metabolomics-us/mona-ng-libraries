import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

// ChemDoodle injection
declare var ChemDoodle: any;


@Directive({
  selector: '[libChemdoodle]'
})
export class ChemdoodleDirective implements OnChanges {

  @Input('libChemdoodle') molData: string;

  @Input() width = 200;
  @Input() height = 200;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.molData !== undefined) {
      // get container id
      const containerId: string = this.el.nativeElement.id;
      const viewerId = `${containerId}_viewer`;

      // create canvas
      const canvas = this.renderer.createElement('canvas');
      this.renderer.setProperty(canvas, 'id', viewerId);

      // empty container and add canvas element
      for (const child of this.el.nativeElement.children) {
        this.renderer.removeChild(this.el.nativeElement, child);
      }

      this.renderer.appendChild(this.el.nativeElement, canvas);

      // initiate ChemDoole viewer
      const viewACS = new ChemDoodle.ViewerCanvas(viewerId, this.width, this.height);
      viewACS.styles.atoms_displayTerminalCarbonLabels_2D =  true;
      viewACS.styles.atoms_useJMOLColors = true;
      viewACS.styles.bonds_clearOverlaps_2D = true;

      const molecule = ChemDoodle.readMOL(this.molData);
      viewACS.loadMolecule(molecule);
    }
  }
}
