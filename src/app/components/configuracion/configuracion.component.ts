import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ConfiguracionService} from '../configuracion/configuracion.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
  modificarConfig:any[]=[];
  archivoModificado:any;
  options:any[]=[];
  configuracionlist:any;
  selection:Number;
  showvalor:boolean=false;
  showfecha:boolean=false;
  date:any;
  success:any;
  public formPrecios: FormGroup;
  constructor(private servicioConfiguracion:ConfiguracionService, public dialog: MatDialog) {
    this.getConfiguracion();

  }
  ngOnInit(): void {
    this.options=[
      {id:0,name:"Precio Almuerzo"},
      {id:1,name:"Precio Refrigerio"},
      {id:6,name:"Precio Almuerzo Beneficiario"},
      {id:7,name:"Precio Refrigerio Beneficiario"},
      {id:2,name:"Hora inicio almuerzo "},
      {id:3,name:"Hora fin almuerzo "},
      {id:4,name:"Hora inicio refrigerio "},
      {id:5,name:"Hora fin refrigerio "}
    ];

    this.formPrecios = new FormGroup({
      precios: new FormControl('',[Validators.required]),
    });
  }
  public hasError = (controlName: string, errorName: string) =>{
    return this.formPrecios.controls[controlName].hasError(errorName);
  }

  getConfiguracion(){
    this.servicioConfiguracion.listarConfiguracion().subscribe(result=>{
      this.configuracionlist = result;
    });
  }
  opcionSeleccionada(val:any){
    if (val==0 || val==1 || val==6 || val == 7) {
      this.showvalor= true;
      this.showfecha = false;
    }else{
      this.showvalor= false;
      this.showfecha = true;
    }
  }
  actualizarConfiguracion(variable:any,valorNuevo:any){
    this.archivoModificado= {
      variable:variable,
      valorNuevo:valorNuevo
    };
    this.servicioConfiguracion.modificarConfiguración(this.archivoModificado).subscribe
    (res=>{
      this.getConfiguracion();
        Swal.fire({
          title: 'Exitoso',
          text: 'Actualizado exitosamente.',
          icon: 'success'
        });
     },(err)=>{
        Swal.fire({
          title: 'ERROR',
          text: 'Error al actualizar.',
          icon: 'error'
        });
    });
  
  }
  onChange(event) {
    if (this.selection === event) return;
    this.selection = event;
    console.log(this.selection);
  }
}

  