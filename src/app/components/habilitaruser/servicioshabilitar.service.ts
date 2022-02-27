import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ServicioshabilitarService {

  url=environment.URL_LOCAL+'/app/componentes/usuarios/list_usuarios.php';
  url2=environment.URL_LOCAL+'/app/componentes/usuarios/habilitar_user.php?';
  

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
