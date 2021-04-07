import { Component, OnInit } from '@angular/core';
import {AnunciosService} from '../../services/anuncios.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-crearanuncio',
  templateUrl: './crearanuncio.component.html',
  styleUrls: ['./crearanuncio.component.css']
})
export class CrearanuncioComponent implements OnInit {

	imageseleccionada = '';
  infoAnuncio:any;
  anunciosActual:any;
  cantAnuncios=0;

	archivo = {
	    nombre: null,
	    nombreArchivo: null,
	    base64textString: null
	}

  constructor(private anunciosservice:AnunciosService,private dialog:MatDialog) {
    this.getsAnuncios();
   }

  ngOnInit(): void {
  }

    seleccionarArchivo(event) {
    var files = event.target.files;
    var file = files[0];
    this.archivo.nombreArchivo = file.name;
    this.imageseleccionada = file.name;

    if(files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  abrirRecomendaciones(recomendaciones){
    let dialogRef = this.dialog.open( recomendaciones,{
      height: '600px',
      width: '700px'
    });
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  getsAnuncios(){
    this.anunciosservice.getsPeriodosUlt().subscribe(result=>{
          this.anunciosActual = result;
          this.cantAnuncios = this.anunciosActual.length;
        if(this.anunciosActual.length == 0){
          this.anunciosActual = null;
        }
        
    });
  }

  registrarAnuncio(linkimagen:any){
    this.infoAnuncio = {
      img:this.archivo.base64textString,
      link:linkimagen
    };
    this.anunciosservice.registrarAsignacionCupos(this.infoAnuncio).subscribe(result=>{
      this.getsAnuncios();
      Swal.fire({
        title: 'Exitoso',
        text: 'Anuncio registrado exitosamente',
        icon: 'success'
      });
    },(err)=>{
      Swal.fire({
        title: 'ERROR',
        text: 'Error al registrar el anuncio, ERROR: ' + err.error.text,
        icon: 'error'
      });
    });
  }

}
