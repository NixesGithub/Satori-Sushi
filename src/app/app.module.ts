
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// Rutas
import { app_routing } from './rutas/app.routes';

// servicios

// Componentes
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyButtonComponent } from './my-button/my-button.component';

import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/Navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ProductosComponent } from './components/productos/productos.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { ExtrasComponent } from './components/extras/extras.component';
import { RollService } from './components/rolls/roll.service';


// const routes: Routes = [
//   {
//     path: 'forms',
//     loadChildren: 'app/form-with-validators/form-with-validators.module#FormWithValidatorsModule'
//   }
// ];

@NgModule({
  declarations: [
    AppComponent,
    MyButtonComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    ProductosComponent,
    ContactenosComponent,
    ExtrasComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    app_routing,
    
  ],
  providers: [
    RollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
