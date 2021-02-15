import { Component, OnInit } from '@angular/core';
import {ServiciolistarconvoService} from './serviciolistarconvo.service';
import {ExporterService} from '../../services/exporter.service';
@Component({
  selector: 'app-listarconvocatoria',
  templateUrl: './listarconvocatoria.component.html',
  styleUrls: ['./listarconvocatoria.component.css']
})
export class ListarconvocatoriaComponent  {
  convocatorias:any;


  constructor(private listarservicio:ServiciolistarconvoService, private excelService: ExporterService) { 
    this.buscarconvocatorias();
  }

  buscarconvocatorias(){
   this.listarservicio.buscarConvocatorias().subscribe(res=>{
    this.convocatorias=res;
   })

  }
  exportAsXLSX():void {
    this.excelService.exportToExcel(this.convocatorias,'ReporteConvocatorias');
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.convocatorias.filter = filterValue.trim().toLowerCase();
  }
}
