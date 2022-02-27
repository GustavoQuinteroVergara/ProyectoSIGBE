import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environment';

@Injectable({
  providedIn: 'root'
})
export class AnunciosService {

	url = environment.URL_LOCAL;

  constructor(private http: HttpClient) { }

  	registrarAsignacionCupos(registroAnun:Array<any>){
		return this.http.post(`${this.url}/app/componentes/anuncios/createanuncio.php`,{data: registroAnun}).
		pipe(map((res)=>{
			return  registroAnun
		}));
	}

	getsPeriodosUlt(){
    return this.http.get(`${this.url}/app/componentes/anuncios/listultanuncios.php`);
	}
}
