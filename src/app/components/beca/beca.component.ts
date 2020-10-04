import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BecaService } from './beca.service';

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
  registrarBeca(consecutivo_TipoBeca:any,descripcion:any,templateRef){
    this.becaRegistrar= {tipobeca:consecutivo_TipoBeca,
      descripcion:descripcion
    };
    this.serviceBeca.registrarBecas(this.becaRegistrar).subscribe(res =>{
      this.success = true;
      let dialogRef = this.dialog.open( templateRef,{
         height: '200px',
         width: '200px',
       });

      console.log(res);
  
  
      },(err)=>{
        this.success = false;
        let dialogRef = this.dialog.open( templateRef,{
           height: '200px',
           width: '200px',
         });
  
         console.log('ERROR: ' + err.error.text);
      });
    console.log(this.becaRegistrar);
     
     }
  
  }
  
