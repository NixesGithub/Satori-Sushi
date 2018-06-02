import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Form1Component } from './form1/form1.component';
import { Routes, RouterModule } from '@angular/router';
import { Form2Component } from '../form2/form2.component';
import { FormContainerComponent } from './form-container/form-container.component';

const routes: Routes = [
  {
    path: 'forms',
    component: FormContainerComponent,
    children: [
      {
        path: 'form1',
        component: Form1Component
      },
      {
        path: 'form2',
        component: Form2Component
      }
    ]
  }
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    FormContainerComponent,
    Form1Component,
    Form2Component
  ]
})
export class FormWithValidatorsModule { }
