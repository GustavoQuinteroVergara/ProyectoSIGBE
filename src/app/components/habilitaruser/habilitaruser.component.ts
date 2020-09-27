import { Component, OnInit } from '@angular/core';
import {ServicioshabilitarService } from './servicioshabilitar.service';
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

updateuser(codigoestudiante:any,estadoseleccionado:any){

  if(estadoseleccionado == true){
      this.updateestudiante={
        codigoestudiante:codigoestudiante,
        estadouser:'Inactivo'

      };
      this.serviciohabilitar.updateuser(this.updateestudiante)
      .subscribe(res=>{
        console.log(res);
        this.estudiante[0].estadoestudiante = this.updateestudiante.estadouser;

      });
  }
  if(estadoseleccionado == false){
    this.updateestudiante={
      codigoestudiante:codigoestudiante,
      estadouser:'Activo'

    };
    this.serviciohabilitar.updateuser(this.updateestudiante)
    .subscribe(res=>{
      console.log(res);
       this.estudiante[0].estadoestudiante = this.updateestudiante.estadouser;
       
      
    });


  }
}



}
