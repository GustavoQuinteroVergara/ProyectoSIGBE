import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostulacionService {

	url="http://localhost/sigbeweb";

  constructor(private http: HttpClient) { }

  actualizarPostulacion(postuArray:any){
  	return this.http.put(`${this.url}/app/componentes/postulacion/actualizarPostulacion.php`,{data: postuArray})
  	.pipe(map((res)=>{
  	return postuArray;
  	}));
  }
}
