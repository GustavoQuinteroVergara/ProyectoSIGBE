import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrarConvoServiceService {
  urlList=environment.URL_LOCAL+'/app/componentes/convocatorias/list_becaConvocatoria.php'; // disponer url de su servidor que tiene las páginas PHP
  urlListPeriodos=environment.URL_LOCAL+'/app/componentes/periodosacademicos/list_periodosacademicos.php';
  urlCreate =environment.URL_LOCAL+'/app/componentes/convocatorias/create_convocatoria.php';
  urlConvocatorias=environment.URL_LOCAL+"/app/componentes/convocatorias/list_convocreadas.php?";
  constructor(private http: HttpClient) { }
 
  registrarConvocatoria(registroConvo:any){
    return this.http.post(`${this.urlCreate}`,registroConvo).
    pipe(map((res)=>{
      return  registroConvo
    }));
  }
  buscarListadoBecas(){
    return this.http.get(`${this.urlList}`);
  }
  buscarListadoPeriodos(){
    return this.http.get(`${this.urlListPeriodos}`);
  }
  buscarListadoConvocatorias(idperiodo:any,idbeca:any){
    return this.http.get(`${this.urlConvocatorias}idperiodo=${idperiodo}&idbeca=${idbeca}`);
  }

}
