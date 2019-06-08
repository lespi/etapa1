import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../../models/book.module';



@Component({
  selector: 'app-book-lista',
  templateUrl: './book-lista.component.html',
  styleUrls: ['./book-lista.component.scss']
})
export class BookListaComponent implements OnInit {

  @Input() books: Book[] = [];


  constructor( ) { }

  ngOnInit() {


  }

}
