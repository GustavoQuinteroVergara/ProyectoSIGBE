import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

	url="http://localhost/sigbeweb";

  constructor(private http: HttpClient) { }

  actualizarSaldo(usuarioArray:any){
  	return this.http.put(`${this.url}/app/componentes/usuarios/updateSaldo.php`,usuarioArray);
  }
}
