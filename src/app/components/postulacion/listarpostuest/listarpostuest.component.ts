import { Component, OnInit,ViewChild } from '@angular/core';
import {ServiceListarPostuEstService} from './service-listar-postu-est.service';
import {PostulacionService} from '../../../services/postulacion.service';
import { MatSnackBar} from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators} from '@angular/forms'; 
import {DocumentoService} from '../../../services/documento.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-listarpostuest',
  templateUrl: './listarpostuest.component.html',
  styleUrls: ['./listarpostuest.component.css']
})
export class ListarpostuestComponent {
	userToken= JSON.parse(localStorage.getItem('currentUser'));
	postusBuscadas:any;
  postuSeleccionada:any;
  documentosFoundpostu:any;
  activarUpdate = false;
  myForm: FormGroup;
  listActualizarPostu:any;
  success=false;
  intentosPermitidos=false;
    dataSource: MatTableDataSource<any>;
    displayedColumns: string[] = ['nombreestudiante', 
    'estrato', 'promedio', 
    'fechapostulacion','estado_postulacion','semestre','Acciones'];

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort,{static: false}) sort: MatSort;
  constructor(private serviceListarPostuEst:ServiceListarPostuEstService,
    private postuservice:PostulacionService,
    public snackBack: MatSnackBar,
    public fb: FormBuilder,
    public dialog: MatDialog,
    public documentoServicie:DocumentoService) { 
	this.buscarPostusEst();

  }

  abrirPostu(templateRef,postu:any){
    this.postuSeleccionada = postu;
    this.getDocumntosPostu(postu.consecutivo_postulacion);
    this.myForm = this.fb.group({
      promedio: [this.postuSeleccionada.promedio, [Validators.required]],
      semestre: [this.postuSeleccionada.semestre, [Validators.required]],
      estrato: [this.postuSeleccionada.estrato, [Validators.required]]
    });
  	    let dialogRef = this.dialog.open( templateRef,{
         panelClass: 'app-full-bleed-dialog', 
         height: '600px',
         width: '900px',
       });
  }


  getDocumntosPostu(idPostu:any){
    this.documentoServicie.getDocumentsPostu(idPostu).subscribe(result=>{
        this.documentosFoundpostu = result;
    });
  }
  downloadPDF(docsel:any,nombrefile:any){
    var obj = document.createElement('a'); 
    obj.type = 'application/pdf';
    obj.href = 'data:application/pdf;base64,' + docsel;
    obj.download = nombrefile+ ".pdf";
    obj.click();
  }



  activarActualizar(){
    if(!this.activarUpdate){
      this.activarUpdate = true;
      this.myForm.controls['promedio'].reset({ value: '', disabled: false });
    }else{
      this.activarUpdate = false;
      this.myForm.controls['promedio'].reset({ value: this.postuSeleccionada.promedio, disabled: true });
    }
  }

    promedioMessage(promediosel:any){
    if(promediosel < 3.0){
      this.snackBack.open('El promedio seleccionado no es el recomendado.','Aceptar',{
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['redNoMatch']
      });
    }
  }

  actualizarPostu(semestre:any,promedio:any){
    if(this.postuSeleccionada.cantmodificaciones <= 2){
      this.postuSeleccionada.cantmodificaciones++;
      this.listActualizarPostu = {
        idpostu: this.postuSeleccionada.consecutivo_postulacion,
        semestre:semestre,
        promedio:promedio,
        cantmodificaciones:this.postuSeleccionada.cantmodificaciones
    }
    console.log(this.listActualizarPostu);
    this.postuservice.actualizarPostulacion(this.listActualizarPostu).subscribe(result=>{
          Swal.fire({
            title: 'Exitoso',
            text: 'Actualizado exitosamente.',
            icon: 'success'
          }); 
    },(err)=>{

      Swal.fire({
        title: 'ERROR',
        text: 'Error al actualizar, se han alcazado el límite de intentos.',
        icon: 'error'
      }); 
    });
    }else{
      Swal.fire({
        title: 'ERROR',
        text: 'Error, ya has llegado al límite de actualizaciones',
        icon: 'error'
      }); 
    }
  }

  buscarPostusEst(){
	  this.serviceListarPostuEst.buscarPostuByIdenti(this.userToken.identi).subscribe(result =>{ 
	  	this.postusBuscadas = result;
        this.dataSource = new MatTableDataSource(this.postusBuscadas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator._intl.itemsPerPageLabel = "Cantidad por paginas";
	  });
  }

}
