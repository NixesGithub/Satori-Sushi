import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-section1-form2',
  templateUrl: './section1-form2.component.html',
  styleUrls: ['./section1-form2.component.scss']
})
export class Section1Form2Component implements OnInit {

  @Input() formSection1: FormGroup

  constructor() { }

  ngOnInit() { }

  get nombre() {
    return this.formSection1.get('nombre') as FormControl
  }

  get apellido() {
    return this.formSection1.get('apellido') as FormControl
  }

}
