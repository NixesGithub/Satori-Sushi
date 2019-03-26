
import { Injectable } from '@angular/core';



@Injectable()
export class RollService {

  //constructor() {}

private rolls:any[] = [

{
  nombre: "Roll",
  descripcion: "'roll elaborado en base a arroz, algas y pescado'",
  img: "/assets/img/roll.jpg"
},

{  
  nombre: "Niguiri",
  descripcion:  "Aqui va la descripción",
  img: "link img"
},

{ 
  nombre: "Geysha",
  descripcion:  "Aqui va la descripción",
  img: "link img"
}

];

//Getter
getRolls(){

  return this.rolls;

}

}


