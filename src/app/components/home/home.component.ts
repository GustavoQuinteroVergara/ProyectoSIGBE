import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {PeriodoServiceService} from '../../services/periodo-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {InicioService} from './inicio.service'
import {Router } from '@angular/router';

import {formatDate } from '@angular/common';
import { TicketService } from 'src/app/services/ticket.service';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	$nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
	verificacionPeriodoCaducado = false;
	fechaActual2= formatDate(new Date(), 'yyyy-MM-dd', 'en');
	fechaultperiodo:any;
	periodocaducado:any;
    postulaciones:any;
	public formularioRegistrarPeriodo: FormGroup;

	periodoArray:any;

	@ViewChild('templatePeriodo') customTemplate: TemplateRef<any>;
	constructor(private periodoService:PeriodoServiceService, public dialog: MatDialog, private router:Router, private listarpostu: InicioService) { 
		this.buscarUltimoperiodo();
		this.buscarPostuEnespera();

	}

	buscarPostuEnespera(){
		this.listarpostu.buscarPostuEnespera().subscribe(res=>{
             this.postulaciones=res;
		})

		
	}

	ngOnInit(): void {
		
	}

	cerrarSesion(){
		localStorage.removeItem('currentUser');
		this.dialog.closeAll();
		this.router.navigate(['/']);

	}


	buscarUltimoperiodo(){
		this.periodoService.ultimoPeriodoRegistrado().subscribe(result =>{
			this.fechaultperiodo = formatDate(result['fechafinal']['date'], 'yyyy-MM-dd', 'en');
			if(this.fechaultperiodo < this.fechaActual2){
				this.verificacionPeriodoCaducado = true;
				console.log('llegue aqui');
				this.formularioRegistrarPeriodo = new FormGroup({
					fechasperiodo: new FormControl('',Validators.required),
					descripcionperiodo: new FormControl('',Validators.required),
				});
				let dialogRef = this.dialog.open( this.customTemplate,{
					height: '580px',
					width: '450px',
					disableClose: true, 
				});
			}

		},(err)=>{

		});
	}

	public hasError = (controlName: string, errorName: string) =>{
		return this.formularioRegistrarPeriodo.controls[controlName].hasError(errorName);
	}

	registrarPeriodo(descripcion:any,fechaini:any,fechafin:any,errorperiodo,periodoexitoso){
		this.periodoArray = {
			descripcion:descripcion,
			fechainicial:fechaini,
			fechafin:fechafin
		};

		this.periodoService.crearPeriodo(this.periodoArray).subscribe(result=>{
			console.log(result);
			this.dialog.closeAll();
		},(err)=>{
			let dialogRef = this.dialog.open( errorperiodo,{
				height: '550px',
				width: '450px',
			});
		});


	}
	buscarEstPostuByIden(templateRef){
		let dialogRef = this.dialog.open( templateRef,{
			 height: '500px',
			 width: '500px',
		   });
	  }

}
