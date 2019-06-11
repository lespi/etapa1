import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormularioWebPartComponent } from './app.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListaComponent } from './components/book-lista/book-lista.component';
import { TemplateComponent } from './components/formulario/formulario.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
   MatButtonModule,
   MatCheckboxModule,
   MatInputModule,
   MatSelectModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatExpansionModule,
   MatAutocompleteModule,
   MatCardModule,
   MatTabsModule,
  MatFormFieldModule,
  MatIconModule,
  MatToolbarModule,
  
  } from '@angular/material';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { NgxMatSelectSearchModule } from './mat-select-search/ngx-mat-select-search.module';

@NgModule({
  declarations: [
    FormularioWebPartComponent,
    BookFormComponent,
    BookListaComponent,
    TemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
     MatButtonModule,
     MatCheckboxModule,
     MatInputModule,
     MatSelectModule,
     MatDatepickerModule,
     MatNativeDateModule,
     MatExpansionModule,
     MatAutocompleteModule,
     MatCardModule,
     MatTabsModule,
     MatFormFieldModule,
     MatIconModule,
     MatToolbarModule,
     NgxMatSelectSearchModule,
     MatSnackBarModule
  ],
  providers: [],
  entryComponents: [FormularioWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

   ngDoBootstrap() {
     const el = createCustomElement(FormularioWebPartComponent, { injector: this.injector });
     customElements.define('app-root', el);
   }


}
