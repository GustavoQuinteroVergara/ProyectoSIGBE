import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ServicesViewConvocatoriaService {
  url="http://localhost/sigbeweb/app/componentes/postulacion/listarpostubyid.php?";
  urlConvoById="http://localhost/sigbeweb/app/componentes/convocatorias/list_convobyid.php?";
  urlUpdateConvo="http://localhost/sigbeweb/app/componentes/convocatorias/actualizar_convocatoria.php";
  urlConvoCupos ="http://localhost/sigbeweb/app/componentes/convocatorias/updateCuposConvo.php";
  urlPostuEstado ="http://localhost/sigbeweb/app/componentes/postulacion/updateEstadoPostu.php";

  constructor(private http: HttpClient) { }

  buscarPostulacionesByIdConvo(idconvo:any){
    return this.http.get(`${this.url}idconvo=${idconvo}`);
  }

  buscarConvoById(idconvo:any){
    return this.http.get(`${this.urlConvoById}idconvo=${idconvo}`); 
  }

  actualizarListConvocatorias(actualizarConvo:Array<any>){
    return this.http.post(`${this.urlUpdateConvo}`,{data: actualizarConvo}).
    pipe(map((res)=>{
      return  actualizarConvo;
    }));
  }

  actualizarEstadoPostulacion(postuUpdate:Array<any>){
        return this.http.post(`${this.urlPostuEstado}`,{data: postuUpdate}).
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
