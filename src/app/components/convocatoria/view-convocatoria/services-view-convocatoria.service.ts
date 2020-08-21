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
      return  actualizarConvo
    }));
  }
}
