import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class PostulacionService {

	url="http://localhost/sigbeweb";

	constructor(private http: HttpClient) { }

	postulacionBeneficiario(idUser:any,tipoticket:any){
		return this.http.get(`${this.url}/app/componentes/postulacion/postulacionbeneficario.php?iduser=${idUser}&tipoticket=${tipoticket}`);
	}

	actualizarPostulacion(postuArray:any){
		return this.http.put(`${this.url}/app/componentes/postulacion/actualizarPostulacion.php`,{data: postuArray})
		.pipe(map((res)=>{
			return postuArray;
		}));
	}
}
