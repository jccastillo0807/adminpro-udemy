import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: any;
  constructor(private router: Router,
    private title: Title,//el title de angular/platform-browser sirve para establecer el titulo actual de la pagina en el navegador
    private meta: Meta//permitira establecer los metadatos de la pagina actual
  ) {

    /**Subscripcion al metodo que obtiene el titulo de las rutas y se la asigna a la variable titulo */
    this.getDataRoute().subscribe(data => {
      // console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle(this.titulo);//permite setear el titulo del navegador 
    });

    /**Definicion de metatags */
    const metaTag: MetaDefinition={
      name:'description',
      content: this.titulo
    };
    /**ejecucion de metodo que permite añadir el metatag dinamicamente */
    this.meta.updateTag(metaTag);
  }

  ngOnInit() {
  }

  /**Metodo que se subscribe a los eventos de las rutas
   *  filtrandolas hasta obtner solo el titulo de la pagina */
  getDataRoute() {
    return this.router.events
      .pipe(
        filter(evento => evento instanceof ActivationEnd),
        filter((evento: ActivationEnd) => evento.snapshot.firstChild === null),
        map((evento: ActivationEnd) => evento.snapshot.data)
      );
  }

}
