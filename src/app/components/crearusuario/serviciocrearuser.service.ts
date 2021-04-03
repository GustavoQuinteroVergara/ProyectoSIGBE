import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiciocrearuserService {

  url='http://localhost/sigbeweb/app/componentes/usuarios/create_user.php';
  url2='http://localhost/SIGBEWEB/app/componentes/ubicacion/buscardepartamentos.php'
  url3='http://localhost/SIGBEWEB/app/componentes/ubicacion/buscarciudades.php';
  url4= 'http://localhost/SIGBEWEB/app/componentes/ubicacion/carreras.php';
  url5= 'http://localhost/SIGBEWEB/app/componentes/roles/list_roles.php';
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
