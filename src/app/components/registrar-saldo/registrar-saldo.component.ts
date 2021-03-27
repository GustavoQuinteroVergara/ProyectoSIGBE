import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {RegistrarSaldoService} from './registrar-saldo.service';
import { FileuploadService } from '../../services/fileupload.service';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-registrar-saldo',
  templateUrl: './registrar-saldo.component.html',
  styleUrls: ['./registrar-saldo.component.css']
})
export class RegistrarSaldoComponent implements OnInit {
  formulariologin:FormGroup;
  estudiante:any;
  saldoRegistrado:any;
  nuevoSaldo:any;
  saldo:any;
  success:any;
  archivo = {
    nombre: null,
    nombreArchivo: null,
    base64textString: null
  }
  constructor(private registrarSaldo: RegistrarSaldoService, public dialog: MatDialog,private uploadService: FileuploadService) { }

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
  seleccionarArchivo(event) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  upload() {
    console.log(this.archivo);
    this.uploadService.uploadFile(this.archivo).subscribe(
      datos => {
        if(datos['resultado'] == 'OK') {
          alert(datos['mensaje']);
        }
      }
    );
  }
   saveData(){
console.log(this.formulariologin.value);
   }

   showPDF(){
    const linkSource = 'data:application/pdf;base64,' + this.estudiante[0].pdf ;
      const downloadLink = document.createElement("a");
      const fileName = "sample.pdf";
  
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
}
