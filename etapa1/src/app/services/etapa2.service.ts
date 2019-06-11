import { Injectable } from '@angular/core';

import { Web, ItemAddResult } from '@pnp/sp';
//import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';
import { InfoEspecifica, InfoGeneral } from '../models/etapa2.module';
import { CurrentUser } from '@pnp/sp/src/siteusers';

const web = new Web('https://o365saven.sharepoint.com/sites/mpdc/app');

@Injectable({
  providedIn: 'root'
})
export class Etapa2Service {

  // perLogin: string = null;
  // userRol: any[] = null;

  constructor() { }

  async getSPDataUsuario() {
    return await web.currentUser
                    .select('Email', 'Title', 'Id')
                    .get<{Title: string}[]>().then((items: any[]) => {
                     // console.log(items);
                     //  console.log(items['Email']);
                      const perLogin = items['Email'].split('@')[0];
                      return this.obtenerUsuarioActivo( perLogin );
                  });

  }

  async getSPDataRol() {
    return await web.currentUser
                    .select('Email', 'Title', 'Id')
                    .get<{Title: string}[]>().then((items: any[]) => {
                      // console.log(items);
                      // console.log(items['Email']);
                      const perLogin = items['Email'].split('@')[0];

                      return this.obtenerUsuarioActivoRol( perLogin );
                  });

  }

  async obtenerUsuarioActivo( per_login: string) {
    return await web.lists.getByTitle('persona')
                          .items.filter(`per_login eq '${ per_login }'`)
                          .get<{Title: string}[]>();

  }

  async obtenerUsuarioActivoRol( per_login: string) {
    return await web.lists.getByTitle('rol')
                          .items
                          .filter(`per_login_txt eq '${ per_login }'`)
                          .get<{Title: string}[]>();

  }

  guardarInfoEspecifica(infoEspecifica) {
      web.lists
        .getByTitle('informacion_especifica')
        .items.add(infoEspecifica)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
        });
  }

  guardarInfoGeneral(infoGeneral: InfoGeneral) {
      web.lists
        .getByTitle('informacion_general')
        .items.add(infoGeneral)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
        });
  }

  actualizarInfoGeneral(infoGeneral: InfoGeneral, ID?: number) {
    web.lists
      .getByTitle('informacion_general')
      .items
      .getById(ID)
      .update(infoGeneral)
      .then(i => {
        console.log(i);
      });

  }

  actualizarInfoEspecifica(infoEspecifica: InfoEspecifica, ID?: number) {
    web.lists
      .getByTitle('informacion_especifica')
      .items
      .getById(ID)
      .update(infoEspecifica)
      .then(i => {
        console.log(i);
      });

  }

  async obtenerInfoGeneral( ID ) {
    return await web.lists.getByTitle('informacion_general')
                          .items
                          .filter(`id_num_sap eq '${ ID }'`)
                          .get<{Title: string}[]>();
  }

  async obtenerInfoEspecifica( ID ) {
    return await web.lists.getByTitle('informacion_especifica')
                          .items
                          .filter(`id_num_sap eq '${ ID }'`)
                          .get<{Title: string}[]>();
  }

  async obtenerCargos() {
    return await web.lists.getByTitle('cargo')
                          .items
                          .get<{Title: string}[]>();
  }

  async obtenerUsuarios() {
    return await web.lists.getByTitle('persona')
                          .items
                          .get<{Title: string}[]>();
  }

  async obtenerPeriodos() {
    return await web.lists.getByTitle('periodo')
                          .items
                          .get<{Title: string}[]>();
  }





}
