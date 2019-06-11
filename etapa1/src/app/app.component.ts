import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BookService } from './services/book.service';
import { Etapa2Service } from './services/etapa2.service';
import { Observable } from 'rxjs';
import { Book } from './models/book.module';
import { Genero } from './models/genero.module';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FormularioWebPartComponent implements OnInit {
  @Input() description: string;

  books = [];
  generos = [];

  constructor( private etapa2Service: Etapa2Service ) { }

  ngOnInit() {



    //Guardar información General


    // Obtener Cargos

    //Guardar info Especifica


    

    // this.bookService.obtenerBook().then( (resp: [any]) => {

    //   resp.forEach(element => {
    //      this.books.push( new Book(element.title0, element.author0, element.url, element.url));
    //    });

    //   console.log(this.books);

    // });


    // this.bookService.obtenerGenero().then( (resp: [any]) => {

    //   resp.forEach(element => {
    //      this.generos.push( new Genero(element.Title, element.ID));
    //    });

    //   console.log(this.generos);

    // });



  }

}
