import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, take } from 'rxjs/operators';
import { Cargo, InfoGeneral, InfoEspecifica, InfoCA, InfoFR, Usuario, Periodo, Rol } from 'src/app/models/etapa2.module';
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
  CAMPOSCORTO,
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
  CAMPOSTFORTALEZA,
  CAMPOSTFORTALEZA1,
  CAMPOSTFORTALEZA2,
  INICIALIZAROMEJORA,
  CAMPOSOMEJORA,
  CAMPOSOMEJORA1,
  CAMPOSOMEJORA2,
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
  CAMPOSTOP5V1,
  CAMPOSTOP5V2,
  CAMPOSTOP5V3,
  CAMPOSTOP5V4,
  CAMPOSTOP5V5
} from './data';
import { Form } from '@pnp/sp/src/forms';
import { INICIALIZARFORMCORTO } from './data';


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
  nombreCampo1FR?: string;
  nombreMostrar1FR?: string;
  nombreCampo2FR?: string;
  nombreMostrar2FR?: string;
  nombreCampo3FR?: string;
  nombreMostrar3FR?: string;

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

  usuarioActivo: Usuario;

  infoEsSel: InfoEspecifica = null;
  infoEsSel2: InfoEspecifica = null;
  infoEsSel3: InfoEspecifica = null;
  infogeSel: InfoGeneral = null;
  infocaSel: InfoCA = null;
  infofrSel: InfoFR = null; //REVISAR

  // controles y estructura para formularios (Escucha los campos del formulario)
  formGroupPadre: FormGroup;
  formGroupHijo1: FormGroup;
  formGroupHijo2: FormGroup;
  formGroupHijo3: FormGroup;
  formGroupHijo4: FormGroup;

  // ETAPA1
  formGroupPadre2: FormGroup;
  formGroupHijoPE: FormGroup;
  formGroupHijoPE2: FormGroup;
  formGroupHijoPE3: FormGroup;
  formGroupHijoPE4: FormGroup;
  formGroupHijoPE5: FormGroup;

  formGroupHijoFR: FormGroup;
  formGroupHijoFR2: FormGroup;
  formGroupHijoFR3: FormGroup;
  formGroupHijoFR4: FormGroup;
  formGroupHijoFR5: FormGroup;
  
  formGroupPadreOCom: FormGroup;

  formGroupPadreMVal: FormGroup;

  nombresFromGroup = ['formGroupHijo2', 'formGroupHijo3'];

  inicializarFormHijo1 = INICIALIZARFORMLARGO;
  inicializarFormHijo2 = INICIALIZARFORMCORTO; // Se utilizará para corto y mediano

  //Inicializa valors del formulario
  inicializarFormHijo4 = INICIALIZARPERFILPERSONALIDAD; // Se utilizará para ETAPA 1
  inicializarFormHijoPE = INICIALIZARCAUTODESARROLLO; // Se utilizará para ETAPA 1
  inicializarFormHijoFR = INICIALIZARFEEDBACKR; // Se utilizará para ETAPA 1

  inicializarFormHijoTF = INICIALIZARTFORTALEZA; // Se utilizará para ETAPA 1

  inicializarFormHijoOM = INICIALIZAROMEJORA; // Se utilizará para ETAPA 1

  // Crea el formulario HTML
  camposForm1: CamposForm[] = CAMPOSLARGO;
  camposForm2: CamposForm[] = CAMPOSCORTO;
  camposForm3: CamposForm[] = CAMPOSMEDIANO;

  camposForm4: CamposForm[] = CAMPOSPERFIL; //ETAPA1

  camposForm5: CamposForm[] = CAMPOSCAUTODESARROLLO1; //ETAPA1
  camposForm6: CamposForm[] = CAMPOSCAUTODESARROLLO2; //ETAPA1 No utilizado
  camposForm7: CamposForm[] = CAMPOSCAUTODESARROLLO3; //ETAPA1 No utilizado
  camposForm8: CamposForm[] = CAMPOSCAUTODESARROLLO4; //ETAPA1 No utilizado
  camposForm9: CamposForm[] = CAMPOSCAUTODESARROLLO5; //ETAPA1 No utilizado

  nombresFromGroupCAUTODESARROLLO = ['formGroupHijoPE', 'formGroupHijoPE2', 'formGroupHijoPE3', 'formGroupHijoPE4', 'formGroupHijoPE5'];

  nombresFromGroupFEEDBACKR = ['formGroupHijoFR', 'formGroupHijoFR2', 'formGroupHijoFR3', 'formGroupHijoFR4', 'formGroupHijoFR5'];

  nombresFromGroupTFORTALEZA = ['formGroupHijoTF1', 'formGroupHijoTF2', 'formGroupHijoTF3'];

  nombresFromGroupOMEJORA = ['formGroupHijoOM1', 'formGroupHijoOM2'];

// tslint:disable-next-line: max-line-length
  nombresFromGroupCHECKLISTMV = ['formGroupHijoCHECKL1', 'formGroupHijoCHECKL2', 'formGroupHijoCHECKL3', 'formGroupHijoCHECKL4', 'formGroupHijoCHECKL5', 'formGroupHijoCHECKL6', 'formGroupHijoCHECKL7','formGroupHijoCHECKL8', 'formGroupHijoCHECKL9', 'formGroupHijoCHECKL10', 'formGroupHijoCHECKL11', 'formGroupHijoCHECKL12', 'formGroupHijoCHECKL13', 'formGroupHijoCHECKL14', 'formGroupHijoCHECKL15', 'formGroupHijoCHECKL16', 'formGroupHijoCHECKL17', 'formGroupHijoCHECKL18', 'formGroupHijoCHECKL19', 'formGroupHijoCHECKL20'];
// tslint:disable-next-line: max-line-length  
  nombresFromGroupTOP5V = ['formGroupHijoTOP5V1', 'formGroupHijoTOP5V2', 'formGroupHijoTOP5V3', 'formGroupHijoTOP5V4', 'formGroupHijoTOP5V5'];

  camposFormFR: CamposForm[] = CAMPOSFEEDBACKR; //ETAPA1
  camposFormFR2: CamposForm[] = CAMPOSFEEDBACKR2; //ETAPA1 No utilizado
  camposFormFR3: CamposForm[] = CAMPOSFEEDBACKR3; //ETAPA1 No utilizado
  camposFormFR4: CamposForm[] = CAMPOSFEEDBACKR4; //ETAPA1 No utilizado
  camposFormFR5: CamposForm[] = CAMPOSFEEDBACKR5; //ETAPA1 No utilizado

  camposFormTF: CamposForm[] = CAMPOSTFORTALEZA; //ETAPA1
  camposFormTF1: CamposForm[] = CAMPOSTFORTALEZA1; //ETAPA1 No utilizado
  camposFormTF2: CamposForm[] = CAMPOSTFORTALEZA2; //ETAPA1 No utilizado

  camposFormOM: CamposForm[] = CAMPOSOMEJORA; //ETAPA1
  camposFormOM1: CamposForm[] = CAMPOSOMEJORA1; //ETAPA1 No utilizado
  camposFormOM2: CamposForm[] = CAMPOSOMEJORA2; //ETAPA1 No utilizado

  camposFormCHECKL: CamposForm[] = CAMPOSCHECKL; //ETAPA1
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
    // Creamos el Form
    this.createForms();
  }

  createForms() {

    this.formGroupPadre = this.fb.group({
      formGroupHijo1: this.fb.group(this.inicializarFormHijo1),
      formGroupHijo2: this.fb.group(this.inicializarFormHijo2),
      formGroupHijo3: this.fb.group(this.inicializarFormHijo2),
      formGroupHijo4: this.fb.group(this.inicializarFormHijo4)

    });

    this.formGroupPadre2 = this.fb.group({
      formGroupHijoPE: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE2: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE3: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE4: this.fb.group(this.inicializarFormHijoPE),
      formGroupHijoPE5: this.fb.group(this.inicializarFormHijoPE),

      formGroupHijoFR: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR2: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR3: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR4: this.fb.group(this.inicializarFormHijoFR),
      formGroupHijoFR5: this.fb.group(this.inicializarFormHijoFR)

    });

    this.formGroupPadreOCom = this.fb.group({
      formGroupHijoTF1: this.fb.group(this.inicializarFormHijoTF),
      formGroupHijoTF2: this.fb.group(this.inicializarFormHijoTF),
      formGroupHijoTF3: this.fb.group(this.inicializarFormHijoTF),

      formGroupHijoOM1: this.fb.group(this.inicializarFormHijoOM),
      formGroupHijoOM2: this.fb.group(this.inicializarFormHijoOM)

    });
  
    this.formGroupPadreMVal = this.fb.group({
        formGroupHijoCHECKL1: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL2: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL3: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL4: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL5: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL6: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL7: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL8: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL9: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL10: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL11: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL12: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL13: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL14: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL15: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL16: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL17: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL18: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL19: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoCHECKL20: this.fb.group(this.inicializarFormHijoTF),

        formGroupHijoTOP5V1: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoTOP5V2: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoTOP5V3: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoTOP5V4: this.fb.group(this.inicializarFormHijoTF),
        formGroupHijoTOP5V5: this.fb.group(this.inicializarFormHijoTF)
      });
}

  async onSubmitInfoLargo() {

    this.guardando = true;
    console.log(this.formGroupPadre.get('formGroupHijo1').value);
    const elementInfoId = this.formGroupPadre.get('formGroupHijo1').get('ID').value;
    const elementInfoValue = this.formGroupPadre.get('formGroupHijo1').value;
    const objetoAuxiliar = elementInfoValue;
    delete objetoAuxiliar.ID;

    if ( elementInfoId !== '' ) {
      console.log('Existe info objeto');
      await this.etapaService.actualizarInfoLargo(elementInfoValue, elementInfoId).then( () => {
        this.snackBar.open('Información LP guardada', 'x', {
          duration: 5000,
        });
        this.guardando = false;
      });
    } else {
      console.log('NO Existe info objeto');
      console.log(objetoAuxiliar);
      await this.etapaService.guardarInfoLargo(objetoAuxiliar).then( () => {
        this.infoLargo().then( () => {
          this.snackBar.open('Información LP guardada', 'x', {
            duration: 5000,
          });
          this.guardando = false;
        });
      });
    }

  }

  async onSubmitInfoInter() {

    this.guardando = true;
    //console.log(this.infoEspecificaForm.value);

    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.nombresFromGroup.length; i++) {

      const element = this.nombresFromGroup[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadre.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadre.get(element).value; // Obtengo todos los values del submit del form hijo
      // console.log(this.formGroupPadre.get(element).get('ID').value );

      if (elementInfoId !== '') { // si el ID NO esta vacio
        console.log('Existe info objeto');
        console.log(elementInfoValue );
        await this.etapaService.actualizarInfoInter(elementInfoValue, elementInfoId).then(() => {
              if ( i === this.nombresFromGroup.length - 1 ) { // solo para el ultimo form Hijo
                this.guardando = false;
                this.snackBar.open('Información Inter guardada', 'x', {
                      duration: 5000,
                    });
              }
            });
      } else { // SI ESTA VACIO
        console.log('NO Existe info  objeto');
        const objetoAuxiliar = elementInfoValue;
        delete objetoAuxiliar.ID; // ELIMINO DEL SUBMIT EL ELEMENTO ID PARA QUE EN SP SE INGRESE UNO NUEVO
        console.log(objetoAuxiliar);

        await this.etapaService.guardarInfoInter(objetoAuxiliar).then(() => {
          if ( i === this.nombresFromGroup.length - 1 ) {
            this.infoInter().then( () => {
              this.guardando = false;
              this.snackBar.open('Información Inter guardada', 'x', {
                    duration: 5000,
                  });
            });
          }
        });
      }
    }
  }

  //Etapa1
  async onSubmitCAutodesarrollo() {

    this.guardando = true;
    for (let i = 0; i < this.nombresFromGroupCAUTODESARROLLO.length; i++) {

      const element = this.nombresFromGroupCAUTODESARROLLO[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadre2.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadre2.get(element).value; // Obtengo todos los values del submit del form hijo
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

      const element = this.nombresFromGroupFEEDBACKR[i]; // se asigna nombre del form hijo
      const elementInfoId = this.formGroupPadre2.get(element).get('ID').value; //obtengo el valor de form indicado pero solo el campo ID
      const elementInfoValue = this.formGroupPadre2.get(element).value; // Obtengo todos los values del submit del form hijo
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

  submitEtapa() {
        this.onSubmitInfoLargo().then( () => {
          this.onSubmitInfoInter();
          this.onSubmitCAutodesarrollo(); //Etapa1
          this.onSubmitFEEDBACKR(); //Etapa1
        });

  }

  async infoInter() {
    await this.etapaService.obtenerInfoInter(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info INTER');
      console.log(resp);

      if (resp.length > 0 ) {
        resp.forEach(element => {
          if ( element.hiti_tipo_plzo === 'Corto' ) {
            this.formGroupPadre.get('formGroupHijo2').patchValue(element);
          }

          if ( element.hiti_tipo_plzo === 'Largo' ) {
            this.formGroupPadre.get('formGroupHijo3').patchValue(element);
          }
          
          
        });
      } else {
        // Inicializar los form group con datos del usuario activo
        
          this.formGroupPadre.get('formGroupHijo2').patchValue(this.inicializarFormHijo2);
          this.formGroupPadre.get('formGroupHijo2').get('id_num_sapId').setValue(this.usuarioActivo.ID);
          this.formGroupPadre.get('formGroupHijo2').get('id_periId').setValue(1);
          this.formGroupPadre.get('formGroupHijo2').get('hiti_tipo_plzo').setValue('Corto');

          this.formGroupPadre.get('formGroupHijo3').patchValue(this.inicializarFormHijo2);
          this.formGroupPadre.get('formGroupHijo3').get('id_num_sapId').setValue(this.usuarioActivo.ID);
          this.formGroupPadre.get('formGroupHijo3').get('id_periId').setValue(1);
          this.formGroupPadre.get('formGroupHijo3').get('hiti_tipo_plzo').setValue('Largo');
  
      }

    });
    // console.log(this.infoEspecificaForm.get(this.nombresFromGroup[0]).value);
  }

  async infoLargo() {
    await this.etapaService.obtenerInfoLargo(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info LARGO');
      console.log(resp);
      if ( resp[0] ) {
        this.formGroupPadre.get('formGroupHijo1').patchValue(resp[0]);
      } else {
        this.formGroupPadre.get('formGroupHijo1').patchValue({
          ID: '',
          id_periId: '1',
          id_num_sapId: this.usuarioActivo.ID,
          meca_area_py: '',
          meca_comp_falta: '',
          meca_comp_tengo: '',
          meca_cuando: '',
          meca_escala: '',
          meca_mision: '',
          meca_motivacion: '',
          meca_reg_falta: '',
          meca_req_tengo: '',
        });
      }
    });
  }

  async infoCAutodesarrollo() {
    await this.etapaService.obtenerinfoCAutodesarrollo(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('Obtener datos info Competencia Autodesarrollo');
      console.log(resp);

      if (resp.length > 0) {

        resp.forEach(element => {
  
          if ( element.coau_competencia === 'Autogestión' ) {
            this.formGroupPadre2.get('formGroupHijoPE').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoPE').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Accountability' ) {
            this.formGroupPadre2.get('formGroupHijoPE2').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoPE2').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Generación de Redes' ) {
            this.formGroupPadre2.get('formGroupHijoPE3').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoPE3').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Innovación' ) {
            this.formGroupPadre2.get('formGroupHijoPE4').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoPE4').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Tolerancia a la Frustración' ) {
            this.formGroupPadre2.get('formGroupHijoPE5').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoPE5').get('coau_competencia').disable();
          }
  
        });
      } else {

        this.nombresFromGroupCAUTODESARROLLO.forEach(element => {

                  this.formGroupPadre2.get(element).patchValue({
                    ID: '',
                    id_periId: '1',
                    id_num_sapId: this.usuarioActivo.ID,
                    coau_competencia: '',
                    coau_eval1: '',
                    coau_eval2: '',
                  });

                  this.formGroupPadre2.get(element).get('coau_competencia').disable();
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
            this.formGroupPadre2.get('formGroupHijoFR').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoFR').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Accountability' ) {
            this.formGroupPadre2.get('formGroupHijoFR2').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoFR2').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Generación de Redes' ) {
            this.formGroupPadre2.get('formGroupHijoFR3').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoFR3').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Innovación' ) {
            this.formGroupPadre2.get('formGroupHijoFR4').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoFR4').get('coau_competencia').disable();
          }
          if ( element.coau_competencia === 'Tolerancia a la Frustración' ) {
            this.formGroupPadre2.get('formGroupHijoFR5').patchValue(element);
            this.formGroupPadre2.get('formGroupHijoFR5').get('coau_competencia').disable();
          }
  
        });
      } else {

        this.nombresFromGroupFEEDBACKR.forEach(element => {

                  this.formGroupPadre2.get(element).patchValue({
                    ID: '',
                    id_periId: '1',
                    id_num_sapId: this.usuarioActivo.ID,
                    coau_competencia: '',
                    fdbk_comentario: '',
                    fdbk_fecha: '',
                    fdbk_persona: '',
                  });

                  this.formGroupPadre2.get(element).get('coau_competencia').disable();
        });


      }

    });
  }


  goToLink(url: string) {
    window.open(url, '_blank');
  }

  recibirUsuarioActivo($event) {
    this.usuarioActivo = $event;
    console.log('usuarioActivo desde Padre ' + this.usuarioActivo.ID);
    // A continuación las acciones necesarias a realizar con el dato del usuario

    this.infoLargo(); // Cargar info Largo
    this.infoInter(); // Cargar info Inter

    //Etapa2
    this.infoCAutodesarrollo(); // Cargar info Competencia Autodesarrollo
    this.infoFeedbackR(); // Cargar info Feedback Recibido 
    }

    
}
