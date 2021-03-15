import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariocarreraService {

	url="http://localhost/sigbeweb";

  constructor(private http: HttpClient) { }

  	carrerasEst(iduser:any){
		return this.http.get(`${this.url}/app/componentes/usuarios/carrerasest.php?identificacion=${iduser}`);
	}
	agregarCarreraEst(carreraArray:any){
		return this.http.post(`${this.url}/app/componentes/usuarios/agregarcarreraest.php`,{data: carreraArray})
		.pipe(map((res)=>{
			return carreraArray;
		}));
	}
	getCarreras(){
		return this.http.get(`${this.url}/app/componentes/usuarios/getcarreras.php`);
	}

	foundCarreraByIdenCarr(iden:any,carr:any){
		return this.http.get(`${this.url}/app/componentes/usuarios/usuariocarrerabyiduser.php?iduser=${iden}&idcarr=${carr}`);
	}
}
