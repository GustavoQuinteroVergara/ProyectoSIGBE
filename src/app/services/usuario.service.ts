import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

	url=environment.URL_LOCAL;

  constructor(private http: HttpClient) { }

  actualizarSaldo(usuarioArray:any){
  	return this.http.put(`${this.url}/app/componentes/usuarios/updateSaldo.php`,usuarioArray);
  }

  olvideContrasena(email:any){
  	return this.http.put(`${this.url}/app/componentes/usuarios/olvidarcontrasena.php`,email);
  }
}
