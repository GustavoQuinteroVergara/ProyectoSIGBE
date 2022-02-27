import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environment';
@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  urlBuscarUser=environment.URL_LOCAL+'/app/componentes/usuarios/buscar_user.php?';
  URL = environment.URL_LOCAL+"/app/componentes/subirarchivo";

  constructor(private http: HttpClient) { }

  uploadFile(archivo) {
    return this.http.post(`${this.URL}/subirPDF.php`, JSON.stringify(archivo));
  }
  buscarUser(codigoestudiante:any){
    return this.http.get(`${this.urlBuscarUser}codigoestudiante=${codigoestudiante}`);
  }
}