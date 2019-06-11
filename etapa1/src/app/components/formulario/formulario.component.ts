import { Component, OnInit, ViewEncapsulation, AfterViewInit, OnDestroy, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { map, startWith, takeUntil, take } from 'rxjs/operators';
import { Cargo, InfoGeneral, InfoEspecifica, Usuario, Periodo, Rol } from 'src/app/models/etapa2.module';
import { Etapa2Service } from '../../services/etapa2.service';
import { MatSelect } from '@angular/material';
import {MatSnackBar} from '@angular/material';

export interface CamposInfoEspecifica {
  nombreCampo: string;
  nombreMostrar: string;
  nombreCampoAjuste: string;
  anyo?: string;
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

  camposRequerimientos: CamposInfoEspecifica[] = [
    {
      nombreCampo: 'infe_req_form',
      nombreMostrar: 'Autogestión',
      nombreCampoAjuste: 'infe_req_form_ajus'
    },
    {
      nombreCampo: 'infe_req_esp',
      nombreMostrar: 'Accountability',
      nombreCampoAjuste: 'infe_req_esp_ajus'
    },
    {
      nombreCampo: 'infe_req_cono',
      nombreMostrar: 'Generación de Redes',
      nombreCampoAjuste: 'infe_req_cono_ajus'
    },
    {
      nombreCampo: 'infe_req_exp_general',
      nombreMostrar: 'Innovación',
      nombreCampoAjuste: 'infe_req_exp_general_ajus',
      anyo: 'infe_req_exp_general_anyo'
    },
    {
      nombreCampo: 'infe_req_exp_esp',
      nombreMostrar: 'Tolerancia a la Frustración',
      nombreCampoAjuste: 'infe_req_exp_esp_ajus',
      anyo: 'infe_req_exp_esp_anyo'
    },
  ];

  camposCompetencias: CamposInfoEspecifica[] = [
    {
      nombreCampo: 'infe_comp_1',
      nombreMostrar: 'Competencia 1 (Más Crítica)',
      nombreCampoAjuste: 'infe_comp_1_ajus'
    },
    {
      nombreCampo: 'infe_comp_2',
      nombreMostrar: 'Competencia 2',
      nombreCampoAjuste: 'infe_comp_2_ajus'
    },
    {
      nombreCampo: 'infe_comp_3',
      nombreMostrar: 'Competencia 3',
      nombreCampoAjuste: 'infe_comp_3_ajus'
    },
    {
      nombreCampo: 'infe_comp_4',
      nombreMostrar: 'Competencia 4',
      nombreCampoAjuste: 'infe_comp_4_ajus'
    },
    {
      nombreCampo: 'infe_comp_5',
      nombreMostrar: 'Competencia 5',
      nombreCampoAjuste: 'infe_comp_5_ajus'
    },
    {
      nombreCampo: 'infe_comp_6',
      nombreMostrar: 'Competencia 6 (Menos Crítica)',
      nombreCampoAjuste: 'infe_comp_6_ajus'
    }
  ];

  camposCondiciones: CamposInfoEspecifica[] = [
    {
      nombreCampo: 'infe_cond_jornada',
      nombreMostrar: 'Realizar actividades y proyectos variados',
      nombreCampoAjuste: 'infe_cond_jornada_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Ser un/a experto/a en mi área',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Innovar y ser creativo/a',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Tener un trabajo con sentido e impacto',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Asumir desafíos',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Influenciar a otros/as',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Alcanzar una sensación de logro',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Tener visibilidad/prestigio dentro y/o fuera de la empresa',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Tener líderes que sean referentes en mi contexto laboral',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Tener tiempo para mí vida personal',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Gestionar e integrar distintas funciones',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Recibir recompensas monetarias',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Trabajar como equipo',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Motivación 14" value="Tener autonomía para realizar mis funciones',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Trabajar sin mucha presión',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Tener flexibilidad para compatibilizar con otros aspectos de mi vida',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: 'Prestar un servicio que sea valorado por el/la cliente',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: '',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: '',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
    {
      nombreCampo: 'infe_cond_otro',
      nombreMostrar: '',
      nombreCampoAjuste: 'infe_cond_otro_ajus'
    },
  ];

  camposMotivaciones: CamposInfoEspecifica[] = [
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

  infoGeneralForm: FormGroup;
  infoEspecificaReqForm: FormGroup;
  infoEspecificaReqForm2: FormGroup;
  infoEspecificaReqForm3: FormGroup;
  

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

    // Obtener Cargos
    this.etapa2Service.obtenerCargos().then( (resp: [any]) => {
      // console.log(resp);
      this.cargos = [];
      resp.forEach( element => {
        this.cargos.push( new Cargo(
              element.ID,
              element.car_nombre,
              element.car_direccion,
              element.car_mision,
              element.car_req_cono,
              element.car_req_esp,
              element.car_req_exp_esp,
              element.car_req_exp_general,
              element.car_req_exp_lider,
              element.car_req_form,
              element.car_rotacion
              ));
      });

      this.cargos2 = this.cargos;
      this.cargos3 = this.cargos;
       // Inicializar select cargos
      //this.cargoCtrl.setValue(this.cargos[0]);
      this.filteredCargos.next(this.cargos.slice());
      this.cargoFilterCtrl.valueChanges
           .pipe(takeUntil(this._onDestroy))
           .subscribe(() => {
            this.filterCargos();
           });

      this.filteredCargos2.next(this.cargos2.slice());
      this.cargo2FilterCtrl.valueChanges
                .pipe(takeUntil(this._onDestroy))
                .subscribe(() => {
                 this.filterCargos2();
                });

      this.filteredCargos3.next(this.cargos3.slice());
      this.cargo3FilterCtrl.valueChanges
           .pipe(takeUntil(this._onDestroy))
           .subscribe(() => {
            this.filterCargos3();
           });
    });

    // Obtener usuarioActivo
    this.usuarioLogin();
    // Creamos el Form
    this.createForms();

    // Obener Usuarios
    this.etapa2Service.obtenerUsuarios().then( (resp: [any]) => {
      // console.log(resp);
      this.usuarios = [];
      resp.forEach( element => {
        this.usuarios.push( new Usuario(
              element.ID,
              element.id_num_sap,
              element.id_carId,
              element.per_fecha_ingreso,
              element.per_login,
              element.per_lugar_trabajo,
              element.per_nombre
              ));
      });
       // Inicializar select usuarios
       //this.usuarios.find( x => x.ID === this.usuarioActivo.ID)
      this.usuarioCtrl.setValue(this.usuarios[0]);
      this.filteredUsuarios.next(this.usuarios.slice());
      this.usuarioFilterCtrl.valueChanges
          .pipe(takeUntil(this._onDestroy))
          .subscribe(() => {
            this.filterUsuarios();
          });
      this.usuarioCtrl.disable();
   });

    // Obtener Periodos --> por default deberia aparecer el ultimo periodo
    this.etapa2Service.obtenerPeriodos().then( (resp: [any]) => {
      // console.log(resp);
      this.periodos = [];
      resp.forEach( element => {
              this.periodos.push( new Periodo(
                    element.peri_descripcion,
                    element.peri_fecha_anyo
                    ));
            });
      // Inicializar select periodos
      this.periodoCtrl.setValue(this.periodos[0]);
      this.filteredPeriodos.next(this.periodos.slice());
      this.periodoFilterCtrl.valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
              this.filterPeriodos();
            });
 });


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
      this.infoGeneralForm.patchValue({
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

    this.infoGeneralForm = this.fb.group({
      infg_busqueda_desafio: ['' ],
      infg_busqueda_desafio_ajuste_com: [''],
      infg_area_desarrollo: [''],
      infg_area_desarrollo_ajuste_comp: [''],
      id_periId: [''],
      id_num_sapId: ['']
    });

    this.infoEspecificaReqForm = this.fb.group({
      id_carId: ['', Validators.required],
      id_periId: [''],
      id_num_sapId: [''],

      infe_req_form: ['' ],
      infe_req_form_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_esp: [''],
      infe_req_esp_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_cono: [''],
      infe_req_cono_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_general: [''],
      infe_req_exp_general_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_general_anyo: [''],
      infe_req_exp_esp: [''],
      infe_req_exp_esp_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_esp_anyo: [''],
      infe_req_exp_lider: [''],
      infe_req_exp_lider_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_lider_anyo: [''],
      infe_req_otro: [''],
      infe_req_otro_ajus: [this.selectJerarquizar[1].nompre],

      infe_comp_1: ['' ],
      infe_comp_1_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_2: [''],
      infe_comp_2_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_3: [''],
      infe_comp_3_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_4: [''],
      infe_comp_4_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_5: [''],
      infe_comp_5_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_6: [''],
      infe_comp_6_ajus: [this.selectJerarquizar[1].nompre],

      infe_cond_jornada: ['' ],
      infe_cond_jornada_ajus: [this.selectJerarquizar[1].nompre],
      infe_cond_otro: [''],
      infe_cond_otro_ajus: [this.selectJerarquizar[1].nompre],

      infe_mova_1: [''],
      infe_mova_1_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_2: [''],
      infe_mova_2_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_3: [''],
      infe_mova_3_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_4: [''],
      infe_mova_4_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_5: [''],
      infe_mova_5_ajus: [this.selectJerarquizar[1].nompre],

      infe_direccion: [''],
      infe_rotacion: [''],
      infe_gerencia: [''],
      infe_mision: ['']
    });

    this.infoEspecificaReqForm2 = this.fb.group({
      id_carId: ['', Validators.required],
      id_periId: [''],
      id_num_sapId: [''],

      infe_req_form: ['' ],
      infe_req_form_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_esp: [''],
      infe_req_esp_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_cono: [''],
      infe_req_cono_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_general: [''],
      infe_req_exp_general_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_general_anyo: [''],
      infe_req_exp_esp: [''],
      infe_req_exp_esp_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_esp_anyo: [''],
      infe_req_exp_lider: [''],
      infe_req_exp_lider_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_lider_anyo: [''],
      infe_req_otro: [''],
      infe_req_otro_ajus: [this.selectJerarquizar[1].nompre],

      infe_comp_1: ['' ],
      infe_comp_1_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_2: [''],
      infe_comp_2_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_3: [''],
      infe_comp_3_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_4: [''],
      infe_comp_4_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_5: [''],
      infe_comp_5_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_6: [''],
      infe_comp_6_ajus: [this.selectJerarquizar[1].nompre],

      infe_cond_jornada: ['' ],
      infe_cond_jornada_ajus: [this.selectJerarquizar[1].nompre],
      infe_cond_otro: [''],
      infe_cond_otro_ajus: [this.selectJerarquizar[1].nompre],

      infe_mova_1: [''],
      infe_mova_1_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_2: [''],
      infe_mova_2_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_3: [''],
      infe_mova_3_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_4: [''],
      infe_mova_4_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_5: [''],
      infe_mova_5_ajus: [this.selectJerarquizar[1].nompre],

      infe_direccion: [''],
      infe_rotacion: [''],
      infe_gerencia: [''],
      infe_mision: ['']
    });

    this.infoEspecificaReqForm3 = this.fb.group({
      id_carId: ['', Validators.required],
      id_periId: [''],
      id_num_sapId: [''],

      infe_req_form: ['' ],
      infe_req_form_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_esp: [''],
      infe_req_esp_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_cono: [''],
      infe_req_cono_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_general: [''],
      infe_req_exp_general_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_general_anyo: [''],
      infe_req_exp_esp: [''],
      infe_req_exp_esp_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_esp_anyo: [''],
      infe_req_exp_lider: [''],
      infe_req_exp_lider_ajus: [this.selectJerarquizar[1].nompre],
      infe_req_exp_lider_anyo: [''],
      infe_req_otro: [''],
      infe_req_otro_ajus: [this.selectJerarquizar[1].nompre],

      infe_comp_1: ['' ],
      infe_comp_1_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_2: [''],
      infe_comp_2_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_3: [''],
      infe_comp_3_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_4: [''],
      infe_comp_4_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_5: [''],
      infe_comp_5_ajus: [this.selectJerarquizar[1].nompre],
      infe_comp_6: [''],
      infe_comp_6_ajus: [this.selectJerarquizar[1].nompre],

      infe_cond_jornada: ['' ],
      infe_cond_jornada_ajus: [this.selectJerarquizar[1].nompre],
      infe_cond_otro: [''],
      infe_cond_otro_ajus: [this.selectJerarquizar[1].nompre],

      infe_mova_1: [''],
      infe_mova_1_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_2: [''],
      infe_mova_2_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_3: [''],
      infe_mova_3_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_4: [''],
      infe_mova_4_ajus: [this.selectJerarquizar[1].nompre],
      infe_mova_5: [''],
      infe_mova_5_ajus: [this.selectJerarquizar[1].nompre],

      infe_direccion: [''],
      infe_rotacion: [''],
      infe_gerencia: [''],
      infe_mision: ['']
    });

  }

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

  cargoSeleccionado() {

    this.cargoSel = this.cargos.find( x => x.ID === this.cargoCtrl.value.ID);

    this.infoEspecificaReqForm.patchValue({
      id_carId: this.cargoSel.ID,
      infe_req_form: this.cargoSel.car_req_form,
      infe_req_esp: this.cargoSel.car_req_esp,
      infe_req_cono: this.cargoSel.car_req_cono,
      infe_req_exp_general: this.cargoSel.car_req_exp_general,
      infe_req_exp_general_anyo: '',
      infe_req_exp_esp: this.cargoSel.car_req_exp_esp,
      infe_req_exp_esp_anyo: '',
      infe_req_exp_lider: this.cargoSel.car_req_exp_lider,
      infe_req_exp_lider_anyo: '',
      infe_req_otro: '',
      infe_comp_1: '',
      infe_comp_2: '',
      infe_comp_3: '',
      infe_comp_4: '',
      infe_comp_5: '',
      infe_comp_6: '',
      infe_cond_jornada: '',
      infe_cond_otro: '',
      infe_mova_1: '',
      infe_mova_2: '',
      infe_mova_3: '',
      infe_mova_4: '',
      infe_mova_5: '',
      infe_direccion: this.cargoSel.car_direccion,
      infe_rotacion: this.cargoSel.car_rotacion,
      infe_gerencia: '',
      infe_mision: this.cargoSel.car_mision,
    });
    console.log('Cargo Activo desde cargoSel');
    console.log(this.cargoSel);
  }

  cargoSeleccionado2() {

    this.cargoSel2 = this.cargos2.find( x => x.ID === this.cargo2Ctrl.value.ID);

    this.infoEspecificaReqForm2.patchValue({
      id_carId: this.cargoSel2.ID,
      infe_req_form: this.cargoSel.car_req_form,
      infe_req_esp: this.cargoSel2.car_req_esp,
      infe_req_cono: this.cargoSel2.car_req_cono,
      infe_req_exp_general: this.cargoSel2.car_req_exp_general,
      infe_req_exp_general_anyo: '',
      infe_req_exp_esp: this.cargoSel2.car_req_exp_esp,
      infe_req_exp_esp_anyo: '',
      infe_req_exp_lider: this.cargoSel2.car_req_exp_lider,
      infe_req_exp_lider_anyo: '',
      infe_req_otro: '',
      infe_comp_1: '',
      infe_comp_2: '',
      infe_comp_3: '',
      infe_comp_4: '',
      infe_comp_5: '',
      infe_comp_6: '',
      infe_cond_jornada: '',
      infe_cond_otro: '',
      infe_mova_1: '',
      infe_mova_2: '',
      infe_mova_3: '',
      infe_mova_4: '',
      infe_mova_5: '',
      infe_direccion: this.cargoSel2.car_direccion,
      infe_rotacion: this.cargoSel2.car_rotacion,
      infe_gerencia: '',
      infe_mision: this.cargoSel2.car_mision,
    });
    console.log('Cargo Activo desde cargoSel2');
    console.log(this.cargoSel2);
  }

  cargoSeleccionado3() {

    this.cargoSel3 = this.cargos3.find( x => x.ID === this.cargo3Ctrl.value.ID);

    this.infoEspecificaReqForm3.patchValue({
      id_carId: this.cargoSel3.ID,
      infe_req_form: this.cargoSel3.car_req_form,
      infe_req_esp: this.cargoSel3.car_req_esp,
      infe_req_cono: this.cargoSel3.car_req_cono,
      infe_req_exp_general: this.cargoSel3.car_req_exp_general,
      infe_req_exp_general_anyo: '',
      infe_req_exp_esp: this.cargoSel3.car_req_exp_esp,
      infe_req_exp_esp_anyo: '',
      infe_req_exp_lider: this.cargoSel3.car_req_exp_lider,
      infe_req_exp_lider_anyo: '',
      infe_req_otro: '',
      infe_comp_1: '',
      infe_comp_2: '',
      infe_comp_3: '',
      infe_comp_4: '',
      infe_comp_5: '',
      infe_comp_6: '',
      infe_cond_jornada: '',
      infe_cond_otro: '',
      infe_mova_1: '',
      infe_mova_2: '',
      infe_mova_3: '',
      infe_mova_4: '',
      infe_mova_5: '',
      infe_direccion: this.cargoSel3.car_direccion,
      infe_rotacion: this.cargoSel3.car_rotacion,
      infe_gerencia: '',
      infe_mision: this.cargoSel3.car_mision,
    });
    console.log('Cargo Activo desde cargoSel3');
    console.log(this.cargoSel3);
  }

  usuarioSeleccionado() {

    this.cargoCtrl.setValue('');
    this.cargo2Ctrl.setValue('');
    this.cargo3Ctrl.setValue('');

    this.usuarioActivo = this.usuarios.find( x => x.ID === this.usuarioCtrl.value.ID);

    this.createForms();

    this.infoGeneralForm.patchValue({
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
        this.infoGeneralForm.patchValue({
          id_periId: resp[0].id_periId,
          id_num_sapId: resp[0].id_num_sapId,
          infg_area_desarrollo: resp[0].infg_area_desarrollo,
          infg_area_desarrollo_ajuste_comp: resp[0].infg_area_desarrollo_ajuste_comp,
          infg_busqueda_desafio: resp[0].infg_busqueda_desafio,
          infg_busqueda_desafio_ajuste_com: resp[0].infg_busqueda_desafio_ajuste_com,
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
