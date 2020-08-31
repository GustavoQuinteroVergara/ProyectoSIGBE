import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {Globals} from './../../global';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TicketService} from '../../services/ticket.service';
import {UsuarioService} from '../../services/usuario.service';

@Component({
  selector: 'app-crear-ticket',
  templateUrl: './crear-ticket.component.html',
  styleUrls: ['./crear-ticket.component.css']
})
export class CrearTicketComponent {
  globals: Globals;
  tipoBeca='';
  fechaActual= new Date();
  todaysDataTime = '';
  ticketArray:any;

  userArraySaldo:any;
  valorTicket:number;
  success=false;
  confSaldo = true;
  confErr = false;
  confHorario = true;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));

  constructor(globals: Globals,private ticketService:TicketService,
    private usuarioService:UsuarioService,public dialog: MatDialog) { 
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
	
  }

  comprarTicket(templateRef){
      this.success=false;
      this.confSaldo = true;
      this.confErr = false;
      this.confHorario = true;
  	this.ticketArray= {
  		idUser: this.$nombreusuario.identi,
  		valorticket:this.valorTicket,
  		tipoTicket:this.tipoBeca
  	}
    this.userArraySaldo = {
      idUser : this.$nombreusuario.identi,
      saldo : this.$nombreusuario.saldo - this.valorTicket
    }

  	if((this.todaysDataTime > this.globals.horainicioVentaAlmuerzo) &&  (this.todaysDataTime < this.globals.horaFinVentaAlmuerzo)){
      //inicio primer if

      if(this.userArraySaldo.saldo >= 0){

        	this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{
        		
            
            this.usuarioService.actualizarSaldo(this.userArraySaldo).subscribe(result=>{
              this.$nombreusuario.saldo = this.$nombreusuario.saldo - this.valorTicket;
              this.success=true;
              localStorage.setItem('currentUser',JSON.stringify(this.$nombreusuario));
              let dialogRef = this.dialog.open( templateRef,{
                height: '200px',
                width: '200px',
              });
              console.log("Actualizado, msg " ,result);

            },(err)=>{
              this.confErr = true;
              let dialogRef = this.dialog.open( templateRef,{
                height: '200px',
                width: '200px',
              });
              console.log(err.error);
            });
        	},(err)=>{
            this.confErr = true;
              let dialogRef = this.dialog.open( templateRef,{
                height: '200px',
                width: '200px',
              });
              console.log(err.error);
        	});

      }else{
        this.confSaldo = false;
      let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });

      }


    //fin primer if
  	}else if((this.todaysDataTime > this.globals.horainicioVentaRefrigerio) &&  
  		(this.todaysDataTime < this.globals.horaFinVentaRefrigerio)){
      // Inicio segundo if
        if(this.userArraySaldo.saldo >= 0){

          this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{
            
            
            this.usuarioService.actualizarSaldo(this.userArraySaldo).subscribe(resultus=>{
              this.$nombreusuario.saldo = this.$nombreusuario.saldo - this.valorTicket;
              this.success=true;
              localStorage.setItem('currentUser',JSON.stringify(this.$nombreusuario));
              let dialogRef = this.dialog.open( templateRef,{
                height: '200px',
                width: '200px',
              });
              
              console.log("Actualizado, msg " ,resultus);

            },(errs)=>{
              this.confErr = true;
              let dialogRef = this.dialog.open( templateRef,{
                height: '200px',
                width: '200px',
              });
              console.log(errs.error);
            });
          },(err)=>{
              this.confErr = true;
              let dialogRef = this.dialog.open( templateRef,{
                height: '200px',
                width: '200px',
              });
          });

      }else{
        this.confSaldo = false;
      let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });

      }

    // Fin segundo if
  	}else{
      this.confHorario = false;
  		let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });
  	}  	


  }

}
