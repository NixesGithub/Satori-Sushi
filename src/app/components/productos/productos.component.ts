import { Component } from '@angular/core';
import { RollService } from '../../components/rolls/roll.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

constructor(private rollserv:RollService){

}
rolls:any[] = this.rollserv.getRolls();
 
}
