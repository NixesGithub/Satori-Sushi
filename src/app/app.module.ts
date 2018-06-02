import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DinamicTableComponent } from './dinamic-table/dinamic-table.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyButtonComponent } from './my-button/my-button.component';
import { DepositariasDinamicTableComponent } from './depositarias-dinamic-table/depositarias-dinamic-table.component';
import { ContainerComponent } from './container/container.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { FormWithValidatorsModule } from './form-with-validators/form-with-validators.module';
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: 'busqueda',
    component: ContainerComponent    
  },
  {
    path: 'depositarias',
    component: DepositariasDinamicTableComponent
  },
  {
    path: 'identificaciones',
    component: DinamicTableComponent
  },
  {
    path: 'forms',
    loadChildren: 'app/form-with-validators/form-with-validators.module#FormWithValidatorsModule'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    DinamicTableComponent,
    MyButtonComponent,
    DepositariasDinamicTableComponent,
    ContainerComponent,
    BusquedaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FormWithValidatorsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
