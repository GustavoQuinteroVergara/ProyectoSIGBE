import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BecaService } from './beca.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-beca',
  templateUrl: './beca.component.html',
  styleUrls: ['./beca.component.css']
})
export class BecaComponent implements OnInit  {
  becaRegistrar:any;
  ListTBeca: any;
  success:any;
  public formularioBeca: FormGroup;
  constructor(private serviceBeca:BecaService,public dialog: MatDialog) { 
    this.buscarTipoBeca();
  }
  ngOnInit(): void {
    this.formularioBeca = new FormGroup({
      nombreTipoBeca: new FormControl('',Validators.required),
      descripcionBeca: new FormControl('',Validators.required),
    });
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.formularioBeca.controls[controlName].hasError(errorName);
  }
  buscarTipoBeca(){
    this.serviceBeca.buscarListadoTBecas().subscribe(ListTBeca=>{
      console.log(ListTBeca);
      this.ListTBeca = ListTBeca;
    });
  }
  registrarBeca(consecutivo_TipoBeca:any,descripcion:any){
    this.becaRegistrar= {tipobeca:consecutivo_TipoBeca,
      descripcion:descripcion
    };
    this.serviceBeca.registrarBecas(this.becaRegistrar).subscribe(res =>{
          Swal.fire({
            title: 'Exitoso',
            text: 'Registrado exitosamente.',
            icon: 'success'
          });  
  
      },(err)=>{
          Swal.fire({
            title: 'ERROR',
            text: 'Error al registrar, ERROR: ' + err.error.text,
            icon: 'success'
          });  

      });
     
     }
  
  }
  
