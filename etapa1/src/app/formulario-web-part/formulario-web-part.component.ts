import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-formulario-web-part',
  templateUrl: './formulario-web-part.component.html',
  styleUrls: ['./formulario-web-part.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FormularioWebPartComponent implements OnInit {
  @Input() description: string;

  constructor() { }

  ngOnInit() {
  }

}
