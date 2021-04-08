import { Component, OnInit ,ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params } from '@angular/router';
import {BeneficiariosService} from '../../../services/beneficiarios.service';
import {ExporterService} from '../../../services/exporter.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-listado-final',
  templateUrl: './listado-final.component.html',
  styleUrls: ['./listado-final.component.css']
})
export class ListadoFinalComponent implements OnInit {
	idConvo:any;
	beneficiarioListado:any;
  	dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = [
    'nombre_estudiante', 'ciudad_residencia', 'carrera',
    'codigo_estudiante','estado_postulacion','Observacion'];	


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;      
  constructor(        private rutaActiva: ActivatedRoute,
        private router:Router,
        private beneficiarioService:BeneficiariosService
        , private excelService: ExporterService) {
  	    this.idConvo = this.rutaActiva.snapshot.params.idConvo;
  	    this.getBeneficiarios();
         }

  ngOnInit(): void {
  }

  getBeneficiarios(){
  	this.beneficiarioService.getBeneficiariosIdConvo(this.idConvo).subscribe(result=>{
  		this.beneficiarioListado = result;
  		this.dataSource = new MatTableDataSource(this.beneficiarioListado);
	    this.dataSource.paginator = this.paginator;
	    this.dataSource.sort = this.sort;
	    this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";    
  	},(err)=>{
  		console.log(err.error.text);
  	});
  }

  exportAsXLSX():void {
    this.excelService.exportToExcel(this.beneficiarioListado,'ReporteConvocatorias');
  }
  applyExportarFiltrado() {
    this.excelService.exportToExcel(this.dataSource.filteredData, "ConvocatoriasLista");
  /*const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();*/
  }
  applyFilter(event){
    this.dataSource.filter = event.trim().toLowerCase();
  }

}
