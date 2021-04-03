import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ListconvoactivasService {


  url='http://localhost/sigbeweb/'; // disponer url de su servidor que tiene las páginas PHP



  constructor(private http: HttpClient) { }

  buscarConvoActivas(){
    return this.http.get(`${this.url}app/componentes/convocatorias/list_convoactivas.php`);
  }
  actualizarConvosVencidas(datas:any){
		return this.http.put(`${this.url}app/componentes/convocatorias/actualizarConvosVencidas.php`,{data: datas})
		.pipe(map((res)=>{
			return res;
		}));
	}
}
