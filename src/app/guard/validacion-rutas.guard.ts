import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidacionRutasGuard implements CanActivate {
  $nombreusuario:any;
  textoseparado:any;
  constructor(private router:Router){}
  
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    this.textoseparado = expectedRole.split("|");
    this.$nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
    for (var i = 0; i < this.textoseparado.length; ++i) {
      if(this.$nombreusuario != null){
        if(this.$nombreusuario.rol != this.textoseparado[i] ){
          if(i == this.textoseparado.length-1){this.router.navigate(['/bienvenida']);return false;}
        }else{
          return true;
        }  
      }else{
          this.router.navigate(['/']);
          return false;
      }
    }

  
   /* if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }*/
    
  }
  
  
}
