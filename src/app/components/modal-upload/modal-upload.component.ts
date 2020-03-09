import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { SubirArchivoService } from 'src/app/services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  imagenSubir: File;
  imagenTemporal: string;


  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
  
  }

  subirImagen() {
    this._subirArchivoService.subirArchivo(this.imagenSubir, this._modalUploadService.tipo, this._modalUploadService.id)
      .then(resp => {
        //emision de evento y cierre de modal        
        this._modalUploadService.notificacion.emit(resp);
        this.cerrarModal();
      }).catch(err => {
        console.log('Error en la carga de archivos... en subir imagen modal-upload');
      })
  }


  //metodo que permite guardar la imagen en una variable o si uno quiere puede hacer un arreglo de imagenes
  seleccionImagen(event) {
    if (!event.target.files[0]) {
      this.imagenSubir = null;
      return;
    }
    //console.log('event',event.target.files[0].type);
    //validacion que permite extraer la palabra imagen del atributo event.target.files[0].type
    if (event.target.files[0].type.indexOf('image') < 0) {
      Swal.fire(
        'Solo imagenes!',
        'El archivo seleccionado no es una imagen',
        'error'
      )
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = event.target.files[0];
    //extraer imagen en base 64 
    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(event.target.files[0]);
    reader.onloadend = () => {
      //console.log(reader.result);
      this.imagenTemporal = reader.result as string;//convertir el tipo arraybuffer a string
      //console.log(this.imagenTemporal);
    };
  }

  cerrarModal() {
    this.imagenSubir = null;
    this.imagenTemporal = null;
    this._modalUploadService.ocultarModal();
  }

}
