import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Tipos, Depositaria, Estados } from '../dinamic-table/model';

@Component({
  selector: 'app-depositarias-dinamic-table',
  templateUrl: './depositarias-dinamic-table.component.html',
  styleUrls: ['./depositarias-dinamic-table.component.scss']
})
export class DepositariasDinamicTableComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  formCajaDeValores: FormGroup = this.fb.group({
    cajasDepositarias: this.fb.array([])
  })

  cajaRealDepositoRowset: Tipos[] = [{ codigo: 'CDV', descripcion: 'CAJA DE VALORES'}, { codigo: 'L', descripcion: 'LEBAC'}, { codigo: 'E', descripcion: 'ESPECIE'} ]

  errorPorIntentarAgregarExistente: boolean = false
  errorPorIntentarEliminarCajaPrincipal: boolean = false

  ngOnInit() { }

  crearItem(nuevo: Depositaria): FormGroup {
    return this.fb.group({
      tipo: 'CDV',
      id: nuevo.id,
      cajaRealDeposito: 'CDV',
      principal: nuevo.principal,
      estado: Estados.NUEVA_IDENTIFICACION,

      idAnterior: nuevo.id,
      cajaRealDepositoAnterior: 'CDV',
      principalAnterior: nuevo.principal,
      estadoAnterior: Estados.NUEVA_IDENTIFICACION,
    })
  }

  get cajasDepositarias() {
    return this.formCajaDeValores.get('cajasDepositarias') as FormArray
  }

  //GETTERS DE VALORES ACTUALES
  /**
   * Retorna el tipo de la fila actual
   * @param indice 
   */
  getTipo(indice: number) {
    return this.cajasDepositarias.at(indice).get('tipo').value
  }

  getId(indice: number) {
    return this.cajasDepositarias.at(indice).get('id').value
  }

  getCajaRealDeposito(indice: number) {
    return this.cajasDepositarias.at(indice).get('cajaRealDeposito').value
  }

  getPrincipal(indice: number): boolean {
    return this.cajasDepositarias.at(indice).get('principal').value
  }

  //GETTERS DE VALORES ANTERIORES

  getIdAnterior(indice: number) {
    return this.cajasDepositarias.at(indice).get('idAnterior').value
  }

  getcajaRealDepositoAnterior(indice: number) {
    return this.cajasDepositarias.at(indice).get('cajaRealDepositoAnterior').value
  }

  getPrincipalAnterior(indice: number) {
    return this.cajasDepositarias.at(indice).get('principalAnterior').value
  }

  //GETTER FILA ACTUAL
  getFilaActual(indice: number) {
    return this.cajasDepositarias.at(indice).value
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
    return this.cajasDepositarias.at(indice).get('estado')
  }

  estadoAnteriorFila(indice: number) {
    return this.cajasDepositarias.at(indice).get('estadoAnterior')
  }

  //MÉTODOS QUE SE USAN EN EL HTML (BOTONES Y DEMÁS)

  /**
   * Boton ADD, agrega una nueva fila en la tabla
   */
  agregarItem() {    
    this.setFalseErrors()
    if(this.cajasDepositarias.length == 0) { this.cajasDepositarias.push(this.crearItem(new Depositaria(true))) }
    else { this.cajasDepositarias.push(this.crearItem(new Depositaria(false))) }
  }

  /**
   * Recorre la lista y cambia los value de principal en false cuando la caja que estoy guardando/modificando
   * esta seleccionada como principal
   */
    actualizarRadioPrincipal(indice: number) {
    if(this.getPrincipal(indice)) {
      this.cajasDepositarias.controls.forEach(e => { if(this.getId(indice) != e.get('id').value) { e.get('principal').setValue(false) } })
    }
  }

  /**
   * Boton aceptar, modificar, en caso de aceptar, envia la nueva fila, si es modificar habilita los campos
   * @param indice 
   */
  enviarDatosFila(indice: number) {
    switch(this.estadoActualFila(indice).value) {
      case Estados.NUEVA_IDENTIFICACION:
        if(this.cajaRealDepositoYaExiste(indice)) {
          this.errorPorIntentarAgregarExistente = true;
        } else {
          //Modifica el estado actual
          this.estadoActualFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
          this.estadoAnteriorFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
          //Copia Valores actuales en valores anteriores
          this.copiarElementosActualesEnAnteriores(indice)
          this.actualizarRadioPrincipal(indice)
          this.actualizarCambioDeCajaPrincipal()
          //Deshabilita la fila
          this.cajasDepositarias.at(indice).disable()
          console.log("NUEVA IDENTIFICACION: ", this.getFilaActual(indice))
          this.setFalseErrors()
        }
      break;
      case Estados.IDENTIFICACION_EN_EDICION:
        //Actualiza estados
        this.estadoActualFila(indice).setValue(Estados.CONFIRMAR_EDICION)
        this.estadoAnteriorFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
        //Habilita la fila
        this.cajasDepositarias.at(indice).get('cajaRealDeposito').enable()
        this.cajasDepositarias.at(indice).get('principal').enable()

        this.setFalseErrors()
        console.log("EDITAR IDENTIFICAICON: ", this.getFilaActual(indice))
      break;
      case Estados.CONFIRMAR_EDICION:
        if(this.cajaRealDepositoYaExiste(indice)) {
          this.errorPorIntentarAgregarExistente = true;
        } else {
          //Actualiza estados
          this.estadoActualFila(indice).setValue(Estados.IDENTIFICACION_EN_EDICION)
          this.copiarElementosActualesEnAnteriores(indice)   
          this.actualizarRadioPrincipal(indice)
          this.actualizarCambioDeCajaPrincipal()
          //Deshabilita la fila
          this.cajasDepositarias.at(indice).disable()
          console.log("CONFIRMAR EDICION: ", this.getFilaActual(indice))
          this.setFalseErrors()
        }
      break;
    }
  }


  /**
   * Boton Eliminar, elimina la fila actual
   * @param indice 
   */
  eliminarFila(indice: number) {
    if(this.cajaNoEsPrincipal(indice) || this.cajaDepositariaEsUnica(indice)) {
      this.cajasDepositarias.removeAt(indice)
      this.setFalseErrors()
    } else {
      this.errorPorIntentarEliminarCajaPrincipal = true
    }
    console.log("ELIMINAR")
  }

  /**
   * Boton back para retroceder los cambios hechos en la tabla
   * @param indice 
   */
  retrocederCambios(indice: number) {
    this.estadoActualFila(indice).setValue(this.estadoAnteriorFila(indice).value)
    this.copiarElementosAnterioresEnActuales(indice)
    this.retrocederCambioDeCajaPrincipal()
    this.cajasDepositarias.at(indice).disable()
    this.setFalseErrors()
    console.log("BACK", this.getFilaActual(indice))
  }

  /**
   * Recibe la respuesta de consulta de la BE13 y carga las cajas existentes para una especie
   * modelo seleccionada
   */
  cargarTablaConDatosDeConsulta() {
    
  }



  //MÉTODOS PRIVADOS QUE SOLO SE USAN EN EL TS

  private copiarElementosActualesEnAnteriores(indice: number) {
    this.cajasDepositarias.at(indice).get('idAnterior').setValue(this.getId(indice))
    this.cajasDepositarias.at(indice).get('cajaRealDepositoAnterior').setValue(this.getCajaRealDeposito(indice))
    this.cajasDepositarias.at(indice).get('principalAnterior').setValue(this.getPrincipal(indice))
  }

  private copiarElementosAnterioresEnActuales(indice: number) {
    this.cajasDepositarias.at(indice).get('id').setValue(this.getIdAnterior(indice))
    this.cajasDepositarias.at(indice).get('cajaRealDeposito').setValue(this.getcajaRealDepositoAnterior(indice))
    this.cajasDepositarias.at(indice).get('principal').setValue(this.getPrincipalAnterior(indice))
  }

  /**
   * Controla si el tipo que se quiere ingresar ya existe
   * @param indice indica la fila actual que se quiere agregar
   */
  private cajaRealDepositoYaExiste(indice: number): boolean {
    let encontrado: number = this.cajasDepositarias.controls.findIndex(e => e.get('cajaRealDepositoAnterior').value == this.getCajaRealDeposito(indice))
    return encontrado != -1 && encontrado != indice
  }

  private cajaNoEsPrincipal(indice: number): boolean {
    return this.getPrincipal(indice) == false
  }

  private cajaDepositariaEsUnica(indice: number): boolean {
    return this.cajasDepositarias.length == 1 && indice == 0
  }

  private setFalseErrors() {
    this.errorPorIntentarAgregarExistente = false
    this.errorPorIntentarEliminarCajaPrincipal = false
  }

  private retrocederCambioDeCajaPrincipal() {
    this.cajasDepositarias.controls.forEach(e => e.get('principal').setValue(e.get('principalAnterior').value))
  }

  private actualizarCambioDeCajaPrincipal() {
    this.cajasDepositarias.controls.forEach(e => e.get('principalAnterior').setValue(e.get('principal').value))
  }

  //para mi 
  debugLista() {
    this.cajasDepositarias.controls.forEach(e => console.log("DEBUG: ", e.value))
  }

}
