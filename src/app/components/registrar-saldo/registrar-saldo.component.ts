import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {RegistrarSaldoService} from './registrar-saldo.service';
@Component({
  selector: 'app-registrar-saldo',
  templateUrl: './registrar-saldo.component.html',
  styleUrls: ['./registrar-saldo.component.css']
})
export class RegistrarSaldoComponent implements OnInit {
  estudiante:any;
  saldoRegistrado:any;
  nuevoSaldo:any;
  saldo:any;
  success:any;
  constructor(private registrarSaldo: RegistrarSaldoService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  buscarEstudiante(codigoestudiante:any){

    this.registrarSaldo.buscarUser(codigoestudiante)
    .subscribe(result=>{
     console.log('Resultado: ' + result);
     this.estudiante=result; 
    });
    console.log('estudiante: '+ this.estudiante);
  }

  actualizarSaldo(nuevoSaldo:any,templateRef){
    this.estudiante[0].saldo = parseInt(this.saldo=this.estudiante[0].saldo) + parseInt(nuevoSaldo);
    this.saldoRegistrado= {
      saldo : this.estudiante[0].saldo,
      codigoestudiante:this.estudiante[0].codigoestudiante,
    };
    this.registrarSaldo.registrarSaldos(this.saldoRegistrado).subscribe
    (res=>{
      this.success = true;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       })
    },(err)=>{
      //console.log('ERROR: ' + err.error.text);
      this.success = false;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       });
    });
    console.log(this.saldoRegistrado);
  
  }
}
