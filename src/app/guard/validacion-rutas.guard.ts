import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidacionRutasGuard implements CanActivate {
  $nombreusuario:any;
  constructor(private router:Router){}
  
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    this.$nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
    if(this.$nombreusuario != null){
      if(this.$nombreusuario.rol != expectedRole ){
        this.router.navigate(['/bienvenida']);
        return false;
      }else{
        return true;
      }  
    }else{
        this.router.navigate(['/']);
        return false;
    }
  
   /* if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }*/
    
  }
  
  
}
