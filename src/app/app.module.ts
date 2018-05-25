import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { DinamicTableComponent } from './dinamic-table/dinamic-table.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyButtonComponent } from './my-button/my-button.component';
import { DepositariasDinamicTableComponent } from './depositarias-dinamic-table/depositarias-dinamic-table.component';


@NgModule({
  declarations: [
    AppComponent,
    DinamicTableComponent,
    MyButtonComponent,
    DepositariasDinamicTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
