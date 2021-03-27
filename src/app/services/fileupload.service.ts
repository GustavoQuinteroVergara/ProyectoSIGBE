import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {
  urlBuscarUser='http://localhost/sigbeweb/app/componentes/usuarios/buscar_user.php?';
  URL = "http://localhost/sigbeweb/app/componentes/subirarchivo";

  constructor(private http: HttpClient) { }

  uploadFile(archivo) {
    return this.http.post(`${this.URL}/subirPDF.php`, JSON.stringify(archivo));
  }
  buscarUser(codigoestudiante:any){
    return this.http.get(`${this.urlBuscarUser}codigoestudiante=${codigoestudiante}`);
  }
}