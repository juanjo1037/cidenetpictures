import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root'
})
export class MovieGuardService implements CanActivate {
  realRole: String="";

  constructor(
    private tokenService: TokenService,
    private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
   const expectedRole= route.data.expectedRole;

     if(this.tokenService.isAdmin()){
       this.realRole= 'admin'
     }else{
       this.realRole='user';
     }
     console.log(this.realRole);
   if(!this.tokenService.isLogged() || expectedRole.indexOf(this.realRole) < 0){
    console.log("no puedes entrar")
     this.router.navigate(['']);
     return false;
   }
     console.log(expectedRole);
     return true;
  }
}
