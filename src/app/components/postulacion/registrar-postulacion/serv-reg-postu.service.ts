import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServRegPostuService {

  url=environment.URL_LOCAL; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }

  registrarPostulacion(arregloPostu:any){
  	return this.http.post(`${this.url}/app/componentes/postulacion/createpostulacion.php`,{data: arregloPostu})
  	.pipe(map((res)=>{
  	return arregloPostu;
  	}));
  }

  buscarPostuByIdConvo(idconvo:any,identi:any){
  	return this.http.get(`${this.url}/app/componentes/postulacion/postulacionbyidconvo.php?idconvo=${idconvo}&iduser=${identi}`);
  
  }
}
