import { Component, OnInit } from '@angular/core';

import {formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceloginService} from './servicelogin.service';
import {PeriodoServiceService} from '../../services/periodo-service.service';
import {ListconvoactivasService} from './../postulacion/registrar-postulacion/listconvoactivas.service';
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
    private listConvoActivas:ListconvoactivasService,
    public dialog: MatDialog,
    private router:Router) {

  }

    actualizarConvosVencidas(){

      this.listConvoActivas.actualizarConvosVencidas(1).subscribe(result=>{
          if(this.usuario.rol == 2){
          Swal.fire({
            title: 'Listo...',
            text: 'Se han cargado correctamente los datos.',
            icon: 'success'
          });
          console.log(result);
        }else{
          Swal.close();
        }
      },(err)=>{
        if(this.usuario.rol == 2){
          console.log(err);
        Swal.fire({
          title: 'Error...',
          text: 'Se han verificado las convocatorias y ha ocurrido un error.' + err,
          icon: 'error'
        });
      }else{
        Swal.close();
      }
      });
  }

  login(email:string, contrasena:string){
      Swal.fire({
        title: 'Cargando...',
        text: 'Verificando nuevos cambios.',
        allowOutsideClick: false,
      });
      Swal.showLoading();
    this.logins.buscarUser(email).subscribe(resultuser =>{ 

      if(resultuser['roles'] == 2){
        this.usuario = {'nombre':resultuser["nombre"],
        'apellido':resultuser["apellido"],
        'correo':resultuser["correo"],
        'identi':resultuser["identificacion"],
        'codigoest':resultuser["codigoestudiante"],
        'saldo':resultuser["saldo"],
        'rol':resultuser["roles"],
        'estadouser':resultuser["estadouser"],
        'contrasena':resultuser["contrasena"],
        'estrato':resultuser["estrato"],
        'zonaresidencial':resultuser["zonaresidencial"],      
        'direccion':resultuser["direccion"],
        'fechanacimiento':resultuser["fechanacimiento"],
        'estadosdatos':resultuser["estadodatos"]
      };
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
            'estadouser':resultuser["estadouser"],
            'contrasena':resultuser["contrasena"],
            'estrato':resultuser["estrato"],
            'zonaresidencial':resultuser["zonaresidencial"],
            'direccion':resultuser["direccion"],
            'fechanacimiento':resultuser["fechanacimiento"],
            'estadosdatos':resultuser["estadodatos"]
          };
            if((resultuser["contrasena"] == contrasena) && (resultuser["estadouser"]=='Activo') ) {
              this.actualizarConvosVencidas();
              Swal.close();
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
