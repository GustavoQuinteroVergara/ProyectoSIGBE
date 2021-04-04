import { Component, OnInit, ViewChild } from '@angular/core';
import {ServiciolistarconvoService} from './serviciolistarconvo.service';
import {ExporterService} from '../../services/exporter.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listarconvocatoria',
  templateUrl: './listarconvocatoria.component.html',
  styleUrls: ['./listarconvocatoria.component.css']
})
export class ListarconvocatoriaComponent  {
  convocatorias:any;
  dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['fecha_inicio', 
    'fecha_fin', 'estado_convocatoria','beca','periodosacademicos', 
    'cupo','Acciones'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;  
  constructor(private listarservicio:ServiciolistarconvoService, private excelService: ExporterService) { 
    this.buscarconvocatorias();
  }

  buscarconvocatorias(){
   this.listarservicio.buscarConvocatorias().subscribe(res=>{
    this.convocatorias=res;
      this.dataSource = new MatTableDataSource(this.convocatorias);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";    
   })

  }
  exportAsXLSX():void {
    this.excelService.exportToExcel(this.convocatorias,'ReporteConvocatorias');
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
