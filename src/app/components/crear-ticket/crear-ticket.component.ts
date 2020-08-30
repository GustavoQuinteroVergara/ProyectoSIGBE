import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {Globals} from './../../global';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TicketService} from '../../services/ticket.service';

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
  valorTicket:number;
  success=false;
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));

  constructor(globals: Globals,private ticketService:TicketService,public dialog: MatDialog) { 
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
  	this.ticketArray= {
  		idUser: this.$nombreusuario.identi,
  		valorticket:this.valorTicket,
  		tipoTicket:this.tipoBeca
  	}

  	if((this.todaysDataTime > this.globals.horainicioVentaAlmuerzo) &&  (this.todaysDataTime < this.globals.horaFinVentaAlmuerzo)){
  		this.success=true;
  		let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });
  	this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{
  		this.success=false;
  	},(err)=>{
  		this.success=false;
  	});
  	}else if((this.todaysDataTime > this.globals.horainicioVentaRefrigerio) &&  
  		(this.todaysDataTime < this.globals.horaFinVentaRefrigerio)){
  	this.success=true;
  	let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });
  	this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{
  		this.success=false;
  	},(err)=>{
  		this.success=false;
  	});
  	}else{
  		let dialogRef = this.dialog.open( templateRef,{
        height: '200px',
        width: '200px',
      });
  	}  	


  }

}
