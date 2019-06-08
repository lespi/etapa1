import { Injectable } from '@angular/core';

import { Web, ItemAddResult } from '@pnp/sp';
//import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';
import { InfoEspecifica, InfoGeneral } from '../models/etapa2.module';

const web = new Web('https://o365saven.sharepoint.com/sites/mpdc/app');

@Injectable({
  providedIn: 'root'
})
export class Etapa2Service {


  constructor() { }

  guardarInfoEspecifica(infoEspecifica: InfoEspecifica) {
      web.lists
        .getByTitle('informacion_especifica')
        .items.add(infoEspecifica)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
        });
  }

  guardarInfoGeneral(infoGeneral: InfoGeneral) {

    web.lists.getByTitle("informacion_general").items.get().then((items: any[]) => {
      console.log(items);
  });

    web.lists
      .getByTitle('informacion_general')
      .items.add(infoGeneral)
      .then( (iar: ItemAddResult) => {
          console.log(iar);
      });
}

async obtenerInfoGeneral() {

  return await web.lists.getByTitle('informacion_general')
                        .items.select("infg_busqueda_desafio")
                        .get<{Title: string}[]>();
}



}
