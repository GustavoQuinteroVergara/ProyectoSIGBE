import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServRegPostuService {

  url='http://localhost/sigbeweb/'; // disponer url de su servidor que tiene las páginas PHP

  constructor(private http: HttpClient) { }

  registrarPostulacion(arregloPostu:any){
  	return this.http.post(`${this.url}app/componentes/postulacion/createpostulacion.php`,{data: arregloPostu})
  	.pipe(map((res)=>{
  	return arregloPostu;
  	}));
  }

  buscarPostuByIdConvo(idconvo:any,identi:any){
  	return this.http.get(`${this.url}app/componentes/postulacion/postulacionbyidconvo.php?idconvo=${idconvo}&iduser=${identi}`);
  
  }
}
