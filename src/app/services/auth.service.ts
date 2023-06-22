import { Observable, of, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'
import { Profile, User } from '../modules/store/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  id!:String
  private apiUrl: string = 'http://localhost:3000';

  constructor(private router: Router,private http: HttpClient) {}


  setId(id: string) {
    this.id = id;
  }


  registerUser(userData:Object):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, userData)
  }
  
  verifyUser(userData:Object):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,userData)
  }

  fetchUserProfile(userId: any): Observable<Profile[]> {
    return this.http.get<Profile[]>(`${this.apiUrl}/profile?id=${userId}`)
  }

  profileUpload(file: object, id: string | null) {
    return this.http.post(`${this.apiUrl}/image?id=${id}`, file)
  }

  verifyAdmin(adminData:Object):Observable<any>{
    return this.http.post(`${this.apiUrl}/admin/login`,adminData)
  }

  fetchAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/fetchUsers`)
  }

  updateUser(userData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update`, userData)
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/deleteUser?id=${id}`)
  }

  createNewUser(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/create`, userData)
  }

  profileDelete(id: string | null) {
    return this.http.delete(`${this.apiUrl}/imageDelete?id=${id}`)
  }
}