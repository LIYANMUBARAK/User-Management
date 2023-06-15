import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000';

  constructor(private router: Router,private http: HttpClient) {}

  registerUser(userData:Object):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData)
  }
  verifyUser(userData:Object):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,userData)
  }
}