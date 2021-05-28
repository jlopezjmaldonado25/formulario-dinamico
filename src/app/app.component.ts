import { Component, OnInit } from '@angular/core';
import { FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'monedas';
  public form: FormGroup;

  public controlNames: string[];
  public controlTypes: string[];
  public controlPlaceHolder: string[];
  public controlRequired: string[];
  public controlLongitud: string[];
  public controlTextoAyuda: string[];

  listaMonedas: Array<any> = new Array<any>();

  /**
   * Creates an instance of AppComponent.
   *
   * @param FormBuilder fb Constructor de Formulario
   *
   */
  constructor(private fb: FormBuilder) {

    this.listaMonedas.push({codigo: 'COP', descripcion: 'Peso Colombiano'});
    this.listaMonedas.push({codigo: 'USD', descripcion: 'Moneda Dolar'});
    this.listaMonedas.push({codigo: 'AUD', descripcion: 'Dólar australiano'});
    this.listaMonedas.push({codigo: 'AWG', descripcion: 'Florín arubeño'});
    this.listaMonedas.push({codigo: 'BAM', descripcion: 'Marco convertible'});
    console.log(this.listaMonedas);

  }

  ngOnInit(): void {
    this.controlNames       = this.getControlNames();
    this.controlPlaceHolder = this.getControlPlaceHolder();
    console.log(this.controlNames);
    console.log(this.controlPlaceHolder);
    this.form = this.fb.group({
      monedas: this.fb.array([]) ,
    }, {});
    this.agregarContoles();

    console.log(this.monedas);
  }

  /**
   * Válida si un control es requerido.
   *
   * @param valor
   * @memberof AppComponent
   */
  isRequired( valor: any): void {}

  /**
   * Válida si un control es de tipo númerico.
   *
   * @param {*} valor
   * @memberof AppComponent
   */
  esControlTipoNumber( valor: any): void {}


  /**
   * Agrega un control al formulario dinámicamente.
   *
   * @memberof AppComponent
   */
  agregarContoles(): void {
    this.listaMonedas.forEach(moneda => {
      this.monedas.push(this.nuevoGrupoMoneda(moneda));
    });
  }

  /**
   * Regresa un grupo de controles.
   *
   * @return {FormGroup}  {FormGroup}
   * @memberof AppComponent
   */
  nuevoGrupoMoneda(moneda: any): FormGroup{
    return this.fb.group({
      codigo: [moneda.codigo, Validators.required],
      valor: ['', Validators.required]
    });
  }

  /**
   * Obtiene la lista de Monedas del formulario.
   *
   * @readonly
   * @type FormArray
   * @memberof AppComponent
   */
  get monedas(): FormArray {
    return this.form.get('monedas') as FormArray;
  }

  /**
   * Obtiene las referencias de los código de las monedas.
   *
   * @returns {string[]}
   * @memberof AppComponent
   */
  getControlNames(): string[] {
    const controlNames: string[] = this.listaMonedas.map(moneda => moneda.codigo);
    return controlNames;
  }

  /**
   * Obtiene la descripción de las monedas para ser usada como place holder de los campo de texto del formulario.
   *
   * @returns {string[]}
   * @memberof AppComponent
   */
  getControlPlaceHolder(): string[] {
    const controlPlaceHolder: string[] = this.listaMonedas.map(moneda => moneda.descripcion);
    return controlPlaceHolder;
  }

}
