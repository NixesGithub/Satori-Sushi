import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Tipos, Especie, NuevaEspecie } from '../depositarias-dinamic-table/model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss']
})
export class BusquedaComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    if(this.categoriasEspecies && changes.categoriasEspecies) {
      this.categoriasEspecies = changes.categoriasEspecies.currentValue
    }
    if(this.tiposEspecies && changes.tiposEspecies) {
      this.tiposEspecies = changes.tiposEspecies.currentValue
      let nuevoItem: Tipos = new Tipos()
      nuevoItem.codigo = NuevaEspecie.NUEVO_TIPO
      nuevoItem.descripcion = 'Nuevo tipo'
      this.tiposEspecies.push(nuevoItem)
    }
    if(this.especiesEncontradas && changes.especiesEncontradas) {
      this.especiesEncontradas = changes.especiesEncontradas.currentValue
    }
    if(this.deshabilitarEspecies && changes.deshabilitarEspecies) {
      this.deshabilitarEspecies = changes.deshabilitarEspecies.currentValue
    }
    if(this.deshabilitarTipo && changes.deshabilitarTipo) {
      this.deshabilitarTipo = changes.deshabilitarTipo.currentValue
    }
  }
  constructor() { }

  ngOnInit() {
  }

  getNuevaCategoria() {
    return NuevaEspecie.NUEVA_CATEGORIA
  }

  
  @Input() categoriasEspecies: Tipos[]
  @Input() tiposEspecies: Tipos[]
  @Input() especiesEncontradas: Especie[]

  @Input() deshabilitarTipo: boolean
  @Input() deshabilitarEspecies: boolean

  categoriaSeleccionada: string = ''
  tipoSeleccionado: string = ''
  especieSeleccionada: string = ''

  @Output() categoriaSelec: EventEmitter<Especie> = new EventEmitter<Especie>()
  @Output() tipoYCategSelec: EventEmitter<Especie> = new EventEmitter<Especie>()
  @Output() especieSelec: EventEmitter<Especie> = new EventEmitter<Especie>()

  asignarNuevoEmit(): Especie {
    let nueva: Especie = new Especie()
    nueva.categoria = this.categoriaSeleccionada
    nueva.tipo = this.tipoSeleccionado
    nueva.codigo = this.especieSeleccionada
    return nueva
  }

  enviarCategoria() {    
    this.categoriaSelec.emit(this.asignarNuevoEmit())
  }

  enviarTipoYCategoria() {
    this.tipoYCategSelec.emit(this.asignarNuevoEmit())
  }

  enviarEspecie() {
    this.especieSelec.emit(this.asignarNuevoEmit())
  }

}
