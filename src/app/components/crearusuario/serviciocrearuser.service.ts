import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServiciocrearuserService {

  url=environment.URL_LOCAL+'/app/componentes/usuarios/create_user.php';
  url2=environment.URL_LOCAL+'/app/componentes/ubicacion/buscardepartamentos.php'
  url3=environment.URL_LOCAL+'/app/componentes/ubicacion/buscarciudades.php';
  url4= environment.URL_LOCAL+'/app/componentes/ubicacion/carreras.php';
  url5= environment.URL_LOCAL+'/app/componentes/roles/list_roles.php';
  constructor(private http: HttpClient) { }

  registrarUsuario(arreglousu:any){
  	return this.http.post(`${this.url}`,{data: arreglousu})
  	.pipe(map((res)=>{
  	return arreglousu;
  	}));
  }

buscardepartamento(){
 return this.http.get(`${this.url2}`);
}
buscarroles(){
  return this.http.get(`${this.url5}`);
 }
buscarCiudad(arreglodepar:any){
return this.http.post(`${this.url3}`,{data: arreglodepar});
}
  
buscarCarrera(){
  return this.http.get(`${this.url4}`);
}

}
