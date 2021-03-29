import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {PeriodoServiceService} from '../../services/periodo-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import {InicioService} from './inicio.service';
import {ListconvoactivasService} from './../postulacion/registrar-postulacion/listconvoactivas.service';
import {Router } from '@angular/router';

import html2canvas from "html2canvas";
import {formatDate } from '@angular/common';
import { BecaService } from '../../services/beca.service';
import Swal from 'sweetalert2';
import { Chart } from 'chart.js';
@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	success:any;

	$nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
	verificacionPeriodoCaducado = false;
	fechaActual2= formatDate(new Date(), 'yyyy-MM-dd', 'en');
	fechaultperiodo:any;
	periodocaducado:any;
    postulaciones:any;
    convoActivas:any;
    label=[];
    data=[];
    imgcreada = false;
	imagenCreada;
	colors= [
	"#63b598", "#ce7d78", "#ea9e70", "#a48a9e", "#c6e1e8", "#648177" ,"#0d5ac1" ,
	"#f205e6" ,"#1c0365" ,"#14a9ad" ,"#4ca2f9" ,"#a4e43f" ,"#d298e2" ,"#6119d0",
	"#d2737d" ,"#c0a43c" ,"#f2510e" ,"#651be6" ,"#79806e" ,"#61da5e" ,"#cd2f00" ,
	"#9348af" ,"#01ac53" ,"#c5a4fb" ,"#996635","#b11573" ,"#4bb473" ,"#75d89e" ,
	"#2f3f94" ,"#2f7b99" ,"#da967d" ,"#34891f" ,"#b0d87b" ,"#ca4751" ,"#7e50a8" ,
	"#c4d647" ,"#e0eeb8" ,"#11dec1" ,"#289812" ,"#566ca0" ,"#ffdbe1" ,"#2f1179" ,
	"#935b6d" ,"#916988" ,"#513d98" ,"#aead3a", "#9e6d71", "#4b5bdc", "#0cd36d",
	"#250662", "#cb5bea", "#228916", "#ac3e1b", "#df514a", "#539397", "#880977",
	"#f697c1", "#ba96ce", "#679c9d", "#c6c42c", "#5d2c52", "#48b41b", "#e1cf3b",
	"#5be4f0", "#57c4d8", "#a4d17a", "#225b8", "#be608b", "#96b00c", "#088baf"];
	colorgrafica=[];
    postufound:any;
    listbecas:any;
    infoColores:any;
    graficaInfo:any;
    isChartRendered = false;
    number1:any = 0;
    number2:any = 0;
    chart = [];
    chartCarreras = new Chart('postus', {
			   type: 'pie',
			   data: {
			    labels: this.label,
			    datasets: [
			      {
			     label: 'Postulaciones por carreras y beca',
			     fill: false,
			     data: this.data,            
			     backgroundColor:  this.colorgrafica,
	            borderColor:  this.colorgrafica,
	            borderWidth: 1
			      }
			    ]
			     },options: {
				    scales: {
				        yAxes: [{
				            ticks: {
				                beginAtZero: true
				            }
				        }]
				    }
				}
		});
	public formularioRegistrarPeriodo: FormGroup;

	periodoArray:any;

	@ViewChild('templatePeriodo') customTemplate: TemplateRef<any>;
	constructor(private periodoService:PeriodoServiceService, 
		public dialog: MatDialog, 
		private router:Router, 

		private inicioService: InicioService,
		private listConvoActivas:ListconvoactivasService,
		private becaService:BecaService) { 
		if(this.$nombreusuario.rol != 1){
			this.buscarBeca();
			this.buscarUltimoperiodo();
			this.buscarPostuEnespera();
			this.buscarInfoColores();
			this.buscarGraficaInfo();
		} else{
			this.getConvoActivas();
		}

	}

	buscarPostuEnespera(){
		this.inicioService.buscarPostuEnespera().subscribe(res=>{
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

	getConvoActivas(){
		this.listConvoActivas.buscarConvoActivas().subscribe(result=>{
			this.convoActivas = result;
			Swal.close();
		});
	}




	buscarUltimoperiodo(){
		this.periodoService.ultimoPeriodoRegistrado().subscribe(result =>{
			Swal.close();
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
			Swal.fire({
		      title: 'Exitoso.',
		      text: 'Periodo registrado exitosamente.',
		      icon: 'success'
		    });
			this.dialog.closeAll();
		},(err)=>{
			Swal.fire({
		      title: 'ERROR AL REGISTRAR EL PERIODO...',
		      text: 'Por favor, verifique si los datos son correctos.',
		      icon: 'error'
		    });
		});


	}
	crearImagen() {
		// html2canvas(document.querySelector("#postus")).then(canvas => {
		// 	this.imagenCreada = canvas.toDataURL();    
		// });
		// this.imgcreada = true;
		if (!this.isChartRendered) return;
		html2canvas(document.querySelector("#graficacarrerabeca")).then(grid1Legend => {

		  this.imagenCreada = grid1Legend.toDataURL();  
		  	const a = document.createElement("a");
		    a.setAttribute("download", `grafica.png`);
		    a.setAttribute("href", this.imagenCreada);
		    a.click();   

		});
		this.imgcreada = true;
	}
	buscarEstPostuByIden(templateRef){
		let dialogRef = this.dialog.open( templateRef,{
			 height: '500px',
			 width: '500px',
		   });
	  }

	buscarInfoColores(){
		this.inicioService.infoColores().subscribe(result=>{
			this.infoColores = result;
		},(err)=>{
		});
	}
	 buscarBeca(){
	    this.becaService.buscarListadoBecas().subscribe(result=>{
	      this.listbecas = result;
            this.chartCarreras = new Chart('postus', {
			   type: 'pie',
			   data: {
			    labels: this.label,
			    datasets: [
			      {
			     label: 'Postulaciones por carreras y beca',
			     fill: false,
			     data: this.data,            
			     backgroundColor:  this.colorgrafica,
	            borderColor:  this.colorgrafica,
	            borderWidth: 1
			      }
			    ]
			     },options: {
			     	hover: {mode: null},
			     	      animation: {
					         onComplete: function() {
					            this.isChartRendered = true
					         }
					      },
				    scales: {
				        yAxes: [{
				            ticks: {
				                beginAtZero: true
				            }
				        }]
				    }
				}
		});
	    });
	}

  consultarPostuCarrera(idbeca:any){
  	    this.becaService.buscarpostuCarreraBeca(idbeca).subscribe(result=>{
        this.postufound = result;
        this.data= [];
        this.label = [];
        for (var i = 0; i < result[0].length; i++) {
      	  this.data.push(result[0][i]);
      	  this.label.push(result[1][i]);
      	  this.colorgrafica.push(this.colors[i]);
        }
        this.chartCarreras.destroy();
        this.chartCarreras = new Chart('postus', {
			   type: 'pie',
			   data: {
			    labels: this.label,
			    datasets: [
			      {
			     label: 'Postulaciones por carreras y beca',
			     fill: false,
			     data: this.data,            
			     backgroundColor:  this.colorgrafica,
	            borderColor:  this.colorgrafica,
	            borderWidth: 1
			      }
			    ]
			     },options: {
			     	animation: {
					         onComplete: function() {
					            this.isChartRendered = true
					         }
					      },
				    scales: {
				        yAxes: [{
				            ticks: {
				                beginAtZero: true
				            }
				        }]
				    }
				}
		});


    },(err)=>{

    });
  }

	buscarGraficaInfo(){
		this.inicioService.graficaInfo().subscribe(result=>{
			this.graficaInfo = result;

			this.chart = new Chart('realtime', {
			   type: 'bar',
			   data: {
			    labels: ["Zona Rural","Zona Urbana"],
			    datasets: [
			      {
			     label: 'Postulaciones por zona residencial',
			     minBarLength: 2,
			     fill: false,
			     data: [this.graficaInfo.cantrural,this.graficaInfo.canturbana],            
			     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            	],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)'
	            ],
	            borderWidth: 1
			      }
			    ]
			     },options: {
				    scales: {
				        yAxes: [{
				            ticks: {
				                beginAtZero: true
				            }
				        }]
				    }
				}
		});
		},(err)=>{
			console.log(err);
		});
	}


}
