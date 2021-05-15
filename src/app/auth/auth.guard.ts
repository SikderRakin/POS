
import { Injectable } from '@angular/core';
import{ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router'
import { Observable } from 'rxjs';
import{authService} from '../auth/auth.service'
@Injectable()
export class AuthGurad implements CanActivate{

    constructor(private _authService:authService,private _router:Router){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      const isAuth=this._authService.getIsAuth();
      if(!isAuth){
          this._router.navigate(['/login'])
      }
      return true
    }

    
}