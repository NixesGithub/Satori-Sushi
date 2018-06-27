import { Component } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {



  sushi: any = {
    precio: 70,
     descripcion: 'roll elaborado en base a arroz, algas y pescado'
 };

}
