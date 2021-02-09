import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {Globals} from './../../global';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TicketService} from '../../services/ticket.service';
import {UsuarioService} from '../../services/usuario.service';
import {CuposasignacionService} from '../../services/cuposasignacion.service';

@Component({
  selector: 'app-crear-ticket',
  templateUrl: './crear-ticket.component.html',
  styleUrls: ['./crear-ticket.component.css']
})
export class CrearTicketComponent {
  globals: Globals;
  tipoBeca='';
  fechaActual= formatDate(new Date(), 'yyyy/MM/dd', 'en');
  fechaActual2= formatDate(new Date(), 'yyyy-MM-dd', 'en');
  todaysDataTime = '';
  ticketArray:any;

  asignacionBuscada:any= '-';



  public qrdata: string = null;
  public elementType: 'img' | 'url' | 'canvas' | 'svg' = null;
  public level: 'L' | 'M' | 'Q' | 'H';
  public scale: number;
  public width: number;

  userArraySaldo:any;
  asignacionEnviar:any;
  valorTicket:number;
  success=false;
  confSaldo = true;
  confErr = false;
  confHorario = true;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));

  constructor(globals: Globals,private ticketService:TicketService,
    private usuarioService:UsuarioService,public dialog: MatDialog, 
    private serviceCuposasign:CuposasignacionService) { 
    this.elementType = 'img';
    this.level = 'M';
    this.qrdata = 'Initial QR code data string';
    this.scale = 1;
    this.width = 256;
    this.globals = globals;

    // Horas manejada en 24:00HS
    this.todaysDataTime = formatDate(this.fechaActual, 'HH:mm', 'en-US');
    console.log(this.todaysDataTime);
    if(this.todaysDataTime < '12:30'){
      this.tipoBeca = 'Ticket Almuerzo';
      this.valorTicket=globals.valorticketalmuerzo;
    }else{
      this.tipoBeca = 'Ticket Refrigerio';
      this.valorTicket=globals.valorticketrefrigerio;
    }

    this.buscarAsignacionPorFecha();

  }

  comprarTicket(templateRef){
    this.success=false;
    this.confSaldo = true;
    this.confErr = false;
    this.confHorario = true;
    this.ticketArray= {
      idUser: this.$nombreusuario.identi,
      valorticket:this.valorTicket,
      tipoTicket:this.tipoBeca,
      idAsign:this.asignacionBuscada.concecutivo
    }
    this.asignacionEnviar = {
      conceasign : this.asignacionBuscada.concecutivo,
      cuposnuevos: this.asignacionBuscada.cuposdisponibles - 1
    }

    console.log(this.ticketArray);


    this.ticketService.buscarTicketbyFechaUser(this.$nombreusuario.identi).subscribe(result=>{
      let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });

    },(err)=>{
      this.serviceCuposasign.actualizarCupos(this.asignacionEnviar).subscribe(result=>{
        this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{

        },(errors)=>{
          let dialogRef = this.dialog.open( templateRef,{
            height: '200px',
            width: '200px',
          });
          console.log(errors.error);
        }); 

      },(exception)=>{
        let dialogRef = this.dialog.open( templateRef,{
          height: '200px',
          width: '200px',
        });
        console.log(exception.error);
      });
    });




  }

  buscarAsignacionPorFecha(){
    this.serviceCuposasign.buscarAsignacionByFecha(this.fechaActual2).subscribe(res=>{
      this.asignacionBuscada=res;
    })
  }

}
