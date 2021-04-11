import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
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
  comprobarImagen:any;
  widthimagesel:any;
  heightimagesel:any;
  valImagen=false;
	archivo = {
	    nombre: null,
	    nombreArchivo: null,
	    base64textString: null
	}

  @ViewChild('imagensel') imagesel: ElementRef;
  constructor(private anunciosservice:AnunciosService,private dialog:MatDialog) {
    this.getsAnuncios();
   }

  ngOnInit(): void {
  }

  
  seleccionarArchivo(event) {
      // console.log(this.widthimagesel);
      // console.log(this.heightimagesel);
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

  validarImagen(){
    this.valImagen = false;
    var width = (this.imagesel.nativeElement as HTMLImageElement).width;
    var height = (this.imagesel.nativeElement as HTMLImageElement).height;
    if(width != 1349 || height != 415){
      Swal.fire({
        title: 'ERROR',
        text: 'Por favor, suba una imagen de 1349 pixeles de ancho y 415 pixeles de alto' ,
        icon: 'error'
      });
      this.archivo.nombreArchivo = null;
      this.archivo.base64textString = null;
      this.imageseleccionada = "";
    }else{
      this.valImagen = true;
    }
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
    if(this.valImagen ){
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
    }else{
      Swal.fire({
        title: 'ERROR',
        text: 'Por favor, suba una imagen valida para los anuncios' ,
        icon: 'error'
      });
    }

  }

}
