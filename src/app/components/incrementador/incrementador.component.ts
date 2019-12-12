import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress', {static: false}) txtProgress: ElementRef; 
  @Input('cantidad') progreso: number = 30;
  @Input('nombre') leyenda: string = 'Leyenda';
  @Output('cambiarValor') cambiarValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**EVENTOS DE LA CLASE */
  eventCambioValor(newValue: number) {
    console.log(newValue);
    //let elemHTML: any = document.getElementsByName('progreso')[0];
    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }
    //elemHTML.value=Number(this.progreso);
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambiarValor.emit(this.progreso);
  }
  /**FIN EVENTOS DE LA CLASE */

  /**METODOS DE LA CLASE*/

  modificarBarraProgreso(value: number) {
    if (this.progreso >= 100 && value > 0) {
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && value < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + value;
    this.cambiarValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

 
}
