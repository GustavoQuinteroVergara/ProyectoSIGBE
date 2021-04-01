import { Component, OnInit,ViewChild } from '@angular/core';
import {EncuestaService} from '../../../services/encuesta.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ExporterService } from 'src/app/services/exporter.service';
@Component({
  selector: 'app-listarencuestas',
  templateUrl: './listarencuestas.component.html',
  styleUrls: ['./listarencuestas.component.css']
})
export class ListarencuestasComponent implements OnInit {

	listEncuestas:any;
	dataSource: MatTableDataSource<any>;
	displayedColumns: string[] = ['idencuesta','comentario' ,'Acciones'];

	@ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort,{static: false}) sort: MatSort;
  	constructor(private encuestaService:EncuestaService,
  		private excelService: ExporterService) 
  	{ 
  		this.getEncuestas();
  	}

  ngOnInit(): void {
  }

	  getEncuestas(){
	  	this.encuestaService.getEncuestas().subscribe(result=>{
	  		this.listEncuestas = result;
			this.dataSource = new MatTableDataSource(this.listEncuestas);
		    this.dataSource.paginator = this.paginator;
		    this.dataSource.sort = this.sort;
		    this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
	  	});
	  }

	  exportAsXLSX():void {
		this.excelService.exportToExcel(this.listEncuestas,'ReporteEncuestas');
	  }
	  applyExportarFiltrado() {
		this.excelService.exportToExcel(this.dataSource.filteredData, "EncuestasFiltradas");
		/*const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();*/
	  }
  	applyFilter(event){
		this.dataSource.filter = event.trim().toLowerCase();
	}

}
