import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Book } from '../../models/book.module';
import { Genero } from '../../models/genero.module';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  @Input() generos: Genero[] = [];

   model = new Book('', '', 1, 'http://' );

  constructor( private bookService: BookService) { }

  ngOnInit() {
  }

   get currentBook() {
     return JSON.stringify(this.model);
   }

   onSubmit(){
     console.warn(this.model);
     this.bookService.saveBook(this.model);
     this.model = new Book('', '', 1, 'http://' );
   }

}
