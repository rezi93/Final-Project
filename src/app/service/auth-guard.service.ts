import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate,  Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}
  
  canActivate(): boolean {
   
    if (localStorage.getItem('isLoggedIn') === 'true') {
      return true;
    }else{
      this.router.navigate(['/login']);
    return false;
    }
  }
}

