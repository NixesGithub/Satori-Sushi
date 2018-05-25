import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent implements OnInit {


   @Input() disabled: boolean = false
   @Input() name: string
 
  constructor() { }

  ngOnInit() {
  }

}
