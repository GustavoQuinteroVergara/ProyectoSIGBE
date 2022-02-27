import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../../environment';
@Injectable({
  providedIn: 'root'
})
export class BeneficiariosService {

	url=environment.URL_LOCAL;

  constructor(private http: HttpClient) { }


  getBeneficiariosIdConvo(idconvo:any){
  	return this.http.get(`${this.url}/app/componentes/beneficiarios/listarBeneficiarios.php?idconvo=${idconvo}`);
  }
}
