import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, take } from 'rxjs/operators';
import { Cargo, InfoGeneral, InfoEspecifica, InfoPPer, InfoCA, InfoFR, InfoOM, Usuario, Periodo, Rol } from 'src/app/models/etapa2.module';
import { EtapaService } from './etapa.service';
import { MatSelect } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import {
  //INICIALIZARFORMESPECIFICA,
  //INICIALIZARFORMGENERAL,
  //CAMPOSCOMPETENCIAS,
  //CAMPOSCONDICIONES,
  //CAMPOSMOTIVACIONES,
  //CAMPOSREQUERIMIENTOS,
  CAMPOSLARGO,
  CAMPOSMEDIANO,
  INICIALIZARFORMLARGO,
  INICIALIZARPERFILPERSONALIDAD,
  CAMPOSPERFIL,
  INICIALIZARCAUTODESARROLLO,
  CAMPOSCAUTODESARROLLO1,
  CAMPOSCAUTODESARROLLO2,
  CAMPOSCAUTODESARROLLO3,
  CAMPOSCAUTODESARROLLO4,
  CAMPOSCAUTODESARROLLO5,
  INICIALIZARFEEDBACKR,
  CAMPOSFEEDBACKR,
  CAMPOSFEEDBACKR2,
  CAMPOSFEEDBACKR3,
  CAMPOSFEEDBACKR4,
  CAMPOSFEEDBACKR5,

  INICIALIZARTFORTALEZA,
  INICIALIZARTFORTALEZA2,
  INICIALIZARTFORTALEZA3,
  CAMPOSTFORTALEZA1,
  CAMPOSTFORTALEZA2,
  CAMPOSTFORTALEZA3,
  
  INICIALIZAROMEJORA1,
  INICIALIZAROMEJORA2,
  CAMPOSOMEJORA1,
  CAMPOSOMEJORA2,

  INICIALIZARCHECKL1,
  INICIALIZARCHECKL2,
  INICIALIZARCHECKL3,
  INICIALIZARCHECKL4,
  INICIALIZARCHECKL5,
  INICIALIZARCHECKL6,
  INICIALIZARCHECKL7,
  INICIALIZARCHECKL8,
  INICIALIZARCHECKL9,
  INICIALIZARCHECKL10,
  INICIALIZARCHECKL11,
  INICIALIZARCHECKL12,
  INICIALIZARCHECKL13,
  INICIALIZARCHECKL14,
  INICIALIZARCHECKL15,
  INICIALIZARCHECKL16,
  INICIALIZARCHECKL17,
  INICIALIZARCHECKL18,
  INICIALIZARCHECKL19,
  INICIALIZARCHECKL20,
  CAMPOSCHECKL,
  CAMPOSCHECKL2,
  CAMPOSCHECKL3,
  CAMPOSCHECKL4,
  CAMPOSCHECKL5,
  CAMPOSCHECKL6,
  CAMPOSCHECKL7,
  CAMPOSCHECKL8,
  CAMPOSCHECKL9,
  CAMPOSCHECKL10,
  CAMPOSCHECKL11,
  CAMPOSCHECKL12,
  CAMPOSCHECKL13,
  CAMPOSCHECKL14,
  CAMPOSCHECKL15,
  CAMPOSCHECKL16,
  CAMPOSCHECKL17,
  CAMPOSCHECKL18,
  CAMPOSCHECKL19,
  CAMPOSCHECKL20,
  selectAjuste,

  INICIALIZARTOP5V1,
  INICIALIZARTOP5V2,
  INICIALIZARTOP5V3,
  INICIALIZARTOP5V4,
  INICIALIZARTOP5V5,
  CAMPOSTOP5V1,
  CAMPOSTOP5V2,
  CAMPOSTOP5V3,
  CAMPOSTOP5V4,
  CAMPOSTOP5V5
} from './data';
import { Form } from '@pnp/sp/src/forms';
import { INICIALIZARFORMCORTO } from './data';
import * as moment from 'moment';

export interface CamposForm {
  Id?: number;
  nombreCampo?: string;
  nombreMostrar?: string;
  nombreCampo2?: string;
  nombreMostrar2?: string;
  titulo?: string;
//ETAPA1
  nombreCampo1?: string;
  nombreMostrar1?: string;
  nombreCampo3?: string;
  nombreMostrar3?: string;

  nombreCampoFR?: string;
  nombreMostrarFR?: string;
  nombreCampoFR1?: string;
  nombreMostrarFR1?: string;
  nombreCampoFR2?: string;
  nombreMostrarFR2?: string;
  nombreCampoFR3?: string;
  nombreMostrarFR3?: string;

  nombreCampoTF1?: string;
  nombreMostrarTF1?: string;
  nombreCampoTF2?: string;
  nombreMostrarTF2?: string;

  nombreCampoOM1?: string;
  nombreMostrarOM1?: string;
  nombreCampoOM2?: string;
  nombreMostrarOM2?: string;

  nombreCampoCHECKL1?: string;
  nombreMostrarCHECKL1?: string;
  nombreCampoCHECKL2?: string;
  nombreMostrarCHECKL2?: string;

  nombreCampoTOP5V1?: string;
  nombreMostrarTOP5V1?: string;
  nombreCampoTOP5V2?: string;
  nombreMostrarTOP5V2?: string;

}

@Component({
  selector: 'app-formulario-etapa1',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  encapsulation: ViewEncapsulation.None
})



export class TemplateComponent implements OnInit {

  curDate = new Date();
  day = this.curDate.getDay();
  month = this.curDate.getMonth();
  year = this.curDate.getFullYear();
  minDate = new Date(this.year, this.month, this.day);

  usuarioActivo: Usuario;

  infoEsSel: InfoEspecifica = null;
  infoEsSel2: InfoEspecifica = null;
  infoEsSel3: InfoEspecifica = null;
  infogeSel: InfoGeneral = null;
  infocaSel: InfoCA = null;
  infofrSel: InfoFR = null; //REVISAR
  infoPPSel: InfoPPer = null; //Etapa1
  infoOMSel: InfoOM = null; //Etapa1

  selectCompetencia = [];

  // controles y estructura para formularios (Escucha los campos del formulario)
 
 // formGroupHijo1: FormGroup;
  formGroupHijo3: FormGroup;
  formGroupHijo4: FormGroup;

  // ETAPA1
  formGroupPadrePPer: FormGroup;
  formGroupHijoPPer: FormGroup;

  formGroupPadreCA: FormGroup;
  formGroupHijoPE: FormGroup;
  formGroupHijoPE2: FormGroup;
  formGroupHijoPE3: FormGroup;
  formGroupHijoPE4: FormGroup;
  formGroupHijoPE5: FormGroup;

  formGroupHijoFR1: FormGroup;
  formGroupHijoFR2: FormGroup;
  formGroupHijoFR3: FormGroup;
  formGroupHijoFR4: FormGroup;
  formGroupHijoFR5: FormGroup;

  formGroupPadreOCom: FormGroup;

  formGroupHijoTF: FormGroup;
  formGroupHijoTF2: FormGroup;
  formGroupHijoTF3: FormGroup;

  formGroupHijoOM1: FormGroup;
  formGroupHijoOM2: FormGroup;

  formGroupPadreMVal: FormGroup;

  formGroupHijoCHECKL1: FormGroup; //SE UTILIZA?
  formGroupHijoCHECKL2: FormGroup;
  formGroupHijoCHECKL3: FormGroup;
  formGroupHijoCHECKL4: FormGroup;
  formGroupHijoCHECKL5: FormGroup;
  formGroupHijoCHECKL6: FormGroup;
  formGroupHijoCHECKL7: FormGroup;
  formGroupHijoCHECKL8: FormGroup;
  formGroupHijoCHECKL9: FormGroup;
  formGroupHijoCHECKL10: FormGroup;
  formGroupHijoCHECKL11: FormGroup;
  formGroupHijoCHECKL12: FormGroup;
  formGroupHijoCHECKL13: FormGroup;
  formGroupHijoCHECKL14: FormGroup;
  formGroupHijoCHECKL15: FormGroup;
  formGroupHijoCHECKL16: FormGroup;
  formGroupHijoCHECKL17: FormGroup;
  formGroupHijoCHECKL18: FormGroup;
  formGroupHijoCHECKL19: FormGroup;
  formGroupHijoCHECKL20: FormGroup;

  selectAjuste = selectAjuste;

  formGroupHijoTOP5V1: FormGroup;
  formGroupHijoTOP5V2: FormGroup;
  formGroupHijoTOP5V3: FormGroup;
  formGroupHijoTOP5V4: FormGroup;
  formGroupHijoTOP5V5: FormGroup;


  nombresFromGroup = ['formGroupHijoPPer', 'formGroupHijo3'];

  inicializarFormHijo1 = INICIALIZARFORMLARGO;
 // inicializarFormHijoPPer = INICIALIZARFORMCORTO; // Se utilizará para corto y mediano

  //Inicializa valors del formulario
  inicializarFormHijoPPer = INICIALIZARPERFILPERSONALIDAD; // Se utilizará para ETAPA 1
  inicializarFormHijoPE = INICIALIZARCAUTODESARROLLO; // Se utilizará para ETAPA 1
  inicializarFormHijoFR = INICIALIZARFEEDBACKR; // Se utilizará para ETAPA 1

  inicializarFormHijoTF = INICIALIZARTFORTALEZA; // Se utilizará para ETAPA 1
  inicializarFormHijoTF2 = INICIALIZARTFORTALEZA2; // Se utilizará para ETAPA 1
  inicializarFormHijoTF3 = INICIALIZARTFORTALEZA3; // Se utilizará para ETAPA 1

  inicializarFormHijoOM1 = INICIALIZAROMEJORA1; // Se utilizará para ETAPA 1
  inicializarFormHijoOM2 = INICIALIZAROMEJORA2; // Se utilizará para ETAPA 1

  inicializarFormHijoCHECKL1 = INICIALIZARCHECKL1;
  inicializarFormHijoCHECKL2 = INICIALIZARCHECKL2;
  inicializarFormHijoCHECKL3 = INICIALIZARCHECKL3;
  inicializarFormHijoCHECKL4 = INICIALIZARCHECKL4;
  inicializarFormHijoCHECKL5 = INICIALIZARCHECKL5;
  inicializarFormHijoCHECKL6 = INICIALIZARCHECKL6;
  inicializarFormHijoCHECKL7 = INICIALIZARCHECKL7;
  inicializarFormHijoCHECKL8 = INICIALIZARCHECKL8;
  inicializarFormHijoCHECKL9 = INICIALIZARCHECKL9;
  inicializarFormHijoCHECKL10 = INICIALIZARCHECKL10;
  inicializarFormHijoCHECKL11 = INICIALIZARCHECKL11;
  inicializarFormHijoCHECKL12 = INICIALIZARCHECKL12;
  inicializarFormHijoCHECKL13 = INICIALIZARCHECKL13;
  inicializarFormHijoCHECKL14 = INICIALIZARCHECKL14;
  inicializarFormHijoCHECKL15 = INICIALIZARCHECKL15;
  inicializarFormHijoCHECKL16 = INICIALIZARCHECKL16;
  inicializarFormHijoCHECKL17 = INICIALIZARCHECKL17;
  inicializarFormHijoCHECKL18 = INICIALIZARCHECKL18;
  inicializarFormHijoCHECKL19 = INICIALIZARCHECKL19;
  inicializarFormHijoCHECKL20 = INICIALIZARCHECKL20;

  inicializarFormHijoTOP5V1 = INICIALIZARTOP5V1;
  inicializarFormHijoTOP5V2 = INICIALIZARTOP5V2;
  inicializarFormHijoTOP5V3 = INICIALIZARTOP5V3;
  inicializarFormHijoTOP5V4 = INICIALIZARTOP5V4;
  inicializarFormHijoTOP5V5 = INICIALIZARTOP5V5;

  

  // Crea el formulario HTML
  camposForm1: CamposForm[] = CAMPOSLARGO;
  camposForm3: CamposForm[] = CAMPOSMEDIANO;

  camposForm4: CamposForm[] = CAMPOSPERFIL; //ETAPA1

  camposFormCA: CamposForm[] = CAMPOSCAUTODESARROLLO1; //ETAPA1
  camposForm6: CamposForm[] = CAMPOSCAUTODESARROLLO2; //ETAPA1 No utilizado
  camposForm7: CamposForm[] = CAMPOSCAUTODESARROLLO3; //ETAPA1 No utilizado
  camposForm8: CamposForm[] = CAMPOSCAUTODESARROLLO4; //ETAPA1 No utilizado
  camposForm9: CamposForm[] = CAMPOSCAUTODESARROLLO5; //ETAPA1 No utilizado

  nombresFromGroupCAUTODESARROLLO = ['formGroupHijoPE', 'formGroupHijoPE2', 'formGroupHijoPE3', 'formGroupHijoPE4', 'formGroupHijoPE5'];

  nombresFromGroupFEEDBACKR = ['formGroupHijoFR1', 'formGroupHijoFR2', 'formGroupHijoFR3', 'formGroupHijoFR4', 'formGroupHijoFR5'];

  nombresFromGroupTFORTALEZA1 = ['formGroupHijoTF'];

  nombresFromGroupTFORTALEZA2 = ['formGroupHijoTF2'];

  nombresFromGroupTFORTALEZA3 = ['formGroupHijoTF3'];

  nombresFromGroupTFORTALEZAall = ['formGroupHijoTF', 'formGroupHijoTF2', 'formGroupHijoTF3'];

  nombresFromGroupOMEJORA1 = ['formGroupHijoOM1'];

  nombresFromGroupOMEJORA2 = ['formGroupHijoOM2'];

  nombresFromGroupOMEJORAall = ['formGroupHijoOM1', 'formGroupHijoOM2'];

// tslint:disable-next-line: max-line-length
  nombresFromGroupCHECKLISTMV = ['formGroupHijoCHECKL1', 'formGroupHijoCHECKL2', 'formGroupHijoCHECKL3', 'formGroupHijoCHECKL4', 'formGroupHijoCHECKL5', 'formGroupHijoCHECKL6', 'formGroupHijoCHECKL7','formGroupHijoCHECKL8', 'formGroupHijoCHECKL9', 'formGroupHijoCHECKL10', 'formGroupHijoCHECKL11', 'formGroupHijoCHECKL12', 'formGroupHijoCHECKL13', 'formGroupHijoCHECKL14', 'formGroupHijoCHECKL15', 'formGroupHijoCHECKL16', 'formGroupHijoCHECKL17', 'formGroupHijoCHECKL18', 'formGroupHijoCHECKL19', 'formGroupHijoCHECKL20'];
// tslint:disable-next-line: max-line-length  
  nombresFromGroupTOP5V = ['formGroupHijoTOP5V1', 'formGroupHijoTOP5V2', 'formGroupHijoTOP5V3', 'formGroupHijoTOP5V4', 'formGroupHijoTOP5V5'];

  camposFormFR: CamposForm[] = CAMPOSFEEDBACKR5; //ETAPA1
  camposFormFR1: CamposForm[] = CAMPOSFEEDBACKR; //ETAPA1 No utilizado
  camposFormFR2: CamposForm[] = CAMPOSFEEDBACKR2; //ETAPA1 No utilizado
  camposFormFR3: CamposForm[] = CAMPOSFEEDBACKR3; //ETAPA1 No utilizado
  camposFormFR4: CamposForm[] = CAMPOSFEEDBACKR4; //ETAPA1 No utilizado


  camposFormTF: CamposForm[] = CAMPOSTFORTALEZA1; //ETAPA1
  camposFormTF1: CamposForm[] = CAMPOSTFORTALEZA2; //ETAPA1 SI utilizado
  camposFormTF2: CamposForm[] = CAMPOSTFORTALEZA3; //ETAPA1 SI utilizado

  camposFormOM1: CamposForm[] = CAMPOSOMEJORA1; //ETAPA1 No utilizado
  camposFormOM2: CamposForm[] = CAMPOSOMEJORA2; //ETAPA1 No utilizado

  camposFormCHECKL: CamposForm[] = CAMPOSCHECKL; //ETAPA1
  /*
  camposFormCHECKL2: CamposForm[] = CAMPOSCHECKL2; //ETAPA1 No utilizado
  camposFormCHECKL3: CamposForm[] = CAMPOSCHECKL3; //ETAPA1 No utilizado
  camposFormCHECKL4: CamposForm[] = CAMPOSCHECKL4; //ETAPA1 No utilizado
  camposFormCHECKL5: CamposForm[] = CAMPOSCHECKL5; //ETAPA1 No utilizado
  camposFormCHECKL6: CamposForm[] = CAMPOSCHECKL6; //ETAPA1 No utilizado
  camposFormCHECKL7: CamposForm[] = CAMPOSCHECKL7; //ETAPA1 No utilizado
  camposFormCHECKL8: CamposForm[] = CAMPOSCHECKL8; //ETAPA1 No utilizado
  camposFormCHECKL9: CamposForm[] = CAMPOSCHECKL9; //ETAPA1 No utilizado
  camposFormCHECKL10: CamposForm[] = CAMPOSCHECKL10; //ETAPA1 No utilizado
  camposFormCHECKL11: CamposForm[] = CAMPOSCHECKL11; //ETAPA1 No utilizado
  camposFormCHECKL12: CamposForm[] = CAMPOSCHECKL12; //ETAPA1 No utilizado
  camposFormCHECKL13: CamposForm[] = CAMPOSCHECKL13; //ETAPA1 No utilizado
  camposFormCHECKL14: CamposForm[] = CAMPOSCHECKL14; //ETAPA1 No utilizado
  camposFormCHECKL15: CamposForm[] = CAMPOSCHECKL15; //ETAPA1 No utilizado
  camposFormCHECKL16: CamposForm[] = CAMPOSCHECKL16; //ETAPA1 No utilizado
  camposFormCHECKL17: CamposForm[] = CAMPOSCHECKL17; //ETAPA1 No utilizado
  camposFormCHECKL18: CamposForm[] = CAMPOSCHECKL18; //ETAPA1 No utilizado
  camposFormCHECKL19: CamposForm[] = CAMPOSCHECKL19; //ETAPA1 No utilizado
  camposFormCHECKL20: CamposForm[] = CAMPOSCHECKL20; //ETAPA1 No utilizado
  */

  camposFormTOP5V1: CamposForm[] = CAMPOSTOP5V1; //ETAPA1
  //camposFormTOP5V2: CamposForm[] = CAMPOSTOP5V2; //ETAPA1 No utilizado
  //camposFormTOP5V3: CamposForm[] = CAMPOSTOP5V3; //ETAPA1 No utilizado
  //camposFormTOP5V4: CamposForm[] = CAMPOSTOP5V4; //ETAPA1 No utilizado
  //camposFormTOP5V5: CamposForm[] = CAMPOSTOP5V5; //ETAPA1 No utilizado


  public guardando = false;

  arrayCargoCtrl = [];
  arrayCargos = []; // Se actualiza al obtener el array de cargos


  constructor(private fb: FormBuilder,
              private etapaService: EtapaService,
              private snackBar: MatSnackBar) { }



  ngOnInit() {

    this.etapaService.obtenerCompetencias().then( (resp: [any]) => {
      console.log('-----------------Obtener competencias');
      console.log(resp);
      resp.forEach(element => {
        this.selectCompetencia.push(element.com_descripcion);
      });
      console.log(this.selectCompetencia);
    });

    // Creamos el Form
    this.createForms();
  }

  createForms() {

    this.formGroupPadrePPer = this.fb.group({
      formGroupHijoPPer: this.fb.group(this.inicializarFormHijoPPer),

    });

    this.formGroupPadreCA = this.fb.group({
      formGroupHijoPE: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE2: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE3: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE4: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE5: this.fb.group(this.inicializarFormHijoPE),

      formGroupHijoFR1: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR2: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR3: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR4: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR5: this.fb.group(this.inicializarFormHijoFR)

    });

    this.formGroupPadreOCom = this.fb.group({
      formGroupHijoTF: this.fb.group(this.inicializarFormHijoTF),
      formGroupHijoTF2: this.fb.group(this.inicializarFormHijoTF2),
      formGroupHijoTF3: this.fb.group(this.inicializarFormHijoTF3),

      formGroupHijoOM1: this.fb.group(this.inicializarFormHijoOM1),
      formGroupHijoOM2: this.fb.group(this.inicializarFormHijoOM2)

    });
  
    this.formGroupPadreMVal = this.fb.group({
        formGroupHijoCHECKL1: this.fb.group(this.inicializarFormHijoCHECKL1),
        formGroupHijoCHECKL2: this.fb.group(this.inicializarFormHijoCHECKL2),
        formGroupHijoCHECKL3: this.fb.group(this.inicializarFormHijoCHECKL3),
        formGroupHijoCHECKL4: this.fb.group(this.inicializarFormHijoCHECKL4),
        formGroupHijoCHECKL5: this.fb.group(this.inicializarFormHijoCHECKL5),
        formGroupHijoCHECKL6: this.fb.group(this.inicializarFormHijoCHECKL6),
        formGroupHijoCHECKL7: this.fb.group(this.inicializarFormHijoCHECKL7),
        formGroupHijoCHECKL8: this.fb.group(this.inicializarFormHijoCHECKL8),
        formGroupHijoCHECKL9: this.fb.group(this.inicializarFormHijoCHECKL9),
        formGroupHijoCHECKL10: this.fb.group(this.inicializarFormHijoCHECKL10),
        formGroupHijoCHECKL11: this.fb.group(this.inicializarFormHijoCHECKL11),
        formGroupHijoCHECKL12: this.fb.group(this.inicializarFormHijoCHECKL12),
        formGroupHijoCHECKL13: this.fb.group(this.inicializarFormHijoCHECKL13),
        formGroupHijoCHECKL14: this.fb.group(this.inicializarFormHijoCHECKL14),
        formGroupHijoCHECKL15: this.fb.group(this.inicializarFormHijoCHECKL15),
        formGroupHijoCHECKL16: this.fb.group(this.inicializarFormHijoCHECKL16),
        formGroupHijoCHECKL17: this.fb.group(this.inicializarFormHijoCHECKL17),
        formGroupHijoCHECKL18: this.fb.group(this.inicializarFormHijoCHECKL18),
        formGroupHijoCHECKL19: this.fb.group(this.inicializarFormHijoCHECKL19),
        formGroupHijoCHECKL20: this.fb.group(this.inicializarFormHijoCHECKL20),

        formGroupHijoTOP5V1: this.fb.group(this.inicializarFormHijoTOP5V1),
        formGroupHijoTOP5V2: this.fb.group(this.inicializarFormHijoTOP5V2),
        formGroupHijoTOP5V3: this.fb.group(this.inicializarFormHijoTOP5V3),
        formGroupHijoTOP5V4: this.fb.group(this.inicializarFormHijoTOP5V4),
        formGroupHijoTOP5V5: this.fb.group(this.inicializarFormHijoTOP5V5)
      });
}

//Etapa1
  async onSubmitPPer() {

    this.guardando = true;

    const elementInfoId = this.formGroupPadrePPer.get('formGroupHijoPPer').get('ID').value;
    const elementInfoValue = this.formGroupPadrePPer.get('formGroupHijoPPer').value;

    if (elementInfoId !== '') {
      console.log('Existe info objeto');
      console.log(elementInfoValue );
      await this.etapaService.actualizarInfoPPer(elementInfoValue, elementInfoId).then(() => {
              this.guardando = false;
              this.snackBar.open('Información Perfil de Personalidad guardada', 'x', {
                    duration: 5000,
                  });
          });
    } else{
      console.log('NO Existe info  objeto');
      const objetoAuxiliar = elementInfoValue;
      delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
      console.log(objetoAuxiliar);
      await this.etapaService.guardarPPer(objetoAuxiliar).then(() => {
          this.infoPPer().then( () => {
            this.guardando = false;
            this.snackBar.open('Información Perfil de Personalidad guardada', 'x', {
                  duration: 5000,
                });
          });
      });
    }
/*
    */
  }
  
  async onSubmitCAutodesarrollo() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupCAUTODESARROLLO.length; i++) {

      const element = this.nombresFromGroupCAUTODESARROLLO[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreCA.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreCA.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarCA(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupCAUTODESARROLLO.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información CA guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarCA(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupCAUTODESARROLLO.length - 1 ) {
            this.infoCAutodesarrollo().then( () => {
              this.guardando = false;
              this.snackBar.open('Información CA guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  async onSubmitFEEDBACKR() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupFEEDBACKR.length; i++) {

      //const element = this.nombresFromGroupFEEDBACKR[i];

      //const fechaPicker = this.formGroupPadreCA.get(element).get('fdbk_fecha').value;
      //const fechaAux = moment(fechaPicker).format('YYYY-MM-DD');
      //const fecha = moment(fechaAux).format('YYYY-MM-DDTHH:mm:ss');

      //if ( moment(fecha).isValid() ) {
        // lo llevo a UTC agregando 4 horas y luego le agrego 8 horas más para que en el calendario aparezca en las 10AM
      //  const fechaIni = moment.utc(fecha).add(14, 'hours').format('YYYY-MM-DDTHH:mm:ss');
      //  const fechaFin = moment.utc(fechaIni).add(1, 'hours') .format('YYYY-MM-DDTHH:mm:ss');

      //  this.formGroupPadreCA.get(element).get('fdbk_fecha').setValue(fechaIni);
      //  this.formGroupPadreCA.get(element).get('EventDate').setValue(fechaIni);
      //  this.formGroupPadreCA.get(element).get('EndDate').setValue(fechaFin);
     // }

      const    element = this.nombresFromGroupFEEDBACKR[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreCA.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreCA.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarFR(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupFEEDBACKR.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información FR guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarFR(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupFEEDBACKR.length - 1 ) {
            this.infoFeedbackR().then( () => {
              this.guardando = false;
              this.snackBar.open('Información FR guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  async onSubmitTFOR1() {
    console.log('Revisando Formulario');
    console.log(this.formGroupPadreOCom.get('formGroupHijoTF').value);

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupTFORTALEZA1.length; i++) {

      const element = this.nombresFromGroupTFORTALEZA1[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreOCom.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreOCom.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarTFor(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupTFORTALEZA1.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información TF guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarTFor(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupTFORTALEZA1.length - 1 ) {
            this.infoTFortaleza().then( () => {
              this.guardando = false;
              this.snackBar.open('Información TF guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  async onSubmitTFOR2() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupTFORTALEZA2.length; i++) {

      const element = this.nombresFromGroupTFORTALEZA2[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreOCom.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreOCom.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarTFor(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupTFORTALEZA2.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información TF2 guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarTFor(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupTFORTALEZA2.length - 1 ) {
            this.infoTFortaleza().then( () => {
              this.guardando = false;
              this.snackBar.open('Información TF2 guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  async onSubmitTFOR3() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupTFORTALEZA3.length; i++) {

      const element = this.nombresFromGroupTFORTALEZA3[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreOCom.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreOCom.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarTFor(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupTFORTALEZA3.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información TF3 guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarTFor(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupTFORTALEZA3.length - 1 ) {
            this.infoTFortaleza().then( () => {
              this.guardando = false;
              this.snackBar.open('Información TF3 guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }
 
  async onSubmitOM1() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupOMEJORA1.length; i++) {

      const element = this.nombresFromGroupOMEJORA1[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreOCom.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreOCom.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarOM(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupOMEJORA1.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información OM guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarOM(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupOMEJORA1.length - 1 ) {
            this.infoOMejora().then( () => {
              this.guardando = false;
              this.snackBar.open('Información OM guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  async onSubmitOM2() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupOMEJORA2.length; i++) {

      const element = this.nombresFromGroupOMEJORA2[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreOCom.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreOCom.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarOM(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupOMEJORA2.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información OM guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarOM(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupOMEJORA2.length - 1 ) {
            this.infoOMejora().then( () => {
              this.guardando = false;
              this.snackBar.open('Información OM guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  async onSubmitCHECKL() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupCHECKLISTMV.length; i++) {

      const element = this.nombresFromGroupCHECKLISTMV[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadreMVal.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadreMVal.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarCHECKL(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroupCHECKLISTMV.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información CHECKL guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarCHECKL(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroupCHECKLISTMV.length - 1 ) {
            this.infoCHECKL().then( () => {
              this.guardando = false;
              this.snackBar.open('Información CHECKL guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  submitEtapa() {
        // this.onSubmitPPer().then( () => {//Etapa1
        //   //this.onSubmitPPer();
       
        // });
        this.onSubmitPPer(); //Etapa1
        this.onSubmitCAutodesarrollo(); //Etapa1
        this.onSubmitFEEDBACKR(); //Etapa1
        this.onSubmitTFOR1(); //Etapa1
        this.onSubmitTFOR2(); //Etapa1
        this.onSubmitTFOR3(); //Etapa1
        this.onSubmitOM1(); //Etapa1
        this.onSubmitOM2(); //Etapa1
        this.onSubmitCHECKL();//Etapa1
  }

  async infoPPer() {
    await this.etapaService.obtenerInfoPPer(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info Perfil Personalidad');
      console.log(resp);

      if (resp.length > 0 ) {
        resp.forEach(element => {
          
          this.formGroupPadrePPer.get('formGroupHijoPPer').patchValue(element);
          
          
        });
      } else {
        // Inicializar los form group con datos del usuario activo
        
          this.formGroupPadrePPer.get('formGroupHijoPPer').patchValue(this.inicializarFormHijoPPer);
          this.formGroupPadrePPer.get('formGroupHijoPPer').get('id_num_sapId').setValue(this.usuarioActivo.ID);
          this.formGroupPadrePPer.get('formGroupHijoPPer').get('id_periId').setValue(1);
          this.formGroupPadrePPer.get('formGroupHijoPPer').get('disc_mova').setValue('');
          this.formGroupPadrePPer.get('formGroupHijoPPer').get('disc_fort').setValue('');
  
      }

    });
    // console.log(this.infoEspecificaForm.get(this.nombresFromGroup[0]).value);
  }

  async infoCAutodesarrollo() {
    await this.etapaService.obtenerinfoCAutodesarrollo(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info Competencia Autodesarrollo');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.coau_competencia === 'Autogestión' ) {
            this.formGroupPadreCA.get('formGroupHijoPE').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoPE').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Accountability' ) {
            this.formGroupPadreCA.get('formGroupHijoPE2').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoPE2').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Generación de Redes' ) {
            this.formGroupPadreCA.get('formGroupHijoPE3').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoPE3').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Innovación' ) {
            this.formGroupPadreCA.get('formGroupHijoPE4').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoPE4').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Tolerancia a la Frustración' ) {
            this.formGroupPadreCA.get('formGroupHijoPE5').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoPE5').get('coau_competencia').disable();
          }
  
        });
      } else {

        this.nombresFromGroupCAUTODESARROLLO.forEach(element => {

                  this.formGroupPadreCA.get(element).patchValue({
                    ID: '',
                    id_periId: '1',
                    id_num_sapId: this.usuarioActivo.ID,
                    coau_competencia: '',
                    coau_eval1: '',
                    coau_eval2: '',
                  });

                  this.formGroupPadreCA.get(element).get('coau_competencia').disable();
        });


      }

    });
  }

  async infoFeedbackR() {
    await this.etapaService.obtenerinfoFR(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info Feedback Recibido');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.coau_competencia === 'Autogestión' ) {
            this.formGroupPadreCA.get('formGroupHijoFR1').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoFR1').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Accountability' ) {
            this.formGroupPadreCA.get('formGroupHijoFR2').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoFR2').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Generación de Redes' ) {
            this.formGroupPadreCA.get('formGroupHijoFR3').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoFR3').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Innovación' ) {
            this.formGroupPadreCA.get('formGroupHijoFR4').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoFR4').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Tolerancia a la Frustración' ) {
            this.formGroupPadreCA.get('formGroupHijoFR5').patchValue(element);
            this.formGroupPadreCA.get('formGroupHijoFR5').get('coau_competencia').disable();
          }
  
        });
      } else {

        this.nombresFromGroupFEEDBACKR.forEach(element => {

                  this.formGroupPadreCA.get(element).patchValue({
                    ID: '',
                    id_periId: '1',
                    id_num_sapId: this.usuarioActivo.ID,
                    coau_competencia: '',
                    fdbk_comentario: '',
                    fdbk_fecha: '',
                    fdbk_persona: '',
                  });

                  this.formGroupPadreCA.get(element).get('coau_competencia').disable();
        });


      }

    });
  }

  async infoTFortaleza() {
    await this.etapaService.obtenerInfoTFor(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info Top Fortalezas');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.ocom_tipo === 'Fortaleza1' ) {
            this.formGroupPadreOCom.get('formGroupHijoTF').patchValue(element);
            this.formGroupPadreOCom.get('formGroupHijoTF').get('ocom_tipo').disable();
          }
          if ( element.ocom_tipo === 'Fortaleza2' ) {
            this.formGroupPadreOCom.get('formGroupHijoTF2').patchValue(element);
            this.formGroupPadreOCom.get('formGroupHijoTF2').get('ocom_tipo').disable();
          }
          if ( element.ocom_tipo === 'Fortaleza3' ) {
            this.formGroupPadreOCom.get('formGroupHijoTF3').patchValue(element);
            this.formGroupPadreOCom.get('formGroupHijoTF3').get('ocom_tipo').disable();
          }
  
        });
      } else {

        this.nombresFromGroupTFORTALEZAall.forEach(element => {

                  // this.formGroupPadreOCom.get(element).patchValue({
                  //   ID: '',
                  //   id_periId: '1',
                  //   id_num_sapId: this.usuarioActivo.ID,
                  //   ocom_descripcion: '',
                  //   //ocom_tipo: '', //Comentado para guardar los datos por defecto
                  // });

                  this.formGroupPadreOCom.get(element).get('id_periId').setValue('1');
                  this.formGroupPadreOCom.get(element).get('id_num_sapId').setValue(this.usuarioActivo.ID);
                 // this.formGroupPadreOCom.get(element).get('ocom_tipo').disable();
        });


      }

    });
  }

  async infoOMejora() {
    await this.etapaService.obtenerInfoOM(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info O.Mejoras');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.ocom_tipo === 'Mejora1' ) {
            this.formGroupPadreOCom.get('formGroupHijoOM1').patchValue(element);
            this.formGroupPadreOCom.get('formGroupHijoOM1').get('ocom_tipo').disable();
          }
          if ( element.ocom_tipo === 'Mejora2' ) {
            this.formGroupPadreOCom.get('formGroupHijoOM2').patchValue(element);
            this.formGroupPadreOCom.get('formGroupHijoOM2').get('ocom_tipo').disable();
          }
  
        });
      } else {

        this.nombresFromGroupOMEJORAall.forEach(element => {

          this.formGroupPadreOCom.get(element).get('id_periId').setValue('1');
          this.formGroupPadreOCom.get(element).get('id_num_sapId').setValue(this.usuarioActivo.ID);
        });


      }

    });
  }

  async infoCHECKL() {
    await this.etapaService.obtenerinfoCHECKL(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info CHECKL');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.mova_descripcion === 'Realizar actividades y proyectos variados' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL1').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL1').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Ser un/a experto/a en mi área' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL2').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL2').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Innovar y ser creativo/a' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL3').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL3').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Tener un trabajo con sentido e impacto' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL4').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL4').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Asumir desafíos' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL5').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL5').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Influenciar a otros/as' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL6').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL6').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Alcanzar una sensación de logro' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL7').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL7').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Tener visibilidad/prestigio dentro y/o fuera de la empresa' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL8').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL8').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Tener líderes que sean referentes en mi contexto laboral' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL9').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL9').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Tener tiempo para mí vida personal' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL10').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL10').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Gestionar e integrar distintas funciones' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL11').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL11').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Recibir recompensas monetarias' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL12').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL12').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Trabajar como equipo' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL13').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL13').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Tener autonomía para realizar mis funciones' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL14').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL14').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Trabajar sin mucha presión' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL15').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL15').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Tener flexibilidad para compatibilizar con otros aspectos de mi vida' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL16').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL16').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === 'Prestar un servicio que sea valorado por el/la cliente' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL17').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoCHECKL17').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === '' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL18').patchValue(element);
            //this.formGroupPadreMVal.get('formGroupHijoCHECKL18').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === '' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL19').patchValue(element);
            //this.formGroupPadreMVal.get('formGroupHijoCHECKL19').get('mova_descripcion').disable();
          }
          if ( element.mova_descripcion === '' ) {
            this.formGroupPadreMVal.get('formGroupHijoCHECKL20').patchValue(element);
            //this.formGroupPadreMVal.get('formGroupHijoCHECKL20').get('mova_descripcion').disable();
          }
  
        });
      } else {

        this.nombresFromGroupCHECKLISTMV.forEach(element => {

                  this.formGroupPadreMVal.get(element).patchValue({
                    ID: '',
                    id_periId: '1',
                    id_num_sapId: this.usuarioActivo.ID,
                    //mova_descripcion: '',
                    mova_valor: '',
                  });

                 // this.formGroupPadreMVal.get(element).get('mova_descripcion').disable();
        });


      }

    });
  }

  async infoTOP5V5() {
    await this.etapaService.obtenerinfoTOP5V5(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info TOP5V5');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.mova_valor === '1' ) {
            this.formGroupPadreMVal.get('formGroupHijoTOP5V1').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoTOP5V1').get('mova_valor').disable();
            this.formGroupPadreMVal.get('formGroupHijoTOP5V1').get('mova_descripcion').disable();
          }
          if ( element.mova_valor === '2' ) {
            this.formGroupPadreMVal.get('formGroupHijoTOP5V2').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoTOP5V2').get('mova_valor').disable();
            this.formGroupPadreMVal.get('formGroupHijoTOP5V2').get('mova_descripcion').disable();
          }
          if ( element.mova_valor === '3' ) {
            this.formGroupPadreMVal.get('formGroupHijoTOP5V3').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoTOP5V3').get('mova_valor').disable();
            this.formGroupPadreMVal.get('formGroupHijoTOP5V3').get('mova_descripcion').disable();
          }
          if ( element.mova_valor === '4' ) {
            this.formGroupPadreMVal.get('formGroupHijoTOP5V4').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoTOP5V4').get('mova_valor').disable();
            this.formGroupPadreMVal.get('formGroupHijoTOP5V4').get('mova_descripcion').disable();
          }
          if ( element.mova_valor === '5' ) {
            this.formGroupPadreMVal.get('formGroupHijoTOP5V5').patchValue(element);
            this.formGroupPadreMVal.get('formGroupHijoTOP5V5').get('mova_valor').disable();
            this.formGroupPadreMVal.get('formGroupHijoTOP5V5').get('mova_descripcion').disable();
          }
        });
      } else {

        this.nombresFromGroupTOP5V.forEach(element => {

                  this.formGroupPadreMVal.get(element).patchValue({
                    ID: '',
                    id_periId: '1',
                    id_num_sapId: this.usuarioActivo.ID,
                    //mova_descripcion: '',
                    mova_valor: '',
                  });

                  //this.formGroupPadreMVal.get(element).get('mova_valor').disable();
                  //this.formGroupPadreMVal.get(element).get('mova_descripcion').disable();
        });


      }

    });
  }

  goToLink(url: string) {
    window.open(url, '_blank');
  }

  goToLinkSelf(url: string) {
    window.open(url, '_self');
  }

  recibirUsuarioActivo($event) {
    this.usuarioActivo = $event;
    console.log('usuarioActivo desde Padre ' + this.usuarioActivo.ID);
    // A continuación las acciones necesarias a realizar con el dato del usuario

    //Etapa1
    this.infoPPer(); //Cargar info Perfil Personalidad
    this.infoCAutodesarrollo(); // Cargar info Competencia Autodesarrollo
    this.infoFeedbackR(); // Cargar info Feedback Recibido 
    this.infoTFortaleza(); // Cargar info Top Fortalezas 
    this.infoOMejora(); // Cargar info Top Mejoras 
    this.infoCHECKL(); //Cargar info Check List
    this.infoTOP5V5(); //Cargar info Check List

    }

    valorFecha(event) {
      console.log('Valor DatePicker');
      console.log(event.value);
  
      console.log(moment(event.value).format('YYYY-MM-DDTHH:mm:ss[Z]'));
      console.log(moment.utc(event.value).add(14, 'hours').format('YYYY-MM-DDTHH:mm:ss'));
      console.log(moment.utc(event.value).add(2, 'hours').format('YYYY-MM-DDTHH:mm:ss[Z]'));
  
      console.log('FORMULARIO PADRE');
      console.log(this.formGroupPadreCA.value);
      // let now = moment().format('LLLL');
      // console.log(now);
  
    }

}
