import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-section2-form2',
  templateUrl: './section2-form2.component.html',
  styleUrls: ['./section2-form2.component.scss']
})
export class Section2Form2Component implements OnInit {

  @Input() formSection2: FormGroup

  constructor() { }

  ngOnInit() { }

  get edad() {
    return this.formSection2.get('edad') as FormControl
  }

  get documento() {
    return this.formSection2.get('documento') as FormControl
  }

}
