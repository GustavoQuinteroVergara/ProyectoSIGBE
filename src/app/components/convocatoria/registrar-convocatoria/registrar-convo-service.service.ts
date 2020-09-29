import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegistrarConvoServiceService {
  urlList='http://localhost/sigbeweb/app/componentes/convocatorias/list_becaConvocatoria.php'; // disponer url de su servidor que tiene las páginas PHP
  urlListPeriodos='http://localhost/sigbeweb/app/componentes/periodosacademicos/list_periodosacademicos.php';
  urlCreate ='http://localhost/SIGBEWEB/app/componentes/convocatorias/create_convocatoria.php';
  constructor(private http: HttpClient) { }
 
  registrarConvocatoria(registroConvo:Array<any>){
    return this.http.post(`${this.urlCreate}`,{data: registroConvo}).
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
}
