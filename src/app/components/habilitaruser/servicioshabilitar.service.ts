import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServicioshabilitarService {

  url='http://localhost/sigbeweb/app/componentes/usuarios/list_usuarios.php';
  url2='http://localhost/sigbeweb/app/componentes/usuarios/habilitar_user.php?';
  

  constructor(private http: HttpClient) { }

buscarUser(){
  return this.http.get(`${this.url}`);
}

updateuser(Actualizaruser:Array<any> ){
  return this.http.post(`${this.url2}`,{data: Actualizaruser}).
  pipe(map((res)=>{
    return  Actualizaruser;
  }));
}



}
