import { Component, OnInit, ViewChild } from '@angular/core';
import {ServicesticketsService} from './serviciolistarticket.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {PeriodoServiceService} from './../../services/periodo-service.service';
import Swal from 'sweetalert2';
import { ExporterService } from 'src/app/services/exporter.service';
@Component({
  selector: 'app-listartickets',
  templateUrl: './listartickets.component.html',
  styleUrls: ['./listartickets.component.css']
})
export class ListarticketsComponent {

	ticketes:any;
	opcionSeleccionada="";
	periodoSel:any;
	desactivarButton=false;
	periodosAll:any;
	tipoTicket:any;
	estadoTicket:any;
	dinerorecolectado:any;
	identificacionSel:any;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['consecutivoticket', 
    'fecha_compra','estadoticket','tipoticket', 'identificacion_estudiante', 
    'nombre_estudiate','apellido_estudiate'];

	@ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort,{static: false}) sort: MatSort;
  	constructor(private servitickets: ServicesticketsService,private periodoService:PeriodoServiceService, private excelService: ExporterService) { 
  		this.buscartickets();
  		this.getsPeriodos();
  	}

  	getsPeriodos(){
  		this.periodoService.getsPeriodos().subscribe(result=>{
  			this.periodosAll = result;
  		});
  	}

  	consultarFiltro(){
  		switch (this.opcionSeleccionada) {
  			case "Periodo":
  				this.periodoService.ticketsByPeriodo(this.periodoSel).subscribe(result=>{
  					this.ticketes=result;
				    this.dataSource = new MatTableDataSource(this.ticketes);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
  				});
  				break;
  			case "Tipo":
  				this.servitickets.ticketsByTipo(this.tipoTicket).subscribe(result=>{
  					this.ticketes=result;
				    this.dataSource = new MatTableDataSource(this.ticketes);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
  				});
  				break;
  			case "Estado":
  				this.servitickets.ticketsByEstado(this.estadoTicket).subscribe(result=>{
  					this.ticketes=result;
				    this.dataSource = new MatTableDataSource(this.ticketes);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
  				});
  				break;
  			case "identi":
  				this.servitickets.ticketsByIdenti(this.identificacionSel).subscribe(result=>{
  					this.ticketes=result;
				    this.dataSource = new MatTableDataSource(this.ticketes);
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
  				},(err)=>{
  					Swal.fire({
				      title: 'ERROR.',
				      text: 'No se encontro tickets. ',
				      icon: 'error'
				    });
  				});
  				break; 	
  			case "sinfiltro":
  				this.buscartickets();
  			break;			  				  				  			
  			default:
  				// code...
  				break;
  		}
  	}
 	buscartickets(){
	   this.servitickets.buscartickets().subscribe(result =>{ 
	    this.ticketes=result;
	    // for (var i = 0; i < this.ticketes.length; ++i) {
	    // 	this.dinerorecolectado = this.dinerorecolectado + this.ticketes[i].valorticket;
	    // }
	    this.dataSource = new MatTableDataSource(this.ticketes);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
	  });
	}
	exportAsXLSX():void {
		this.excelService.exportToExcel(this.ticketes,'ReporteTickets');
	  }
	  applyExportarFiltrado() {
		  this.excelService.exportToExcel(this.dataSource.filteredData, "TicketsFiltrados");
		/*const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();*/
	  }
	applyFilter(event){
		this.dataSource.filter = event.trim().toLowerCase();
	}
}