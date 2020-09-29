import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiciocrearuserService {

  url='http://localhost/sigbeweb/app/componentes/usuarios/create_user.php';

  constructor(private http: HttpClient) { }

  registrarUsuario(arreglousu:any){
  	return this.http.post(`${this.url}`,{data: arreglousu})
  	.pipe(map((res)=>{
  	return arreglousu;
  	}));
  }
}
