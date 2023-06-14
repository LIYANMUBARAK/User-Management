import { AuthService } from '../../app/services/auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard   {
  constructor(private router: Router) {}

}