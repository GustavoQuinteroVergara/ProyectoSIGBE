import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServRegPostuService {

  url='http://localhost/sigbeweb/app/componentes/postulacion/createpostulacion.php'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }

  registrarPostulacion(arregloPostu:any){
  	return this.http.post(`${this.url}`,{data: arregloPostu})
  	.pipe(map((res)=>{
  	return arregloPostu;
  	}));
  }
}
