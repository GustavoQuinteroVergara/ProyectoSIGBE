import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidacionRutasGuard implements CanActivate {
  constructor(private router:Router){}
  $nombreusuario= JSON.parse(localStorage.getItem('currentUser'));
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    if(this.$nombreusuario.rol != expectedRole ){
      this.router.navigate(['/bienvenida']);
      console.log('Usuario No permitido');
      return false;
    }    
   /* if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }*/
    console.log('Usuario Permitido')
    return true;
  }
  
  
}
