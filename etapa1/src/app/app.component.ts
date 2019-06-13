import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { BookService } from './services/book.service';
import { Etapa2Service } from './services/etapa2.service';
import { Observable } from 'rxjs';
import { Book } from './models/book.module';
import { Genero } from './models/genero.module';


@Component({
  selector: 'app-root-etapa1',
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


  }

}
