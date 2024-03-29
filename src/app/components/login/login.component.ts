import { Component, OnInit } from '@angular/core';

import {formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceloginService} from './servicelogin.service';
import {PeriodoServiceService} from '../../services/periodo-service.service';
import {Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario:any;
  fechaActual2= formatDate(new Date(), 'yyyy-MM-dd', 'en');
  fechaultperiodo:any;
  ruta:any;
  constructor(private logins:ServiceloginService,
    private periodoService:PeriodoServiceService,
    public dialog: MatDialog,
    private router:Router) {

  }

  login(email:string, contrasena:string){
    this.logins.buscarUser(email).subscribe(resultuser =>{ 

      if(resultuser['roles'] == 2){
        this.usuario = {'nombre':resultuser["nombre"],
        'apellido':resultuser["apellido"],
        'correo':resultuser["correo"],
        'identi':resultuser["identificacion"],
        'codigoest':resultuser["codigoestudiante"],
        'saldo':resultuser["saldo"],
        'rol':resultuser["roles"],
        'estadouser':resultuser["estadouser"]};
        if((resultuser["contrasena"] == contrasena) && (resultuser["estadouser"]=='Activo') ) {
          localStorage.setItem('currentUser',JSON.stringify(this.usuario));
          this.router.navigate(['/bienvenida']);
        }else{
          Swal.fire({
            title: 'ERROR!',
            text: 'Error contrasena invalida o usuario inactivo',
            icon: 'error'
          });
        }
        this.usuario = resultuser; 
      }else{

        this.periodoService.ultimoPeriodoRegistrado().subscribe(result =>{

          this.fechaultperiodo = formatDate(result['fechafinal']['date'], 'yyyy-MM-dd', 'en');
          if(this.fechaultperiodo < this.fechaActual2){
            Swal.fire({
                title: 'ERROR!',
                text: 'Lo siento, el periodo académico ha caducado',
                icon: 'error'
            });
          }else{
            this.usuario = {'nombre':resultuser["nombre"],
            'apellido':resultuser["apellido"],
            'correo':resultuser["correo"],
            'identi':resultuser["identificacion"],
            'codigoest':resultuser["codigoestudiante"],
            'saldo':resultuser["saldo"],
            'rol':resultuser["roles"],
            'estadouser':resultuser["estadouser"]};
            if((resultuser["contrasena"] == contrasena) && (resultuser["estadouser"]=='Activo') ) {
              localStorage.setItem('currentUser',JSON.stringify(this.usuario));
              this.router.navigate(['/bienvenida']);
            }else{
              Swal.fire({
                title: 'ERROR!',
                text: 'Error contrasena invalida o usuario inactivo',
                icon: 'error'
              });

            }
            this.usuario = resultuser; 
          }

        },(err)=>{
          Swal.fire({
                title: 'ERROR!',
                text: 'Lo siento, el periodo académico ha caducado',
                icon: 'error'
          });
        })


      }
    },(error)=>{
      Swal.fire({
                title: 'ERROR!',
                text: 'Lo siento, el correo que ha ingresado, no existe',
                icon: 'error'
      });
    });

  }

  logout(){
   localStorage.removeItem('currentUser');
 }
}
