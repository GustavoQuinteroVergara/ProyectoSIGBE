import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TicketService} from '../../services/ticket.service';
import {UsuarioService} from '../../services/usuario.service';
import {ConfiguracionService} from '../configuracion/configuracion.service';
import {CuposasignacionService} from '../../services/cuposasignacion.service';
import {PostulacionService} from '../../services/postulacion.service';
import Swal from 'sweetalert2';
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
	postulacionBeneficiario:any;  
	confirmacionBeneficiario = false;
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
		private postulacionService:PostulacionService,
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

	buscarBeneficiario(tipoBeca:any){
		console.log(this.tipoBeca);
		if(this.tipoBeca == 'Ticket Almuerzo'){
			this.postulacionService.postulacionBeneficiario(this.$nombreusuario.identi,1).subscribe(result=>{
				this.postulacionBeneficiario = result;
				this.confirmacionBeneficiario = true;
				console.log(result);
			},(err)=>{
				this.confirmacionBeneficiario = false;
				console.log(err);
			});
		}else{
			this.postulacionService.postulacionBeneficiario(this.$nombreusuario.identi,2).subscribe(result=>{
				this.postulacionBeneficiario = result;
				this.confirmacionBeneficiario = true;
			},(err)=>{
				this.confirmacionBeneficiario = false;
			});
		}

	}

	buscarConfiguracion(){
		this.configuracionService.listarConfiguracion().subscribe(result=>{
			this.configuracionBack = result;

			if(this.todaysDataTime < result['horaFinVentaAlmuerzo']){
				this.tipoBeca = 'Ticket Almuerzo';
				this.valorTicket=result['valorticketalmuerzo'];
				this.buscarBeneficiario('Ticket Almuerzo');
			}else{
				this.tipoBeca = 'Ticket Refrigerio';
				this.valorTicket=result['valorticketrefrigerio'];
				this.buscarBeneficiario('Ticket Refrigerio');
			}



			if((this.todaysDataTime >= result['horaFinVentaAlmuerzo']) && (this.todaysDataTime < result['horainicioVentaRefrigerio'])){
				this.verificarEstadohorario = false;
			}else if ((this.todaysDataTime < result['horainicioVentaAlmuerzo'])){
				this.verificarEstadohorario = false;
			}else if ((this.todaysDataTime > result['horaFinVentaRefrigerio'])){
				this.verificarEstadohorario = false;
			}

		},(err)=>{
			console.log(err);
		});
	}

	comprarTicket(){
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

		if(this.tipoBeca == 'Ticket Almuerzo'){
			this.asignacionEnviar = {
				conceasign : this.asignacionBuscada.concecutivo,
				cuposalmuerzo: this.asignacionBuscada.cuposalmuerzo - 1,
				cuposrefrigerio: this.asignacionBuscada.cuposrefrigerio
			}
		}else{
			this.asignacionEnviar = {
				conceasign : this.asignacionBuscada.concecutivo,
				cuposalmuerzo: this.asignacionBuscada.cuposalmuerzo,
				cuposrefrigerio: this.asignacionBuscada.cuposrefrigerio - 1
			}
		}
		this.ticketService.buscarTicketbyFechaUser(this.$nombreusuario.identi,this.ticketArray.tipoTicket).subscribe(result=>{
			Swal.fire({
	          title: 'ERROR',
	          text: 'Lo siento, ya reservaste el día de hoy.',
	          icon: 'error'
	        });
		},(err)=>{
			this.serviceCuposasign.actualizarCupos(this.asignacionEnviar).subscribe(result=>{
				this.ticketService.registrarTicket(this.ticketArray).subscribe(result=>{

					Swal.fire({
			          title: 'Exitoso',
			          text: 'Comprado exitosamente.',
			          icon: 'success'
			        });

				},(errors)=>{
					Swal.fire({
			          title: 'ERROR',
			          text: 'Error... : ' + errors.error,
			          icon: 'error'
			        });
				}); 

			},(exception)=>{
				Swal.fire({
		          title: 'ERROR',
		          text: 'Error... : ' + exception.error,
		          icon: 'error'
		        });
				
			});
		});

	}

	buscarAsignacionPorFecha(){
		this.serviceCuposasign.buscarAsignacionByFecha(this.fechaActual2).subscribe(res=>{
			this.asignacionBuscada=res;
		})
	}

}
