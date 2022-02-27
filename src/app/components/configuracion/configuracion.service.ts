import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environment';

@Injectable({
	providedIn: 'root'
})
export class ConfiguracionService {
	urlUpdate=environment.URL_LOCAL+'/app/componentes/configuracion';
	constructor(private http: HttpClient) { }

	modificarConfiguración(modificarConfig:Array<any>){
		return this.http.put(`${this.urlUpdate}/modificarConfiguracion.php`,{data: modificarConfig}).
		pipe(map((res)=>{
			return  modificarConfig
		}));
	}
	listarConfiguracion(){
		return this.http.get(`${this.urlUpdate}/listarConfiguracion.php`);
	}
}
