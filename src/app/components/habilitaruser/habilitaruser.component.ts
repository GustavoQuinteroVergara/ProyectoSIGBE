import { Component, OnInit } from '@angular/core';
import {ServicioshabilitarService } from './servicioshabilitar.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-habilitaruser',
  templateUrl: './habilitaruser.component.html',
  styleUrls: ['./habilitaruser.component.css']
})
export class HabilitaruserComponent  {

  constructor(private serviciohabilitar:ServicioshabilitarService) { }
estudiante:any;
updateestudiante:any;
buscarEstudiante(codigoestudiante:any){
  this.serviciohabilitar.buscarUser(codigoestudiante)
  .subscribe(result=>{
   console.log(result);
   this.estudiante=result; 
  
  });
  console.log(this.estudiante);
}

updateuser(identificacion:any,estadoseleccionado:any){

  if(estadoseleccionado == true){
      this.updateestudiante={
        identificacion:identificacion,
        estadouser:'Inactivo'

      };
      this.serviciohabilitar.updateuser(this.updateestudiante)
      .subscribe(res=>{
        console.log(res);
        this.estudiante[0].estadoestudiante = this.updateestudiante.estadouser;
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
      console.log(res);
       this.estudiante[0].estadoestudiante = this.updateestudiante.estadouser;
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
