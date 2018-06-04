import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.scss']
})
export class Form2Component implements OnInit {

  form2: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.form2 = this.fb.group({
      'datosBasicos': this.fb.group({
        'nombre': ['', Validators.required],
        'apellido': ''  
      }),
      'datosSecundarios': this.fb.group({
        'edad': ['', Validators.compose([ Validators.required, Validators.pattern(/^([0-9])*$/) ])],
        'tipoDoc': 'DNI',
        'documento': ['', Validators.pattern(/^([0-9])*$/)]
      })
    })

  }

  get fieldsInvalid() {
    return this.nombre.invalid || this.edad.invalid || this.documento.invalid
  }

  get nombre() {
    return this.form2.get('datosBasicos').get('nombre') as FormControl
  }

  get apellido() {
    return this.form2.get('datosBasicos').get('apellido') as FormControl
  }

  get edad() {
    return this.form2.get('datosSecundarios').get('edad') as FormControl
  }

  get tipoDoc() {
    return this.form2.get('datosSecundarios').get('tipoDoc') as FormControl
  }

  get documento() {
    return this.form2.get('datosSecundarios').get('documento') as FormControl
  }

  get datosBasicos() {
    return this.form2.get('datosBasicos') as FormGroup
  }

  get datosSecundarios() {
    return this.form2.get('datosSecundarios') as FormGroup
  }

  resetFormValues() {
    this.form2.reset()
  }

  sendData() {
    console.log(this.form2.value)
  }

}
