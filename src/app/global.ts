import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
  valorticketalmuerzo: number = 2500;
  valorticketrefrigerio: number = 1500;
  horainicioVentaAlmuerzo:string = '09:00';
  horaFinVentaAlmuerzo:string = '12:31';
  horainicioVentaRefrigerio:string = '16:00';
  horaFinVentaRefrigerio:string = '18:00';
}