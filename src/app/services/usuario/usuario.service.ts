import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from "@angular/common/http";
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
//import "rxjs/add/operator/map";
//import swal from 'sweetalert2';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public _router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {
    this.cargarStorage();
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    console.log('guardar en storage');
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    /**
     * Recordar usuario con base en el boton recordar
     */
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    )
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario).pipe(    // En este caso meter el map dentro del pipe
      map((resp: any) => {
        // swal('Usuario creado', usuario.email, 'success');
        Swal.fire(
          'Usuario creado!',
          usuario.email,
          'success'
        )
        return resp.usuario;
      })
    );
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this._router.navigate(['/login']);
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    // console.log('url usuario', url);
    // console.log(usuario);
    //return this.http.put(url, usuario);
    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        let usuarioDB: Usuario = resp.body;
        this.guardarStorage(resp.body._id, this.token, usuarioDB);

        Swal.fire(
          'Usuario Actualizado!',
          usuario.nombre,
          'success'
        )

        return true;
      })
    )
  }

  //escuchar observable
  cambiarImagen(archivo: File, id: string) {

    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then(
        (resp: any) => {

          this.usuario.img = resp.usuario.img;
          Swal.fire(
            'Imagen Actualizada!',
            this.usuario.nombre,
            'success'
          )
          this.guardarStorage(id, this.token, this.usuario)
        })
      .catch(resp => {
        console.log('catch', resp);
      })
  }


}

