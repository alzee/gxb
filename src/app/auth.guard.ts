import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';
import { AuthConstants } from './config/auth-constants';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private router: Router,
      private storageService: StorageService
  ){
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // return true;

        return this.storageService.get(AuthConstants.AUTH).then(
            (res) => {
                return true;
            },
            (rej) => {
                this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url }});
                return false;
            }
        );
    }
}
