import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  constructor(@Inject(DOCUMENT) private _document, ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
  }

  //Servicio que permite cargar el tema desde el local storage, o el tema seleccionado o el tema por defecto
  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {//cargar el tema del localstorage
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema(this.ajustes.tema);
    } else {//llama al metodo aplicartema que permite modificar el tema o carga el tema por defecto
      this.aplicarTema(this.ajustes.tema);
      console.log('ajustes por default');
    }
  }

  //permite modificar el tema o carga el tema por defecto
  aplicarTema(color) {
    let url = `assets/css/colors/${color}.css`
    this._document.getElementById('tema').setAttribute('href', url);
    //asignamos los valores seleccionados a las propiedades del servicio
    this.ajustes.tema = color;
    this.ajustes.temaUrl = url;
    //ejecucion del metodo del servicio
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
