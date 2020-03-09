import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  /**
   * Servicio intermedio que permite comunicar el modal de carga de archivo 
   * con otros servicios o componentes del proyecto 
   * Es una manera alternativa de utilizar los events
   */
  //--------------Propiedades del servicio-----------------------------------
  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  // Notificacion del modal a otros componentes indicando que ya se subio una imagen
  public notificacion = new EventEmitter<any>();//se pone tipo any porque sera el objeto respuesta a la hora de consumir el servicio
  //--------------Fin Propiedades del servicio-----------------------------------

  constructor() {
    console.log('modalUploadService Listo');
  }


  /**
   * Metodo que permite controlar que se oculte el modal para usuario
   * con base en la propiedad oculto que esta se usa en el html
   */
  ocultarModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }

  /**
   * Metodo que permite controlar la vision de modal por parte del usuario
   * con base en la propiedad oculto que esta se usa en el html
   */
  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }

}
