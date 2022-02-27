import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environment';


@Injectable({
  providedIn: 'root'
})
export class ServicesViewConvocatoriaService {
  url=environment.URL_LOCAL+"/app/componentes/postulacion/listarpostubyid.php?";
  url2=environment.URL_LOCAL+"/app/componentes/postulacion/listpostubypsicologia.php?";
  urlpostubyid=environment.URL_LOCAL+"/app/componentes/postulacion/postubyidpostu.php";
  urlbeneficiopostu = environment.URL_LOCAL+"/app/componentes/beneficarios/listBeneficioByPostu.php";
  urlimagespostu=environment.URL_LOCAL+"/app/componentes/postulacion/updateImagenesPostu.php";
  urlConvoById=environment.URL_LOCAL+"/app/componentes/convocatorias/list_convobyid.php?";
  urlUpdateConvo=environment.URL_LOCAL+"/app/componentes/convocatorias/actualizar_convocatoria.php";
  urlConvoCupos =environment.URL_LOCAL+"/app/componentes/convocatorias/updateCuposConvo.php";
  urlPostuEstado =environment.URL_LOCAL+"/app/componentes/postulacion/updateEstadoPostu.php";
  urlEstadoPromedio = environment.URL_LOCAL+"/app/componentes/postulacion/updateEstadoPromedio.php";
  urlInfoGenPostu = environment.URL_LOCAL+"/app/componentes/informaciongeneral/listarinformaciongeneral.php?";

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
