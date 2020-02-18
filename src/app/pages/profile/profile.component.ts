import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }
  guardar(usuario: Usuario) {
    this.usuario.email = usuario.email;
    this.usuario.nombre = usuario.nombre;
    this._usuarioService.actualizarUsuario(this.usuario).subscribe();
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

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
