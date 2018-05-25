import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Identificacion, Tipos, Estados } from './model';

@Component({
  selector: 'app-dinamic-table',
  templateUrl: './dinamic-table.component.html',
  styleUrls: ['./dinamic-table.component.scss']
})
export class DinamicTableComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  formIdentificaciones: FormGroup = this.fb.group({
    identificaciones: this.fb.array([])
  })
  
  tiposRowset: Tipos[] = [{ codigo: 'SSN', descripcion: 'SSN'}, { codigo: '2', descripcion: 'segundo'}, { codigo: '3', descripcion: 'tercero'} ]

  clasificacionRowset: Tipos[] = [{ codigo: 'SSN', descripcion: 'SSN'}, { codigo: 'L', descripcion: 'LEBAC'}, { codigo: 'E', descripcion: 'ESPECIE'} ]

  errorPorIntentarAgregarExistente: boolean = false

  ngOnInit() { }

  crearItem(nuevo: Identificacion): FormGroup {
    return this.fb.group({
      tipo: nuevo.tipo,
      id: nuevo.id,
      clasificacion: nuevo.clasificacion,
      estado: Estados.NUEVA_IDENTIFICACION,

      tipoAnterior: nuevo.tipo,
      idAnterior: nuevo.id,
      clasificacionAnterior: nuevo.clasificacion,
      estadoAnterior: Estados.NUEVA_IDENTIFICACION,
    })
  }

  get identificaciones() {
    return this.formIdentificaciones.get('identificaciones') as FormArray
  }

  //GETTERS DE VALORES ACTUALES
  /**
   * Retorna el tipo de la fila actual
   * @param indice 
   */
  getTipo(indice: number) {
    return this.identificaciones.at(indice).get('tipo').value
  }

  getId(indice: number) {
    return this.identificaciones.at(indice).get('id').value
  }

  getClasificacion(indice: number) {
    return this.identificaciones.at(indice).get('clasificacion').value
  }

  //GETTERS DE VALORES ANTERIORES
  getTipoAnterior(indice: number) {
    return this.identificaciones.at(indice).get('tipoAnterior').value
  }

  getIdAnterior(indice: number) {
    return this.identificaciones.at(indice).get('idAnterior').value
  }

  getClasificacionAnterior(indice: number) {
    return this.identificaciones.at(indice).get('clasificacionAnterior').value
  }

  //GETTER FILA ACTUAL
  getFilaActual(indice: number) {
    return this.identificaciones.at(indice).value
  }

  //GETTERS DE ESTADOS DE LA FILA ACTUAL
  filaEstaEnEdicion(indice: number) {
    return this.estadoActualFila(indice).value == Estados.IDENTIFICACION_EN_EDICION
  }

  filaEsNueva(indice: number) {
    return this.estadoActualFila(indice).value == Estados.NUEVA_IDENTIFICACION
  }

  filaEstaEnConfirmacion(indice: number) {
    return this.estadoActualFila(indice).value == Estados.CONFIRMAR_EDICION
  }

  estadoActualFila(indice: number) {
    return this.identificaciones.at(indice).get('estado')
  }

  estadoAnteriorFila(indice: number) {
    return this.identificaciones.at(indice).get('estadoAnterior')
  }

  agregarItem() {
    this.errorPorIntentarAgregarExistente = false;
    this.identificaciones.push(this.crearItem(new Identificacion()))
  }

  copiarElementosActualesEnAnteriores(indice: number) {
    this.identificaciones.at(indice).get('tipoAnterior').setValue(this.getTipo(indice))
    this.identificaciones.at(indice).get('idAnterior').setValue(this.getId(indice))
    this.identificaciones.at(indice).get('clasificacionAnterior').setValue(this.getClasificacion(indice))
  }

  copiarElementosAnterioresEnActuales(indice: number) {
    this.identificaciones.at(indice).get('tipo').setValue(this.getTipoAnterior(indice))
    this.identificaciones.at(indice).get('id').setValue(this.getIdAnterior(indice))
    this.identificaciones.at(indice).get('clasificacion').setValue(this.getClasificacionAnterior(indice))
  }

  /**
   * Controla si el tipo que se quiere ingresar ya existe
   * @param indice indica la fila actual que se quiere agregar
   */
  elTipoIngresadoExiste(indice: number): boolean {
    let encontrado: number = this.identificaciones.controls.findIndex(e => e.get('tipoAnterior').value == this.getTipo(indice))
    return encontrado != -1 && encontrado != indice
  }

  enviarDatosFila(indice: number) {
    switch(this.estadoActualFila(indice).value) {
      case Estados.NUEVA_IDENTIFICACION:
        if(this.elTipoIngresadoExiste(indice)) {
          this.errorPorIntentarAgregarExistente = true;
        } else {
          //Modifica el estado actual
          this.estadoActualFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
          this.estadoAnteriorFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
          //Copia Valores actuales en valores anteriores
          this.copiarElementosActualesEnAnteriores(indice)
          //Deshabilita la fila
          this.identificaciones.at(indice).disable()
          console.log("NUEVA IDENTIFICACION: ", this.getFilaActual(indice))
          this.errorPorIntentarAgregarExistente = false;
        }
      break;
      case Estados.IDENTIFICACION_EN_EDICION:
        //Actualiza estados
        this.estadoActualFila(indice).setValue(Estados.CONFIRMAR_EDICION)
        this.estadoAnteriorFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
        //Habilita la fila
        this.identificaciones.at(indice).get('clasificacion').enable()

        this.errorPorIntentarAgregarExistente = false;
        console.log("EDITAR IDENTIFICAICON: ", this.getFilaActual(indice))
      break;
      case Estados.CONFIRMAR_EDICION:
        if(this.elTipoIngresadoExiste(indice)) {
          this.errorPorIntentarAgregarExistente = true;
        } else {
          //Actualiza estados
          this.estadoActualFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
          this.copiarElementosActualesEnAnteriores(indice)        
          //Deshabilita la fila
          this.identificaciones.at(indice).disable()
          console.log("CONFIRMAR EDICION: ", this.getFilaActual(indice))
          this.errorPorIntentarAgregarExistente = false;
        }
      break;
    }
  }

  eliminarFila(indice: number) {
    this.identificaciones.removeAt(indice)
    this.errorPorIntentarAgregarExistente = false;
    console.log("ELIMINAR")
  }

  retrocederCambios(indice: number) {
    this.estadoActualFila(indice).setValue(this.estadoAnteriorFila(indice).value)
    this.copiarElementosAnterioresEnActuales(indice)
    this.identificaciones.at(indice).disable()
    this.errorPorIntentarAgregarExistente = false;
    console.log("BACK", this.getFilaActual(indice))
  }

}
