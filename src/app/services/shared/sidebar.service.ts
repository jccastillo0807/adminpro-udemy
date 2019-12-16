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
    }
  ];

  constructor() { }
}
