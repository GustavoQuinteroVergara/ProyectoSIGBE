import { Component, OnInit,ViewChild } from '@angular/core';
import {ServicioshabilitarService } from './servicioshabilitar.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-habilitaruser',
  templateUrl: './habilitaruser.component.html',
  styleUrls: ['./habilitaruser.component.css']
})
export class HabilitaruserComponent  {

estudiante:any;
dataSource: MatTableDataSource<any>;
updateestudiante:any;
  displayedColumns: string[] = ['nombre', 
    'correo','estadouser'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort,{static: false}) sort: MatSort;
  constructor(private serviciohabilitar:ServicioshabilitarService) {
    this.buscarEstudiantes();
   }

buscarEstudiantes(){
  this.serviciohabilitar.buscarUser()
  .subscribe(result=>{
   this.estudiante=result; 
      this.dataSource = new MatTableDataSource(this.estudiante);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";   
  
  });
}

  applyFilter(event){
    this.dataSource.filter = event.trim().toLowerCase();
  }

updateuser(identificacion:any,estadoseleccionado:any){

  if(estadoseleccionado == true){
      this.updateestudiante={
        identificacion:identificacion,
        estadouser:'Inactivo'

      };
      this.serviciohabilitar.updateuser(this.updateestudiante)
      .subscribe(res=>{
        this.buscarEstudiantes();
        console.log(this.estudiante[0]);
        this.estudiante[0].estadoestudiante = this.updateestudiante.estadouser.estadouser ? this.updateestudiante.estadouser.estadouser : this.updateestudiante.estadouser;
          Swal.fire({
                title: 'Exitoso',
                text: 'Actualizado exitosamente.',
                icon: 'success'
          });        
      },(err)=>{
          Swal.fire({
                title: 'ERROR',
                text: 'Error al actualizar.' + err.error.text,
                icon: 'error'
          });  
      });
  }
  if(estadoseleccionado == false){
    this.updateestudiante={
      identificacion:identificacion,
      estadouser:'Activo'

    };
    this.serviciohabilitar.updateuser(this.updateestudiante)
    .subscribe(res=>{
      this.buscarEstudiantes();
       this.estudiante[0].estadoestudiante = this.updateestudiante.estadouser ;
          Swal.fire({
                title: 'Exitoso',
                text: 'Actualizado exitosamente.',
                icon: 'success'
          }); 
      
    },(err)=>{
          Swal.fire({
                title: 'ERROR',
                text: 'Error al actualizar.' + err.error.text,
                icon: 'error'
          });  
      });


  }
}



}
