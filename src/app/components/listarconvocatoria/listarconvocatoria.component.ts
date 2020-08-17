import { Component, OnInit } from '@angular/core';
import {ServiciolistarconvoService} from './serviciolistarconvo.service';

@Component({
  selector: 'app-listarconvocatoria',
  templateUrl: './listarconvocatoria.component.html',
  styleUrls: ['./listarconvocatoria.component.css']
})
export class ListarconvocatoriaComponent  {
  convocatorias:any;


  constructor(private listarservicio:ServiciolistarconvoService) { 
    this.buscarconvocatorias();
  }

  buscarconvocatorias(){
   this.listarservicio.buscarConvocatorias().subscribe(res=>{
    this.convocatorias=res;
   })

  }

}
