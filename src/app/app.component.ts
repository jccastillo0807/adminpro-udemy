import { Component } from '@angular/core';
import { SettingsService } from "./services/service.index";//opcion 2 de importacion, apuntando a un archivo que contiene las rutas 
//import { SettingsService } from './services/settings/settings.service'; opcion 1 de importacion

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _ajustes: SettingsService){}
}
