import { Injectable } from '@angular/core';

import { Web, ItemAddResult } from '@pnp/sp';
import { Observable } from 'rxjs';
import { Book } from '../models/book.module';
import { environment } from '../../environments/environment';

//const web = new Web(environment.web);
const web = new Web('https://pymebroker.sharepoint.com/sites/Consultoria');

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor() { }

  saveBook(book: Book) {

      web.lists
        .getByTitle('ListaCahuala')
        .items.add(book)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
        });
  }

  async obtenerBook() {

      return await web.lists.getByTitle('ListaCahuala')
                            .items.select("title0", "author0", "url")
                            .get<{Title: string}[]>();
}

async obtenerGenero() {

  return await web.lists.getByTitle('ListaGenero')
                        .items.select("Title", "ID")
                        .get<{Title: string}[]>();
}


}
