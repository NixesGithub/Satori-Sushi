import { HomeComponent } from './../components/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import { ProductosComponent } from './../components/productos/productos.component';
import { ContactenosComponent } from './../components/contactenos/contactenos.component';
import { ExtrasComponent } from './../components/extras/extras.component';


const app_routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'productos', component: ProductosComponent},
    {path: 'contactenos', component: ContactenosComponent},
    {path: 'extras', component: ExtrasComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'home'}
];
export const app_routing = RouterModule.forRoot(app_routes);
