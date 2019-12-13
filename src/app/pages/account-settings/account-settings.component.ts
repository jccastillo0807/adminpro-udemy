import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
//import { DOCUMENT } from "@angular/platform-browser";
//import { SettingsService } from '../../services/settings/settings.service';opcion 1 de importacion
import { SettingsService } from "../../services/service.index";//opcion 2 de importacion, apuntando a un archivo que contiene las rutas 

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _ajustes: SettingsService) { }

  ngOnInit() {
    this.aplicarCheckInicial();
  }

  cambiarColor(color: string, referencia: any) {
    console.log(color);
    this.aplicarCheck(referencia)
    this._ajustes.aplicarTema(color);

  }

  /**Metodo que permite aplicar check dinamicamente a opcion seleccionada */
  aplicarCheck(referencia: any) {
    let selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');//remover la clase working del arreglo de selectores
    }
    referencia.classList.add('working');//agregar la clase working a la opcion seleccionada del arreglo de selectores
  }

  /**Metodo que permite aplicar el check al inicial la pagina validandolo con el atributo tema contenido en el objeto ajustes del servicio*/
  aplicarCheckInicial() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') === tema) {//permite revisar atributos html que angular desconoce
        ref.classList.add('working');//agregar la clase working a la opcion seleccionada del arreglo de selectores
        break;
      }
    }
  }

}
