import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.scss']
})
export class Form1Component implements OnInit {

  form1Test: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    
    this.form1Test = this.fb.group({
      'nombre': ['', Validators.required ],
      'apellido': ['', Validators.required ],
      'descripcion': '',
      'validacion': false
    })

    this.form1Test.get('validacion').valueChanges.subscribe(
      value => {
        if(value) {
          this.descripcion.setValidators([ Validators.required, Validators.minLength(5) ])
        } else {
          this.descripcion.clearValidators()
        }
        this.descripcion.updateValueAndValidity()
      }
    )

  }



  get nombre() {
    return this.form1Test.get('nombre') as FormControl
  }

  get apellido() {
    return this.form1Test.get('apellido') as FormControl
  }

  get descripcion() {
    return this.form1Test.get('descripcion') as FormControl
  }

  //para limpiar un poco el template
  get fieldsInvalid() {
    return this.nombre.invalid || this.apellido.invalid || this.descripcion.invalid
  }

  resetFormValues() {
    this.form1Test.reset()
  }

  sendFormData() {
    console.log(this.form1Test.value)
  }

  get formValue() {
    return this.form1Test.value
  }

}
