import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environment';
@Injectable({
	providedIn: 'root'
})
export class CuposasignacionService {
	urlCreateAsign =environment.URL_LOCAL+'/app/componentes/cupostickets';
	constructor(private http: HttpClient) { }

	registrarAsignacionCupos(registroAsign:Array<any>){
		return this.http.post(`${this.urlCreateAsign}/crearasignacion.php`,{data: registroAsign}).
		pipe(map((res)=>{
			return  registroAsign
		}));
	}

	buscarAsignaciones(){
		return this.http.get(`${this.urlCreateAsign}/listarasignaciones.php`);
	}

	buscarAsignacionByFecha(fecha:any){
		return this.http.get(`${this.urlCreateAsign}/asignacionbyfecha.php?fecha=${fecha}`);
	}

	actualizarCupos(cuposArray:any){
		return this.http.put(`${this.urlCreateAsign}/actualizarcuposdisp.php`,{data: cuposArray});
	}
	actualizarAsignacion(cuposArray:any){
		return this.http.put(`${this.urlCreateAsign}/actualizarAsignacion.php`,{data: cuposArray});
	}	
}
