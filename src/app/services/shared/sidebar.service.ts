import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any =[
    {
      titulo:'Principal',
      icono: 'mdi mdi-gauge',
      submenu:[
        {titulo:'Principal', url:'/dashboard'},
        {titulo:'Progress', url:'/progress'},
        {titulo:'Gráficas', url:'/graficas1'},
        {titulo:'Promesas', url:'/promesas'},
        {titulo:'Rxjs', url:'/rxjs'}
      ]
    },
    {
      titulo:'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu:[
        {titulo:'Usuarios', url:'/usuarios'},
        {titulo:'Hospitales', url:'/hospitales'},
        {titulo:'Médicos', url:'/medicos'}
      ]
    }
  ];

  constructor() { }
}
