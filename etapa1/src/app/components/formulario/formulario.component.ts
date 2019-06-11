import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Cargo } from 'src/app/models/etapa2.module';
import { Etapa2Service } from '../../services/etapa2.service';
import { InfoGeneral } from '../../models/etapa2.module';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TemplateComponent implements OnInit {

  cargoCtrl = new FormControl();
  filteredCargos: Observable<Cargo[]>;

  cargos: Cargo[] = [
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

 // modeloInfoGeneral = new InfoGeneral(1, 'Texto area desarrollo', 'busqueda desafios', 'desafio ajuste', 'general');

  infoGeneralForm: FormGroup;

 



  infoGeneralValidationMessages = {
    infg_busqueda_desafio: [
      { type: 'required', message: 'Full name is required' }
    ],
    infg_busqueda_desafio_ajuste_com: [
      { type: 'required', message: 'Bio cannot be more than 256 characters long' },
    ],
    infg_area_desarrollo: [
      { type: 'required', message: 'Please select your gender' },
    ],
    infg_area_desarrollo_ajuste_comp: [
      { type: 'required', message: 'Please insert your birthday' },
    ]
  };

  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;
  matchingPasswordsGroup: FormGroup;

// Inicio

selectAjuste = [
  {
    ID: 1,
    nompre: 'Alto'
  },
  {
    ID: 2,
    nompre: 'Medio'
  },
  {
    ID: 3,
    nompre: 'Bajo'
  },
];

// Fin



  constructor(private fb: FormBuilder,
              private etapa2Service: Etapa2Service) {


    this.filteredCargos = this.cargoCtrl.valueChanges
      .pipe(
        startWith(''),
        map(cargo => cargo ? this._filterCargos(cargo) : this.cargos.slice())
      );

   }

  ngOnInit() {
    this.createForms();

    console.log(this.etapa2Service.obtenerInfoGeneral());

  }

  private _filterCargos(value: string): Cargo[] {
    const filterValue = value.toLowerCase();

    return this.cargos.filter(cargo => cargo.car_nombre.toLowerCase().indexOf(filterValue) === 0);
  }

  createForms() {

    this.infoGeneralForm = this.fb.group({
      infg_busqueda_desafio: ['Homero Simpson', Validators.required ],
      infg_busqueda_desafio_ajuste_com: ['Lorem Ipsum is simply dummy.', Validators.required],
      infg_area_desarrollo: ['hola', Validators.required],
      infg_area_desarrollo_ajuste_comp: ['bye bye', Validators.required]
    });
 
  }

  onSubmitAccountDetails(value){
    console.log(value);
  }

  onSubmitUserDetails(value){
    console.log(value);
  }

  onSubmitInfoGeneral(value){
    console.log(value);
    // console.warn(value);
    this.etapa2Service.guardarInfoGeneral(value);
    // this.modeloInfoGeneral = new InfoGeneral(1, 'Texto area desarrollo', 'busqueda desafios', 'desafio ajuste', 'general');
  }



}
