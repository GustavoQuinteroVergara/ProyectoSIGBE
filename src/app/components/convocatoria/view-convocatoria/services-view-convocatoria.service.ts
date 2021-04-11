import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicesViewConvocatoriaService {
  url="http://localhost/sigbeweb/app/componentes/postulacion/listarpostubyid.php?";
  url2="http://localhost/sigbeweb/app/componentes/postulacion/listpostubypsicologia.php?";
  urlpostubyid="http://localhost/sigbeweb/app/componentes/postulacion/postubyidpostu.php";
  urlbeneficiopostu = "http://localhost/sigbeweb/app/componentes/beneficarios/listBeneficioByPostu.php";
  urlimagespostu="http://localhost/sigbeweb/app/componentes/postulacion/updateImagenesPostu.php";
  urlConvoById="http://localhost/sigbeweb/app/componentes/convocatorias/list_convobyid.php?";
  urlUpdateConvo="http://localhost/sigbeweb/app/componentes/convocatorias/actualizar_convocatoria.php";
  urlConvoCupos ="http://localhost/sigbeweb/app/componentes/convocatorias/updateCuposConvo.php";
  urlPostuEstado ="http://localhost/sigbeweb/app/componentes/postulacion/updateEstadoPostu.php";
  urlEstadoPromedio = "http://localhost/sigbeweb/app/componentes/postulacion/updateEstadoPromedio.php";
  urlInfoGenPostu = "http://localhost/sigbeweb/app/componentes/informaciongeneral/listarinformaciongeneral.php?";

  constructor(private http: HttpClient) { }

  buscarPostulacionesByIdConvo(idconvo:any){
    return this.http.get(`${this.url}idconvo=${idconvo}`);
  }
    buscarPostulacionesByPsicologia(idconvo:any){
    return this.http.get(`${this.url2}idconvo=${idconvo}`);
  }
  buscarEntrevistaPostu(idpostu:any){
    return this.http.get(`${this.urlInfoGenPostu}idpostu=${idpostu}`);
  }

  buscarConvoById(idconvo:any){
    return this.http.get(`${this.urlConvoById}idconvo=${idconvo}`); 
  }

  getBeneficiario(idconvo:any,idpostu:any){
    return this.http.get(`${this.urlConvoById}idconvo=${idconvo}`); 
  }

  getPostuById(idpostu:any){
    return this.http.get(`${this.urlpostubyid}?idpostu=${idpostu}`); 
  }

  actualizarListConvocatorias(actualizarConvo:Array<any>){
    return this.http.post(`${this.urlUpdateConvo}`,{data: actualizarConvo}).
    pipe(map((res)=>{
      return  actualizarConvo;
    }));
  }

  actualizarEstadoPromedio(valsel:any){
    return this.http.post(`${this.urlEstadoPromedio}`,valsel).
    pipe(map((res)=>{
      return  valsel;
    }));
  }

  actualizarEstadoPostulacion(postuUpdate:Array<any>){
        return this.http.post(`${this.urlPostuEstado}`,{data: postuUpdate}).
    pipe(map((res)=>{
      return  postuUpdate;
    }));
  }
   actualizarImagesostulacion(postuUpdate:any){
        return this.http.post(`${this.urlimagespostu}`,{data: postuUpdate}).
    pipe(map((res)=>{
      return  postuUpdate;
    }));
  }
    actualizarCuposConvo(convoCuposUpdate:Array<any>){
        return this.http.post(`${this.urlConvoCupos}`,{data: convoCuposUpdate}).
    pipe(map((res)=>{
      return  convoCuposUpdate;
    }));
  }
}
