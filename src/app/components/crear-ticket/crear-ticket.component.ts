import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TicketService} from '../../services/ticket.service';
import {UsuarioService} from '../../services/usuario.service';
import {ConfiguracionService} from '../configuracion/configuracion.service';
import {CuposasignacionService} from '../../services/cuposasignacion.service';
import {PostulacionService} from '../../services/postulacion.service';
import {PeriodoServiceService} from '../../services/periodo-service.service';
import {EncuestaService} from '../../services/encuesta.service';
import { MatSnackBar} from '@angular/material/snack-bar';
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
	diaactual= formatDate(new Date(), 'dd', 'en');
	todaysDataTime = '';
	ticketArray:any;
	postulacionBeneficiario:any;  
	confirmacionBeneficiario = false;
	asignacionBuscada:any= '-';
	ultimoPeriodo:any;
	encontroEncuesta = true;
	fechaultperiodo:any;



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

	encuesta:any;


	constructor(private ticketService:TicketService,
		private configuracionService:ConfiguracionService,
		private postulacionService:PostulacionService,
		public snackBack: MatSnackBar,
		private usuarioService:UsuarioService,public dialog: MatDialog, 
		private periodoService:PeriodoServiceService,
		private encuestaService:EncuestaService,
		private serviceCuposasign:CuposasignacionService) { 
		this.elementType = 'img';
		this.todaysDataTime = formatDate(new Date(), 'HH:mm', 'en-US');
		this.buscarAsignacionPorFecha();
		this.buscarConfiguracion();
		this.buscarUltimoPeriodo();


		this.level = 'M';
		this.qrdata = 'Initial QR code data string';
		this.scale = 1;
		this.width = 256;

		// Horas manejada en 24:00HS
		
		console.log(this.todaysDataTime);
	}

	realizarEncuesta(templateRef){
	   	let dialogRef = this.dialog.open( templateRef,{
	        panelClass: 'app-full-bleed-dialog', 
	        height: '600px',
	        width: '600px',
       	});
	}

	guardarEncuesta(){
		this.encuestaService.agregarEncuesta(this.encuesta).subscribe(result=>{
			this.encontroEncuesta = true;
			Swal.fire({
	          title: 'Exitoso',
	          text: 'Encuesta registrada, gracias por tu opinión.',
	          icon: 'success'
	        });
	        this.dialog.closeAll();
		},(err)=>{
			Swal.fire({
	          title: 'ERROR',
	          text: 'ERROR al registrar la encuesta, por favor intentelo de nuevo, ERROR: ' + err.error.text,
	          icon: 'error'
	        });
	        this.dialog.closeAll();
		});
	}

	buscarUltimoPeriodo(){
		this.periodoService.ultimoPeriodoRegistrado().subscribe(result =>{
			this.ultimoPeriodo = result;
			this.encuestaService.encuestaUser(this.$nombreusuario.identi,result['consecutivo_periodo']).subscribe(result=>{
				this.encontroEncuesta = true;
			},(err)=>{
			if (result['menossietedias']) {
				this.snackBack.open('Por favor realiza la encuesta antes de reservar.','Aceptar',{
			        duration: 5000,
			        horizontalPosition: 'right',
			        verticalPosition: 'top',
			        panelClass: ['redNoMatch']
			    });
			    this.encontroEncuesta = false;
			    this.encuesta = {
					iduser:this.$nombreusuario.identi,
					idperiodo:this.ultimoPeriodo.consecutivo_periodo,
					frecuencia:0,
					calidad:0,
					cantidad:0,
					variedad:0,
					espacio:0,
					horario:0,
					calificacion:0,
					calidadcomentario:"",
					espaciocomentario:"",
					horariocomentario:"",
					calificacioncomentario:"",
					comentario:""
				};
			}else{
				this.encontroEncuesta = true;
			}
			});

		});

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
			          text: 'Reservado exitosamente.',
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
