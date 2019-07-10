import { Injectable } from '@angular/core';

import { Web, ItemAddResult } from '@pnp/sp';
import { InfoEspecifica, InfoGeneral, InfoCA, InfoFR } from '../../models/etapa2.module';
import { CurrentUser } from '@pnp/sp/src/siteusers';
import { promise } from 'protractor';

const web = new Web('https://o365saven.sharepoint.com/sites/mpdc/app');

@Injectable({
  providedIn: 'root'
})
export class EtapaService {


  constructor() { }

  guardarInfoInter(infoEspecifica) {

    return new Promise( resolve => {
      web.lists
        .getByTitle('hito_intermedio')
        .items.add(infoEspecifica)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
            resolve(true);
        });
    });

  }

  guardarInfoLargo(infoGeneral: InfoGeneral) {
    return new Promise( resolve => {

      web.lists
        .getByTitle('meta_carrera_lp')
        .items.add(infoGeneral)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
            resolve(true);
        });

    });
  }

  actualizarInfoLargo(infoGeneral: InfoGeneral, ID?: number) {

    return new Promise( resolve => {

      web.lists
        .getByTitle('meta_carrera_lp')
        .items
        .getById(ID)
        .update(infoGeneral)
        .then(i => {
          console.log(i);
          resolve(true);
        });

    });

  }

  actualizarInfoInter(infoEspecifica: InfoEspecifica, ID?: number) {

    return new Promise( resolve => {
      web.lists
      .getByTitle('hito_intermedio')
      .items
      .getById(ID)
      .update(infoEspecifica)
      .then(i => {
        console.log(i);
        resolve(true);
      });
    });
    

  }

  async obtenerInfoLargo( ID ) {
    return await web.lists.getByTitle('meta_carrera_lp')
                          .items
                          .filter(`id_num_sap eq '${ ID }'`)
                          .get<{Title: string}[]>();
  }

  async obtenerInfoInter( ID ) {
    return await web.lists.getByTitle('hito_intermedio')
                          .items
                          .filter(`id_num_sap eq '${ ID }'`)
                          .get<{Title: string}[]>();
  }

  //Etapa1

  async obtenerinfoFR( ID ) {
    return await web.lists.getByTitle('competencia_autodesarrollo')
                          .items
                          .filter(`id_num_sap eq '${ ID }'`)
                          .get<{Title: string}[]>();
  }

  async obtenerinfoCAutodesarrollo( ID ) {
    return await web.lists.getByTitle('competencia_autodesarrollo')
                          .items
                          .filter(`id_num_sap eq '${ ID }'`)
                          .get<{Title: string}[]>();
  }

  actualizarCA(InfoCA: InfoCA, ID?: number) {

    return new Promise( resolve => {

      web.lists
        .getByTitle('competencia_autodesarrollo')
        .items
        .getById(ID)
        .update(InfoCA)
        .then(i => {
          console.log(i);
          resolve(true);
        });

    });

  }

  actualizarFR(InfoFR: InfoFR, ID?: number) {

    return new Promise( resolve => {

      web.lists
        .getByTitle('competencia_autodesarrollo')
        .items
        .getById(ID)
        .update(InfoFR)
        .then(i => {
          console.log(i);
          resolve(true);
        });

    });

  }

  guardarFR(InfoFR: InfoFR) {
    return new Promise( resolve => {

      web.lists
        .getByTitle('competencia_autodesarrollo')
        .items.add(InfoFR)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
            resolve(true);
        });

    });
  }

  guardarCA(InfoCA: InfoCA) {
    return new Promise( resolve => {

      web.lists
        .getByTitle('competencia_autodesarrollo')
        .items.add(InfoCA)
        .then( (iar: ItemAddResult) => {
            console.log(iar);
            resolve(true);
        });

    });
  }


  
}
