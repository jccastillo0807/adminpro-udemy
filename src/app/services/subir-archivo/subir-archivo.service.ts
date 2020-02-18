import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  /**
   * Procedmiento asincrono que permite cargar archivos mediante javascript puro
   * 
   * @param archivo 
   * @param tipo 
   * @param id 
   */
  subirArchivo(archivo: File, tipo: string, id: string) {

    return new Promise((resolve, reject) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function () {
        //4 porque es cuando termine el proceso
        if (xhr.readyState === 4) {
          //validar si la imagen se subio
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;
      //configuracion de la peticion
      xhr.open('PUT', url, true);
      //envio del formData
      xhr.send(formData);
    });
  }

}
