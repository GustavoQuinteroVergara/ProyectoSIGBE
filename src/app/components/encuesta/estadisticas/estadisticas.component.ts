import { Component, OnInit } from '@angular/core';
import {EncuestaService} from '../../../services/encuesta.service';
import {PeriodoServiceService} from '../../../services/periodo-service.service';
import { Chart } from 'chart.js';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

	estadisticas:any;
	periodosList:any;
	copiachartpregunta1:any;
	copiachartpregunta2:any;
	copiachartpregunta3:any;
	copiachartpregunta4:any;
	copiachartpregunta5:any;
	copiachartpregunta6:any;
	copiachartpregunta7:any;
	chartpregunta1= new Chart('pregunta1', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta2= new Chart('pregunta2', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta3= new Chart('pregunta3', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta4= new Chart('pregunta4', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta5= new Chart('pregunta5', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta6= new Chart('pregunta6', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta7= new Chart('pregunta7', {
			   type: 'bar',
			   data: {
			    labels: '',
			    datasets: [
			      {
			     label: '',
			     fill: false,
			     data: [],            
			     backgroundColor:  [],
	            borderColor:  [],
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
	chartpregunta8=[];


	constructor(private encuestaService:EncuestaService,private periodoService:PeriodoServiceService) { 

		this.getEncuestasInformes(0);
		this.getPeriodos();
	}

	ngOnInit(): void {
	}

	getPeriodos(){
		this.periodoService.getsPeriodos().subscribe(result=>{
			this.periodosList = result;
		});

	}

  	getEncuestasInformes(opcion:any){
  		Swal.fire({
	       title: 'Cargando...',
	       allowOutsideClick: false,
	    });
      Swal.showLoading();
		this.encuestaService.getInformes(opcion).subscribe(result=>{
		  	this.estadisticas = result;

		  	//ESTABLECER LAS GRAFICAS
		  	this.establecerGraficafrecuencia();
		  	this.establecerGraficacalidad();
		  	this.establecerGraficacantidad();
		  	this.establecerGraficavariedad();
		  	this.establecerGraficahorario();
		  	this.establecerGraficaespacio();
		  	this.establecerGraficacalificacionservicio();
		  	Swal.close();


		});
	}

	establecerGraficafrecuencia(){
			this.chartpregunta1.destroy();
		  	this.chartpregunta1 = new Chart('pregunta1', {
			   type: 'bar',
			   data: {
			    labels: ["Todos los dias","1-3 veces a la semana", "3-4 veces a la semana"],
			    datasets: [
			      {
			     label: 'Frecuencia usó el beneficio',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[0][0],this.estadisticas[0][1],this.estadisticas[0][2]],            
			     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(72, 24, 235, 0.2)'
            	],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(72, 24, 235, 1)'
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
	}
	establecerGraficacalidad(){
		this.chartpregunta2.destroy();
		  	this.chartpregunta2 = new Chart('pregunta2', {
			   type: 'bar',
			   data: {
			    labels: ["Excelente","Bueno", "Regular","Malo"],
			    datasets: [
			      {
			     label: 'La calidad de los alimentos servidos',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[1][0],this.estadisticas[1][1],this.estadisticas[1][2],this.estadisticas[1][3]],            
			     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(72, 24, 235, 0.2)',
                'rgba(24, 91, 112, 0.2)'
            	],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(72, 24, 235, 1)',
	                'rgba(24, 91, 112, 1)'
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

	}
	establecerGraficacantidad(){
		this.chartpregunta3.destroy();
			this.chartpregunta3 = new Chart('pregunta3', {
			   type: 'bar',
			   data: {
			    labels: ["Si","No", "A veces"],
			    datasets: [
			      {
			     label: 'La cantidad de comida es adecuada',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[2][0],this.estadisticas[2][1],this.estadisticas[2][2]],            
			     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(72, 24, 235, 0.2)'
            	],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(72, 24, 235, 1)'
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
	}
	establecerGraficavariedad(){
		this.chartpregunta4.destroy();
			this.chartpregunta4 = new Chart('pregunta4', {
			   type: 'bar',
			   data: {
			    labels: ["Si","No", "A veces"],
			    datasets: [
			      {
			     label: 'La variedad en el menu',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[3][0],this.estadisticas[3][1],this.estadisticas[3][2]],            
			     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(72, 24, 235, 0.2)'
            	],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(72, 24, 235, 1)'
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

	}
	establecerGraficahorario(){
		this.chartpregunta5.destroy();
			this.chartpregunta5 = new Chart('pregunta5', {
			   type: 'bar',
			   data: {
			    labels: ["Si","No"],
			    datasets: [
			      {
			     label: 'El horario actual en él que se sirve el almuerzo',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[4][0],this.estadisticas[4][1]],            
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
	}
	establecerGraficaespacio(){
		this.chartpregunta6.destroy();
			this.chartpregunta6 = new Chart('pregunta6', {
			   type: 'bar',
			   data: {
			    labels: ["Si","No"],
			    datasets: [
			      {
			     label: 'El espacio donde se realiza la entrega de los almuerzos',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[5][0],this.estadisticas[5][1]],            
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
	}
	establecerGraficacalificacionservicio(){
		this.chartpregunta7.destroy();
			this.chartpregunta7 = new Chart('pregunta7', {
			   type: 'bar',
			   data: {
			    labels: ["Excelente","Bueno", "Regular","Malo"],
			    datasets: [
			      {
			     label: 'Calificación del servicio',
			     minBarLength: 2,
			     fill: false,
			     data: [this.estadisticas[6][0],this.estadisticas[6][1],this.estadisticas[6][2],this.estadisticas[6][3]],            
			     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(72, 24, 235, 0.2)',
                'rgba(24, 91, 112, 0.2)'
            	],
	            borderColor: [
	                'rgba(255, 99, 132, 1)',
	                'rgba(54, 162, 235, 1)',
	                'rgba(72, 24, 235, 1)',
	                'rgba(24, 91, 112, 1)'
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
	}




}
