import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TicketService} from '../../services/ticket.service';
import {UsuarioService} from '../../services/usuario.service';
import {ConfiguracionService} from '../configuracion/configuracion.service';
import {CuposasignacionService} from '../../services/cuposasignacion.service';

@Component({
  selector: 'app-crear-ticket',
  templateUrl: './crear-ticket.component.html',
  styleUrls: ['./crear-ticket.component.css']
})
export class CrearTicketComponent {
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
  verificarEstadohorario = true;
  configuracionBack:any;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));

  constructor(private ticketService:TicketService,
    private configuracionService:ConfiguracionService,
    private usuarioService:UsuarioService,public dialog: MatDialog, 
    private serviceCuposasign:CuposasignacionService) { 
    this.elementType = 'img';
    this.todaysDataTime = formatDate(new Date(), 'HH:mm', 'en-US');
    this.buscarAsignacionPorFecha();
    this.buscarConfiguracion();
    this.level = 'M';
    this.qrdata = 'Initial QR code data string';
    this.scale = 1;
    this.width = 256;

    // Horas manejada en 24:00HS
    
    console.log(this.todaysDataTime);




  }

  buscarConfiguracion(){
    this.configuracionService.listarConfiguracion().subscribe(result=>{
      this.configuracionBack = result;

      if(this.todaysDataTime < result['horaFinVentaAlmuerzo']){
        this.tipoBeca = 'Ticket Almuerzo';
        this.valorTicket=result['valorticketalmuerzo'];
      }else{
        this.tipoBeca = 'Ticket Refrigerio';
        this.valorTicket=result['valorticketrefrigerio'];
      }

      if((this.todaysDataTime >= result['horaFinVentaAlmuerzo']) && (this.todaysDataTime < result['horainicioVentaRefrigerio'])){
        this.verificarEstadohorario = false;
      }

    },(err)=>{
      console.log(err);
    });
  }

  comprarTicket(success, errcomprado,err){
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


    this.ticketService.buscarTicketbyFechaUser(this.$nombreusuario.identi,this.ticketArray.tipoTicket).subscribe(result=>{
      let dialogRef = this.dialog.open( errcomprado,{
        height: '200px',
        width: '350px',
      });

    },(err)=>{
      console.log(err.error);
      this.serviceCuposasign.actualizarCupos(this.asignacionEnviar).subscribe(result=>{
        this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{
          let dialogRef = this.dialog.open( success,{
            height: '200px',
            width: '350px',
          });
        },(errors)=>{
          let dialogRef = this.dialog.open( err,{
            height: '200px',
            width: '350px',
          });
          console.log(errors.error);
        }); 

      },(exception)=>{
        let dialogRef = this.dialog.open( err,{
          height: '200px',
          width: '350px',
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
