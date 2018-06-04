import { Component, OnInit } from '@angular/core';
import { Tipos, Especie, NuevaEspecie } from '../depositarias-dinamic-table/model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.simularLlamadoCategoria()
  }

  categoriasContenedor: Tipos[]

  tiposContenedor: Tipos[]

  especiesContenedor: Especie[]

  tipoDisable: boolean = true
  espciesDisable: boolean = true

  simularLlamadoCategoria() {
    this.categoriasContenedor = [
      { codigo: 'C1', descripcion: 'Categoria 1' }, {codigo: 'C2', descripcion: 'Categoria 2'}
    ]
  }

  simularLlamadoTipos() {
    this.tiposContenedor = [
      {codigo: 'T1', descripcion: 'Tipo 1'}, {codigo: 'T2', descripcion: 'Tipo 2'}
    ]
  }

  simularLlamadoEpecies() {
    this.especiesContenedor = [
      {codigo: 'E1', tipo: 'T1', categoria: 'C2', descripcion: 'Especie Test'}
    ]
  }

  busquedaCategoria(especie: Especie) {
    console.log("BUSQUEDA", especie)
    if(especie.categoria == NuevaEspecie.NUEVA_CATEGORIA) {
      console.log("NUEVA CATEGORIA")
    } else {
      this.simularLlamadoTipos()
      this.tipoDisable = false
    }
  }

  busquedaCategoriaYTipo(especie: Especie) {
    console.log("BUSQUEDA", especie)
    if(especie.tipo == NuevaEspecie.NUEVO_TIPO) {
      console.log("NUEVO TIPO")
    } else {
      this.simularLlamadoEpecies()
      this.espciesDisable = false
    }
  }

  busquedaEspecie(especie: Especie) {
    if(especie.codigo == NuevaEspecie.NUEVA_ESPECIE) {
      console.log("NUEVA ESPECIE")
    } else {
      console.log("ESPECIE MODELO", especie)
    }
  }
}
