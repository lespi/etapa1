import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, take } from 'rxjs/operators';
import { Cargo, InfoGeneral, InfoEspecifica, Usuario, Periodo, Rol, CamposFeedbackRec } from 'src/app/models/etapa2.module';
import { Etapa2Service } from '../../services/etapa2.service';
import { MatSelect } from '@angular/material';
import {MatSnackBar} from '@angular/material';

export interface CamposPromedioEvaluacion {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoEval1: string;
  nombreCampoEval2?: string;
}

export interface CamposTablaGenerica {
  nombreCampoColum1?: string;
  nombreMostrar?: string;
  nombreCampoColum2?: string;
  nombreCampoColum3?: string;
}

export interface CamposOtrasCompetencias {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoTipo: string;
}

export interface CamposOportunidadesMejoras {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoTipo: string;
}

export interface CamposMotivacionesyValores {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoValor: string;
}

export interface CamposTop5Valore {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoValor: string;
}


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit, AfterViewInit, OnDestroy {

  formattedMessage: string;
  usuarioLogeado: Usuario;
  usuarioActivo: Usuario;
  usuarioLogeadoRol: Rol[] = [];
  cargoSel: Cargo;
  cargoSel2: Cargo;
  cargoSel3: Cargo;
  infoEsSel: InfoEspecifica = null;
  infoEsSel2: InfoEspecifica = null;
  infoEsSel3: InfoEspecifica = null;
  infogeSel: InfoGeneral = null;

  qtyCargos = 3;

  public textoRol: any;
  // Select Usuario
  private usuarios: Usuario[] = [
    {
      id_num_sap: 1111,
      per_nombre: 'Klauss Adam'
    },
    {
      id_num_sap: 2222,
      per_nombre: 'Luis Espinoza'
    }
  ];
  public usuarioCtrl: FormControl = new FormControl();
  public usuarioFilterCtrl: FormControl = new FormControl();
  public filteredUsuarios: ReplaySubject<Usuario[]> = new ReplaySubject<Usuario[]>(1);
  @ViewChild('singleSelectUsuario') singleSelectUsuario: MatSelect;
  protected _onDestroy = new Subject<void>();

  // Select Cargo 1
  private cargos: Cargo[] = [
    {
      ID: 1,
      car_nombre: 'Especialista Avansado de Productividad',
      car_direccion: 'Proyectos'
    },
    {
      ID: 2,
      car_nombre: 'Control Gestión',
      car_direccion: 'Proyectos'
    }
  ];
  public cargoCtrl: FormControl = new FormControl();
  public cargoFilterCtrl: FormControl = new FormControl();
  public filteredCargos: ReplaySubject<Cargo[]> = new ReplaySubject<Cargo[]>(1);
  @ViewChild('singleSelectCargo') singleSelectCargo: MatSelect;
    // protected _onDestroyCargo = new Subject<void>();

  // Select Cargo 2
  private cargos2: Cargo[] = [
    {
      ID: 1,
      car_nombre: 'Especialista Avansado de Productividad',
      car_direccion: 'Proyectos'
    },
    {
      ID: 2,
      car_nombre: 'Control Gestión',
      car_direccion: 'Proyectos'
    }
  ];
  public cargo2Ctrl: FormControl = new FormControl();
  public cargo2FilterCtrl: FormControl = new FormControl();
  public filteredCargos2: ReplaySubject<Cargo[]> = new ReplaySubject<Cargo[]>(1);
  @ViewChild('singleSelectCargo2') singleSelectCargo2: MatSelect;

  // Select Cargo 3
  private cargos3: Cargo[] = [
    {
      ID: 1,
      car_nombre: 'Especialista Avansado de Productividad',
      car_direccion: 'Proyectos'
    },
    {
      ID: 2,
      car_nombre: 'Control Gestión',
      car_direccion: 'Proyectos'
    }
  ];
  public cargo3Ctrl: FormControl = new FormControl();
  public cargo3FilterCtrl: FormControl = new FormControl();
  public filteredCargos3: ReplaySubject<Cargo[]> = new ReplaySubject<Cargo[]>(1);
  @ViewChild('singleSelectCargo3') singleSelectCargo3: MatSelect;

  // Select Periodo
  private periodos: Periodo[] = [
    {
      peri_fecha_anyo: 2018,
    },
    {
      peri_fecha_anyo: 2019,

    }
  ];
  public periodoCtrl: FormControl = new FormControl();
  public periodoFilterCtrl: FormControl = new FormControl();
  public filteredPeriodos: ReplaySubject<Periodo[]> = new ReplaySubject<Periodo[]>(1);
  @ViewChild('singleSelectPeriodo') singleSelectPeriodo: MatSelect;

  // @Input() placeholderLabel = 'Suche';
  // @Input() noEntriesFoundLabel = 'Keine Optionen gefunden';

  camposRequerimientos: CamposPromedioEvaluacion[] = [
    {
      nombreCampo: 'coau_competencia',
      nombreMostrar: 'Autogestión',
      nombreCampoEval1: 'coau_eval1',
      nombreCampoEval2: 'coau_eval2'
    }/*,
    {
      nombreCampo: 'coau_competencia2',
      nombreMostrar: 'Accountability',
      nombreCampoEval1: 'coau_evala2',
      nombreCampoEval2: 'coau_evalb2'
    },
    {
      nombreCampo: 'coau_competencia3',
      nombreMostrar: 'Generación de Redes',
      nombreCampoEval1: 'coau_evala3',
      nombreCampoEval2: 'coau_evalb3'
    },
    {
      nombreCampo: 'coau_competencia4',
      nombreMostrar: 'Innovación',
      nombreCampoEval1: 'coau_evala4',
      nombreCampoEval2: 'coau_evalb4'
    },
    {
      nombreCampo: 'coau_competencia5',
      nombreMostrar: 'Tolerancia a la Frustración',
      nombreCampoEval1: 'coau_evala5',
      nombreCampoEval2: 'coau_evalb5'
    },*/
  ];
  camposFeedbackRecibido: CamposTablaGenerica[] = [
    {
      nombreCampoColum1: 'fdbk_comentario',
      nombreMostrar: 'Comentario',
      nombreCampoColum2: 'fdbk_fecha',
      nombreCampoColum3: 'fdbk_persona'
    },
    {
      nombreCampoColum1: 'fdbk_comentario2',
      nombreMostrar: 'Comentario',
      nombreCampoColum2: 'fdbk_fecha2',
      nombreCampoColum3: 'fdbk_persona2'
    },
    {
      nombreCampoColum1: 'fdbk_comentario3',
      nombreMostrar: 'Comentario',
      nombreCampoColum2: 'fdbk_fecha3',
      nombreCampoColum3: 'fdbk_persona3'
    },
    {
      nombreCampoColum1: 'fdbk_comentario4',
      nombreMostrar: 'Comentario',
      nombreCampoColum2: 'fdbk_fecha4',
      nombreCampoColum3: 'fdbk_persona4'
    },
    {
      nombreCampoColum1: 'fdbk_comentario5',
      nombreMostrar: 'Comentario',
      nombreCampoColum2: 'fdbk_fecha5',
      nombreCampoColum3: 'fdbk_persona5'
    },
  ];

  camposOtrasCompetencias: CamposOtrasCompetencias[] = [
    {
      nombreCampo: 'ocom_descripcion',
      nombreMostrar: 'Excelencia y  Orientación a los resultados',
      nombreCampoTipo: 'ocom_tipo'
    },
    {
      nombreCampo: 'ocom_descripcion2',
      nombreMostrar: 'Responsabilidad y  Compromiso',
      nombreCampoTipo: 'ocom_tipo2'
    },
    {
      nombreCampo: 'ocom_descripcion3',
      nombreMostrar: 'Otra: Rápido para tomar decisiones',
      nombreCampoTipo: 'ocom_tipo3'
    },
  ];

  camposOportunidadesMejora: CamposOportunidadesMejoras[] = [
    {
      nombreCampo: 'ocom_descripcion4',
      nombreMostrar: 'Comunicación y  Negociación',
      nombreCampoTipo: 'ocom_tipo4'
    },
    {
      nombreCampo: 'ocom_descripcion5',
      nombreMostrar: 'Otra: Ignorar la opinión de personas que no tengo validadas',
      nombreCampoTipo: 'ocom_tipo5'
    },
  ];

  camposTop5Valores: CamposTop5Valore[] = [
    {
      nombreCampo: 'mova_descripcion',
      nombreMostrar: '1',
      nombreCampoValor: 'mova_valor'
    },
    {
      nombreCampo: 'mova_descripcion2',
      nombreMostrar: '2',
      nombreCampoValor: 'mova_valor2'
    },
    {
      nombreCampo: 'mova_descripcion3',
      nombreMostrar: '3',
      nombreCampoValor: 'mova_valor3'
    },
    {
      nombreCampo: 'mova_descripcion4',
      nombreMostrar: '4',
      nombreCampoValor: 'mova_valor4'
    },
    {
      nombreCampo: 'mova_descripcion5',
      nombreMostrar: '5',
      nombreCampoValor: 'mova_valor5'
    },
  ];

  camposMotivacionesValores: CamposMotivacionesyValores[] = [
    {
      nombreCampo: 'mova_descripcion',
      nombreMostrar: 'Realizar actividades y proyectos variados',
      nombreCampoValor: 'mova_valor'
    },
    {
      nombreCampo: 'mova_descripcion2',
      nombreMostrar: 'Ser un/a experto/a en mi área',
      nombreCampoValor: 'mova_valor2'
    },
    {
      nombreCampo: 'mova_descripcion3',
      nombreMostrar: 'Innovar y ser creativo/a',
      nombreCampoValor: 'mova_valor3'
    },
    {
      nombreCampo: 'mova_descripcion4',
      nombreMostrar: 'Tener un trabajo con sentido e impacto',
      nombreCampoValor: 'mova_valor4'
    },
    {
      nombreCampo: 'mova_descripcion5',
      nombreMostrar: 'Asumir desafíos',
      nombreCampoValor: 'mova_valor5'
    },
    {
      nombreCampo: 'mova_descripcion6',
      nombreMostrar: 'Influenciar a otros/as',
      nombreCampoValor: 'mova_valor6'
    },
    {
      nombreCampo: 'mova_descripcion7',
      nombreMostrar: 'Alcanzar una sensación de logro',
      nombreCampoValor: 'mova_valor7'
    },
    {
      nombreCampo: 'mova_descripcion8',
      nombreMostrar: 'Tener visibilidad/prestigio dentro y/o fuera de la empresa',
      nombreCampoValor: 'mova_valor8'
    },
    {
      nombreCampo: 'mova_descripcion9',
      nombreMostrar: 'Tener líderes que sean referentes en mi contexto laboral',
      nombreCampoValor: 'mova_valor9'
    },
    {
      nombreCampo: 'mova_descripcion10',
      nombreMostrar: 'Tener tiempo para mí vida personal',
      nombreCampoValor: 'mova_valor10'
    },
    {
      nombreCampo: 'mova_descripcion11',
      nombreMostrar: 'Gestionar e integrar distintas funciones',
      nombreCampoValor: 'mova_valor11'
    },
    {
      nombreCampo: 'mova_descripcion12',
      nombreMostrar: 'Recibir recompensas monetarias',
      nombreCampoValor: 'mova_valor12'
    },
    {
      nombreCampo: 'mova_descripcion13',
      nombreMostrar: 'Trabajar como equipo',
      nombreCampoValor: 'mova_valor13'
    },
    {
      nombreCampo: 'mova_descripcion14',
      nombreMostrar: 'Motivación 14" value="Tener autonomía para realizar mis funciones',
      nombreCampoValor: 'mova_valor14'
    },
    {
      nombreCampo: 'mova_descripcion15',
      nombreMostrar: 'Trabajar sin mucha presión',
      nombreCampoValor: 'mova_valor15'
    },
    {
      nombreCampo: 'mova_descripcion16',
      nombreMostrar: 'Tener flexibilidad para compatibilizar con otros aspectos de mi vida',
      nombreCampoValor: 'mova_valor16'
    },
    {
      nombreCampo: 'mova_descripcion17',
      nombreMostrar: 'Prestar un servicio que sea valorado por el/la cliente',
      nombreCampoValor: 'mova_valor17'
    },
    {
      nombreCampo: 'mova_descripcion18',
      nombreMostrar: '',
      nombreCampoValor: 'mova_valor18'
    },
    {
      nombreCampo: 'mova_descripcion19',
      nombreMostrar: '',
      nombreCampoValor: 'mova_valor19'
    },
    {
      nombreCampo: 'mova_descripcion20',
      nombreMostrar: '',
      nombreCampoValor: 'mova_valor20'
    },
  ];
/*
  camposMotivaciones: CamposPromedioEvaluacion[] = [
    {
      nombreCampo: 'infe_mova_1',
      nombreMostrar: 'Motivación 1',
      nombreCampoAjuste: 'infe_mova_1_ajus'
    },
    {
      nombreCampo: 'infe_mova_2',
      nombreMostrar: 'Motivación 2',
      nombreCampoAjuste: 'infe_mova_2_ajus'
    },
    {
      nombreCampo: 'infe_mova_3',
      nombreMostrar: 'Motivación 3',
      nombreCampoAjuste: 'infe_mova_3_ajus'
    },
    {
      nombreCampo: 'infe_mova_4',
      nombreMostrar: 'Motivación 4',
      nombreCampoAjuste: 'infe_mova_4_ajus'
    },
    {
      nombreCampo: 'infe_mova_5',
      nombreMostrar: 'Motivación 5',
      nombreCampoAjuste: 'infe_mova_5_ajus'
    }
  ];

  */
// Valores Jerarquzar
  selectJerarquizar = [
    {
      ID: 1,
      nompre: '1'
    },
    {
      ID: 2,
      nompre: '2'
    },
    {
      ID: 3,
      nompre: '3'
    },
    {
      ID: 4,
      nompre: '4'
    },
    {
      ID: 6,
      nompre: '6'
    },
    {
      ID: 7,
      nompre: '7'
    },
    {
      ID: 8,
      nompre: '8'
    },
    {
      ID: 9,
      nompre: '9'
    },
    {
      ID: 10,
      nompre: '10'
    },
    {
      ID: 11,
      nompre: '11'
    },
    {
      ID: 12,
      nompre: '12'
    },
    {
      ID: 13,
      nompre: '13'
    },
    {
      ID: 14,
      nompre: '14'
    },
    {
      ID: 15,
      nompre: '15'
    },
    {
      ID: 16,
      nompre: '16'
    },
    {
      ID: 17,
      nompre: '17'
    },
    {
      ID: 18,
      nompre: '18'
    },
    {
      ID: 19,
      nompre: '19'
    },
    {
      ID: 20,
      nompre: '20'
    },
  ];

  perfilPersoForm: FormGroup;
  infoEspecificaReqForm: FormGroup;
  infoEspecificaReqForm2: FormGroup;
  infoEspecificaReqForm3: FormGroup;
  competenciaAutodesarrolloForm: FormGroup;
  otrasCompetenciasForm: FormGroup;
  MotivacionesValoresForm: FormGroup;

  // Sin uso hasta el momento
  infoGeneralValidationMessages = {
    infg_busqueda_desafio: [
      { type: 'required', message: 'Debe ingresar información' }
    ],
    infg_busqueda_desafio_ajuste_com: [
      { type: 'required', message: 'Debe ingresar información' },
    ],
    infg_area_desarrollo: [
      { type: 'required', message: 'Debe ingresar información' },
    ],
    infg_area_desarrollo_ajuste_comp: [
      { type: 'required', message: 'Debe ingresar información' },
    ]
  };

  constructor(private fb: FormBuilder,
              private etapa2Service: Etapa2Service,
              private snackBar: MatSnackBar) { }

  ngOnInit() {


    // Obtener usuarioActivo
    // this.usuarioLogin();
    // Creamos el Form
    this.createForms();




  }

  async usuarioLogin() {

    await this.etapa2Service.getSPDataUsuario().then( (resp: [any]) => {
      // console.log('Usuario activo');
      // console.log(resp);
      this.usuarioActivo = new Usuario(
        resp[0].ID,
        resp[0].id_num_sap,
        resp[0].id_carId,
        resp[0].per_fecha_ingreso,
        resp[0].per_login,
        resp[0].per_lugar_trabajo,
        resp[0].per_nombre
      );

      this.usuarioLogeado = new Usuario(
        resp[0].ID,
        resp[0].id_num_sap,
        resp[0].id_carId,
        resp[0].per_fecha_ingreso,
        resp[0].per_login,
        resp[0].per_lugar_trabajo,
        resp[0].per_nombre
      );
      // console.log(this.usuarioActivo);
    });

    await this.etapa2Service.getSPDataRol().then( (resp: [any]) => {
      // console.log('Rol');
      // console.log(resp);
      // inicializo id_num_sap en formControls
      this.usuarioCtrl.setValue(this.usuarioActivo);
      this.perfilPersoForm.patchValue({
        id_periId: '1',
        id_num_sapId: this.usuarioActivo.ID,
      });

      this.infoEspecificaReqForm.patchValue({
        id_periId: '1',
        id_num_sapId: this.usuarioActivo.ID,
      });

      this.infoEspecificaReqForm2.patchValue({
        id_periId: '1',
        id_num_sapId: this.usuarioActivo.ID,
      });

      this.infoEspecificaReqForm3.patchValue({
        id_periId: '1',
        id_num_sapId: this.usuarioActivo.ID,
      });

      resp.forEach( element => {

        if ( element.rol_tipo === 'ADMINISTRADOR RRHH') {
          this.usuarioCtrl.enable();
          this.textoRol = 'ADMINISTRADOR RRHH';
          this.changeLabelName('labelRol', this.textoRol);
        }

        this.usuarioLogeadoRol.push( new Rol(
          element.rol_grupo_adc,
          element.rol_tipo,
          element.id_num_sap_txt
              ));
      });

      this.usuarioLogeado.rol = this.usuarioLogeadoRol;
      // console.log(this.usuarioActivoRol);
      console.log('Usuario Loageado');
      console.log(this.usuarioLogeado);
    });

    this.infoGenSel();
    this.infoEspSel();

  }

  createForms() {

    this.perfilPersoForm = this.fb.group({
      id_periId: [1],
      id_num_sapId: [1],
      disc_mova: [''],
      disc_fort: ['']
    });

    this.competenciaAutodesarrolloForm = this.fb.group({
      //id_carId: ['', Validators.required],
      id_periId: [1],
      id_num_sapId: [1],

    //  fdbk_comentario: [''],
    //  fdbk_fecha: [''],
    //  fdbk_persona: [''],

   //   fdbk_comentario2: [''],
   //   fdbk_fecha2: [''],
   //   fdbk_persona2: [''],

  //    fdbk_comentario3: [''],
   //   fdbk_fecha3: [''],
  //    fdbk_persona3: [''],

  //    fdbk_comentario4: [''],
   //   fdbk_fecha4: [''],
   //   fdbk_persona4: [''],

   //   fdbk_comentario5: [''],
   //   fdbk_fecha5: [''],
    //  fdbk_persona5: [''],

      coau_competencia: [''],
      coau_eval1: [''],
      coau_eval2: [''],

     // coau_competencia2: [''],
     // coau_evala2: [''],
     // coau_evalb2: [''],

     // coau_competencia3: [''],
     // coau_evala3: [''],
     // coau_evalb3: [''],

      //coau_competencia4: [''],
    //  coau_evala4: [''],
    //  coau_evalb4: [''],

      //coau_competencia5: [''],
     // coau_evala5: [''],
     // coau_evalb5: [''],

    });

    this.otrasCompetenciasForm = this.fb.group({
      id_carId: ['', Validators.required],
      id_periId: [''],
      id_num_sapId: [''],

        ocom_descripcion: [''],
        ocom_tipo: [''],

        ocom_descripcion2: [''],
        ocom_tipo2: [''],

        ocom_descripcion3: [''],
        ocom_tipo3: [''],

        ocom_descripcion4: [''],
        ocom_tipo4: [''],

        ocom_descripcion5: [''],
        ocom_tipo5: [''],

    });


    this.MotivacionesValoresForm = this.fb.group({
      id_carId: ['', Validators.required],
      id_periId: [''],
      id_num_sapId: [''],

        mova_descripcion: [''],
        mova_valor: [''],

        mova_descripcion2: [''],
        mova_valor2: [''],

        mova_descripcion3: [''],
        mova_valor3: [''],

        mova_descripcion4: [''],
        mova_valor4: [''],

        mova_descripcion5: [''],
        mova_valor5: [''],

        mova_descripcion6: [''],
        mova_valor6: [''],

        mova_descripcion7: [''],
        mova_valor7: [''],

        mova_descripcion8: [''],
        mova_valor8: [''],

        mova_descripcion9: [''],
        mova_valor9: [''],

        mova_descripcion10: [''],
        mova_valor10: [''],

        mova_descripcion11: [''],
        mova_valor11: [''],

        mova_descripcion12: [''],
        mova_valor12: [''],

        mova_descripcion13: [''],
        mova_valor13: [''],

        mova_descripcion14: [''],
        mova_valor14: [''],

        mova_descripcion15: [''],
        mova_valor15: [''],

        mova_descripcion16: [''],
        mova_valor16: [''],

        mova_descripcion17: [''],
        mova_valor17: [''],

        mova_descripcion18: [''],
        mova_valor18: [''],

        mova_descripcion19: [''],
        mova_valor19: [''],

        mova_descripcion20: [''],
        mova_valor20: [''],

    });

  }

  onSubmitPerfilForm(value) {
    console.log(value);
    // console.warn(value);
    this.etapa2Service.guardarperfilPerso(value);
    /*
    if(this.infogeSel) {
      console.log('Existe info general objeto');
      console.log(value);
      this.etapa2Service.actualizarInfoGeneral(value, this.infogeSel.ID);
      console.log(this.infogeSel);

    } else {
      console.log('NO Existe info general objeto');
      this.etapa2Service.guardarInfoGeneral(value);
      // this.infogeSel = new InfoGeneral(value);
      this.infoGenSel();

    }
    */
  }

  onSubmitCAutodesarrollo(value) {
    console.log(value);
    // console.warn(value);
    this.etapa2Service.guardarCAutodesarrollo(value);
    /*
    if(this.infogeSel) {
      console.log('Existe info general objeto');
      console.log(value);
      this.etapa2Service.actualizarInfoGeneral(value, this.infogeSel.ID);
      console.log(this.infogeSel);

    } else {
      console.log('NO Existe info general objeto');
      this.etapa2Service.guardarInfoGeneral(value);
      // this.infogeSel = new InfoGeneral(value);
      this.infoGenSel();

    }
    */
  }

 // onSubmitCAutodesarrollo(value) {
   // console.log(value);
    // console.warn(value);
    /*
    if(this.infoEsSel) {
      console.log('Existe info competencia autodesarrollo');
      console.log(value);
      this.etapa2Service.actualizarInfoEspecifica(value, this.infoEsSel.ID);
      console.log(this.infogeSel);

    } else {
      console.log('NO Existe info competencia autodesarrollo');
      this.etapa2Service.guardarCAutodesarrollo(value);
      this.infoEspSel();
    }

    this.snackBar.open('Información guardada', 'x', {
      duration: 5000,
    });
  }
*/
  onSubmitInfoGeneral(value) {
    console.log(value);
    // console.warn(value);
    if(this.infogeSel) {
      console.log('Existe info general objeto');
      console.log(value);
      this.etapa2Service.actualizarInfoGeneral(value, this.infogeSel.ID);
      console.log(this.infogeSel);

    } else {
      console.log('NO Existe info general objeto');
      this.etapa2Service.guardarInfoGeneral(value);
      // this.infogeSel = new InfoGeneral(value);
      this.infoGenSel();

    }

    this.snackBar.open('Información guardada', 'x', {
      duration: 5000,
    });
  }

  onSubmitInfoEspecifica(value) {
    console.log(value);
    // console.warn(value);
    if(this.infoEsSel) {
      console.log('Existe info especifica objeto');
      console.log(value);
      this.etapa2Service.actualizarInfoEspecifica(value, this.infoEsSel.ID);
      console.log(this.infogeSel);

    } else {
      console.log('NO Existe info especifica objeto');
      this.etapa2Service.guardarInfoEspecifica(value);
      this.infoEspSel();
    }

    this.snackBar.open('Información guardada', 'x', {
      duration: 5000,
    });
  }

  onSubmitInfoEspecifica2(value) {
    console.log(value);
    // console.warn(value);
    if(this.infoEsSel2) {
      console.log('Existe info especifica objeto');
      console.log(value);
      this.etapa2Service.actualizarInfoEspecifica(value, this.infoEsSel2.ID);
      console.log(this.infoEsSel2);

    } else {
      console.log('NO Existe info especifica objeto');
      this.etapa2Service.guardarInfoEspecifica(value);
      this.infoEspSel();
    }

    this.snackBar.open('Información guardada', 'x', {
      duration: 5000,
    });
  }

  onSubmitInfoEspecifica3(value) {
    console.log(value);
    // console.warn(value);
    if(this.infoEsSel3) {
      console.log('Existe info especifica objeto');
      console.log(value);
      this.etapa2Service.actualizarInfoEspecifica(value, this.infoEsSel3.ID);
      console.log(this.infoEsSel3);

    } else {
      console.log('NO Existe info especifica objeto');
      this.etapa2Service.guardarInfoEspecifica(value);
      this.infoEspSel();
    }

    this.snackBar.open('Información guardada', 'x', {
      duration: 5000,
    });
  }


// Select usuarios
  ngAfterViewInit() {
     this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  protected setInitialValue() {
    this.filteredUsuarios
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        this.singleSelectUsuario.compareWith = (a: Usuario, b: Usuario) => a && b && a.id_num_sap === b.id_num_sap;
      });
  }

  protected filterUsuarios() {
    if (!this.usuarios) {
      return;
    }
    let search = this.usuarioFilterCtrl.value;
    if (!search) {
      this.filteredUsuarios.next(this.usuarios.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredUsuarios.next(
      this.usuarios.filter(usuario => usuario.per_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCargos() {
    if (!this.cargos) {
      return;
    }
    let search = this.cargoFilterCtrl.value;
    if (!search) {
      this.filteredCargos.next(this.cargos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCargos.next(
      this.cargos.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCargos2() {
    if (!this.cargos2) {
      return;
    }
    let search = this.cargo2FilterCtrl.value;
    if (!search) {
      this.filteredCargos2.next(this.cargos2.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCargos2.next(
      this.cargos2.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterCargos3() {
    if (!this.cargos3) {
      return;
    }
    let search = this.cargo3FilterCtrl.value;
    if (!search) {
      this.filteredCargos3.next(this.cargos3.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredCargos3.next(
      this.cargos3.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(search) > -1)
    );
  }

  protected filterPeriodos() {
    if (!this.periodos) {
      return;
    }
    let search = this.periodoFilterCtrl.value;
    if (!search) {
      this.filteredPeriodos.next(this.periodos.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    this.filteredPeriodos.next(
      this.periodos.filter(periodo => periodo.peri_fecha_anyo.toString().toLowerCase().indexOf(search) > -1)
    );
  }


  usuarioSeleccionado() {

    this.cargoCtrl.setValue('');
    this.cargo2Ctrl.setValue('');
    this.cargo3Ctrl.setValue('');

    this.usuarioActivo = this.usuarios.find( x => x.ID === this.usuarioCtrl.value.ID);

    this.createForms();

    this.perfilPersoForm.patchValue({
      id_periId: '1',
      id_num_sapId: this.usuarioActivo.ID,
    });

    this.infoEspecificaReqForm.patchValue({
      id_periId: '1',
      id_num_sapId: this.usuarioActivo.ID,
    });

    this.infoEspecificaReqForm2.patchValue({
      id_periId: '1',
      id_num_sapId: this.usuarioActivo.ID,
    });

    this.infoEspecificaReqForm3.patchValue({
      id_periId: '1',
      id_num_sapId: this.usuarioActivo.ID,
    });

    console.log('Usuario Activo');
    console.log(this.usuarioActivo);

    this.infoGenSel();
    this.infoEspSel();
  }

  async infoEspSel() {

    await this.etapa2Service.obtenerInfoEspecifica(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('-----------------');
      console.log('Obtener datos info especifica');
      console.log(resp);
      // Solo 3 registros

      for (let i = 0; i < resp.length; i++) {
        const element = resp[i];

        if ( i === 0 ) {
          this.infoEspecificaReqForm.patchValue(element);

          this.infoEsSel = new InfoEspecifica(
            element.ID,
            element.id_carId,
            element.id_periId,
            element.id_num_sapId,
            element.infe_req_form,
            element.infe_req_form_ajus,
            element.infe_req_esp,
            element.infe_req_cono,
            element.infe_req_exp_general,
            element.infe_req_exp_esp,
            element.infe_req_esp_ajus,
            element.infe_req_exp_lider,
            element.infe_req_otro,
            element.infe_req_cono_ajus,
            element.infe_req_exp_general_ajus,
            element.infe_req_exp_esp_ajus,
            element.infe_req_exp_esp_anyo,
            element.infe_req_exp_lider_ajus,
            element.infe_req_otro_ajus,
            element.infe_req_exp_general_anyo,
            element.infe_req_exp_lider_anyo,
            element.infe_comp_1,
            element.infe_comp_2,
            element.infe_comp_3,
            element.infe_comp_4,
            element.infe_comp_5,
            element.infe_comp_6,
            element.infe_comp_1_ajus,
            element.infe_comp_2_ajus,
            element.infe_comp_3_ajus,
            element.infe_comp_4_ajus,
            element.infe_comp_5_ajus,
            element.infe_comp_6_ajus,
            element.infe_cond_jornada,
            element.infe_cond_otro,
            element.infe_cond_jornada_ajus,
            element.infe_cond_otro_ajus,
            element.infe_mova_1,
            element.infe_mova_2,
            element.infe_mova_3,
            element.infe_mova_4,
            element.infe_mova_5,
            element.infe_mova_1_ajus,
            element.infe_mova_2_ajus,
            element.infe_mova_3_ajus,
            element.infe_mova_4_ajus,
            element.infe_mova_5_ajus,
            element.infe_direccion,
            element.infe_rotacion,
            element.infe_gerencia,
            element.infe_mision
          );

          console.log('verificando cargos');
          console.log(this.cargos);
          this.cargoSel = this.cargos.find(x => x.ID === element.id_carId);

          this.cargoCtrl.setValue(this.cargoSel);
          console.log('Cargo Activo desde infoEspSel 1');
          console.log(this.cargoSel);
        }

        if ( i === 1 ) {
          this.infoEspecificaReqForm2.patchValue(element);

          this.infoEsSel2 = new InfoEspecifica(
            element.ID,
            element.id_carId,
            element.id_periId,
            element.id_num_sapId,
            element.infe_req_form,
            element.infe_req_form_ajus,
            element.infe_req_esp,
            element.infe_req_cono,
            element.infe_req_exp_general,
            element.infe_req_exp_esp,
            element.infe_req_esp_ajus,
            element.infe_req_exp_lider,
            element.infe_req_otro,
            element.infe_req_cono_ajus,
            element.infe_req_exp_general_ajus,
            element.infe_req_exp_esp_ajus,
            element.infe_req_exp_esp_anyo,
            element.infe_req_exp_lider_ajus,
            element.infe_req_otro_ajus,
            element.infe_req_exp_general_anyo,
            element.infe_req_exp_lider_anyo,
            element.infe_comp_1,
            element.infe_comp_2,
            element.infe_comp_3,
            element.infe_comp_4,
            element.infe_comp_5,
            element.infe_comp_6,
            element.infe_comp_1_ajus,
            element.infe_comp_2_ajus,
            element.infe_comp_3_ajus,
            element.infe_comp_4_ajus,
            element.infe_comp_5_ajus,
            element.infe_comp_6_ajus,
            element.infe_cond_jornada,
            element.infe_cond_otro,
            element.infe_cond_jornada_ajus,
            element.infe_cond_otro_ajus,
            element.infe_mova_1,
            element.infe_mova_2,
            element.infe_mova_3,
            element.infe_mova_4,
            element.infe_mova_5,
            element.infe_mova_1_ajus,
            element.infe_mova_2_ajus,
            element.infe_mova_3_ajus,
            element.infe_mova_4_ajus,
            element.infe_mova_5_ajus,
            element.infe_direccion,
            element.infe_rotacion,
            element.infe_gerencia,
            element.infe_mision
          );

          console.log('verificando cargos 2');
          console.log(this.cargos2);
          this.cargoSel2 = this.cargos2.find(x => x.ID === element.id_carId);

          this.cargo2Ctrl.setValue(this.cargoSel2);
          console.log('Cargo Activo desde infoEspSel 2');
          console.log(this.cargoSel2);
        }

        if ( i === 2 ) {
          this.infoEspecificaReqForm3.patchValue(element);

          this.infoEsSel3 = new InfoEspecifica(
            element.ID,
            element.id_carId,
            element.id_periId,
            element.id_num_sapId,
            element.infe_req_form,
            element.infe_req_form_ajus,
            element.infe_req_esp,
            element.infe_req_cono,
            element.infe_req_exp_general,
            element.infe_req_exp_esp,
            element.infe_req_esp_ajus,
            element.infe_req_exp_lider,
            element.infe_req_otro,
            element.infe_req_cono_ajus,
            element.infe_req_exp_general_ajus,
            element.infe_req_exp_esp_ajus,
            element.infe_req_exp_esp_anyo,
            element.infe_req_exp_lider_ajus,
            element.infe_req_otro_ajus,
            element.infe_req_exp_general_anyo,
            element.infe_req_exp_lider_anyo,
            element.infe_comp_1,
            element.infe_comp_2,
            element.infe_comp_3,
            element.infe_comp_4,
            element.infe_comp_5,
            element.infe_comp_6,
            element.infe_comp_1_ajus,
            element.infe_comp_2_ajus,
            element.infe_comp_3_ajus,
            element.infe_comp_4_ajus,
            element.infe_comp_5_ajus,
            element.infe_comp_6_ajus,
            element.infe_cond_jornada,
            element.infe_cond_otro,
            element.infe_cond_jornada_ajus,
            element.infe_cond_otro_ajus,
            element.infe_mova_1,
            element.infe_mova_2,
            element.infe_mova_3,
            element.infe_mova_4,
            element.infe_mova_5,
            element.infe_mova_1_ajus,
            element.infe_mova_2_ajus,
            element.infe_mova_3_ajus,
            element.infe_mova_4_ajus,
            element.infe_mova_5_ajus,
            element.infe_direccion,
            element.infe_rotacion,
            element.infe_gerencia,
            element.infe_mision
          );

          console.log('verificando cargos 3');
          console.log(this.cargos3);
          this.cargoSel3 = this.cargos3.find(x => x.ID === element.id_carId);

          this.cargo3Ctrl.setValue(this.cargoSel3);
          console.log('Cargo Activo desde infoEspSel 3');
          console.log(this.cargoSel3);
        }

      }


    });
  }

  async infoGenSel() {
    await this.etapa2Service.obtenerInfoGeneral(this.usuarioActivo.ID).then( (resp: [any]) => {
      console.log('-----------------');
      console.log('Obtener datos info general');
      console.log(resp);
      // Solo un registro
      if( resp[0] ) {
        this.perfilPersoForm.patchValue({
          id_periId: resp[0].id_periId,
          disc_mova: resp[0].disc_mova,
          disc_fort: resp[0].disc_fort,
        });

        this.infogeSel = new InfoGeneral(
          resp[0].ID,
          resp[0].id_periId,
          resp[0].id_num_sapId,
          resp[0].infg_area_desarrollo,
          resp[0].infg_area_desarrollo_ajuste_comp,
          resp[0].infg_busqueda_desafio,
          resp[0].infg_busqueda_desafio_ajuste_com
        );

      }
    });
  }

  changeLabelName(lbl, val) {
    document.getElementById(lbl).innerHTML = val;
  }  

}
