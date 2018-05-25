
export class Identificacion {
    tipo: string
    id: string
    clasificacion: string
    estado: Estados
}

export class Tipos {
    codigo: string
    descripcion: string
}

export class Depositaria {
    tipo: string
    id: string
    principal: boolean
    cajaRealDeposito: string
    estado: Estados
    constructor(principal: boolean) {
        this.principal = principal
    }
}

export enum Estados {
    NUEVA_IDENTIFICACION = 'NUEVA',
    IDENTIFICACION_EN_EDICION = 'EDITAR',
    CONFIRMAR_EDICION = 'CONFIRMAR'
}