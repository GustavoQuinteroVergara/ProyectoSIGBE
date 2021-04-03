import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {

	url="http://localhost/sigbeweb";

  constructor(private http: HttpClient) { }

    encuestaUser(iduser:any,idperiodo:any){
		return this.http.get(`${this.url}/app/componentes/encuesta/listEncuestaUserPeriodo.php?idperiodo=${idperiodo}&iduser=${iduser}`);
	}

	agregarEncuesta(encuesta:any){
		return this.http.post(`${this.url}/app/componentes/encuesta/crearEncuesta.php`,{data: encuesta})
		.pipe(map((res)=>{
			return encuesta;
		}));
	}

	getEncuestas(){
		return this.http.get(`${this.url}/app/componentes/encuesta/getEncuestas.php`);
	}

	getInformes(opcion:any){
		return this.http.get(`${this.url}/app/componentes/encuesta/getInformeEncuestas.php?idperiodosel=${opcion}`);	
	}
}
