import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { FormularioWebPartComponent } from './formulario-web-part/formulario-web-part.component';

@NgModule({
  declarations: [
    FormularioWebPartComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  entryComponents: [FormularioWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(FormularioWebPartComponent, { injector: this.injector });
    customElements.define('app-formulario-web-part', el);
  }
}
