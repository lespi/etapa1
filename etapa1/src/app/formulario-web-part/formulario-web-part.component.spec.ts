import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioWebPartComponent } from './formulario-web-part.component';

describe('FormularioWebPartComponent', () => {
  let component: FormularioWebPartComponent;
  let fixture: ComponentFixture<FormularioWebPartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioWebPartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioWebPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
