import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root-etapa1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class FormularioWebPartComponent implements OnInit {
  @Input() description: string;

 
  constructor() { }

  ngOnInit() {

  }

}
