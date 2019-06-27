import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, take } from 'rxjs/operators';
import { Cargo, InfoGeneral, InfoEspecifica, InfoCA, Usuario, Periodo, Rol } from 'src/app/models/etapa2.module';
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
  nombreCampo3?: string;
  nombreMostrar3?: string;
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
  

  nombresFromGroup = ['formGroupHijo2', 'formGroupHijo3'];

  inicializarFormHijo1 = INICIALIZARFORMLARGO;
  inicializarFormHijo2 = INICIALIZARFORMCORTO; // Se utilizará para corto y mediano

  //Inicializa valors del formulario
  inicializarFormHijo4 = INICIALIZARPERFILPERSONALIDAD; // Se utilizará para ETAPA 1
  inicializarFormHijoPE = INICIALIZARCAUTODESARROLLO; // Se utilizará para ETAPA 1
  inicializarFormHijoFR = INICIALIZARFEEDBACKR; // Se utilizará para ETAPA 1

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

  camposFormFR: CamposForm[] = CAMPOSFEEDBACKR; //ETAPA1

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

      formGroupHijoFR: this.fb.group(this.inicializarFormHijoFR)

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

  submitEtapa() {
        this.onSubmitInfoLargo().then( () => {
          this.onSubmitInfoInter();
          this.onSubmitCAutodesarrollo(); //Etapa1
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
    }

}
