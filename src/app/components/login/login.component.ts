import { Component, OnInit } from '@angular/core';

import {formatDate } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ServiceloginService} from './servicelogin.service';
import {PeriodoServiceService} from '../../services/periodo-service.service';
import {Router } from '@angular/router';

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

  login(email:string, contrasena:string,periodocaducado,correonoencontrado,errorcontrasenainvl){
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
          let dialogRef = this.dialog.open( errorcontrasenainvl,{
            height: '200px',
            width: '350px',
          });
        }
        this.usuario = resultuser; 
      }else{

        this.periodoService.ultimoPeriodoRegistrado().subscribe(result =>{

          this.fechaultperiodo = formatDate(result['fechafinal']['date'], 'yyyy-MM-dd', 'en');
          console.log(this.fechaultperiodo);

          if(this.fechaultperiodo < this.fechaActual2){
            let dialogRef = this.dialog.open( periodocaducado,{
              height: '200px',
              width: '350px',
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
              console.log(this.usuario);
              let dialogRef = this.dialog.open( errorcontrasenainvl,{
                height: '200px',
                width: '350px',
              });

            }
            this.usuario = resultuser; 
          }

        },(err)=>{
          let dialogRef = this.dialog.open( periodocaducado,{
            height: '200px',
            width: '350px',
          });
        })


      }
    },(error)=>{
      console.log(error);
      let dialogRef = this.dialog.open( correonoencontrado,{
        height: '200px',
        width: '350px',
      });
    });

  }

  logout(){
   localStorage.removeItem('currentUser');
 }
}
