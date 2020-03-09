import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  desde: number = 0;//paginacion
  totalRegistros: number = 0;//paginacion
  cargandoLoading: boolean = true;



  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.notificacionCargarUsuario();
  }

  /**
   * Metodo que se subscribe al evento que se esta notificando desde la propiedad notificacion
   */
  notificacionCargarUsuario() {
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  //metodo que llama el servicio teniendo en cuenta la paginacion
  cargarUsuarios() {
    this.cargandoLoading = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.usuarios = resp.mensaje;
        this.cargandoLoading = false;
      });
  }

  //paginacion
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    //validaciones para desde   
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario(terminoBusqueda: string) {
    //validacion que permite establecer el numero de letras a partir del cual va a buscar
    if (terminoBusqueda.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargandoLoading = true;
    this._usuarioService.buscarUsuarios(terminoBusqueda)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargandoLoading = false;
      })
  }

  borrarUsuario(usuario: Usuario) {
    //validacion que no permite borrarse a si mismo
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire(
        'No se puede eliminar usuario!',
        'No es posible eliminarse a sí mismo',
        'error'
      );
      return;
    }
    //eventos que se disparan cuando se desea eliminar un usuario
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Estás a punto de eliminar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, estoy seguro'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(borrado => {
            //validacion que controla la tabla e identifica cuando la pagina de la tabla se encuentra vacia
            if (this.desde = this.totalRegistros) {
              this.desde = this.desde - 5;
            }
            this.cargarUsuarios();
          })
      }
    })
  }

  guardarUsuario(usuario: Usuario) {
    //console.log('Usuario',usuario);
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

  /**
   * 
   * @param id Metodo que realiza el llamado al metodo del servicio que muestra el modal
   */
  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }
}
