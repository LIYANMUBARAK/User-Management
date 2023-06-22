import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  constructor(private router : Router,private store:Store){}

  logout(){
    localStorage.removeItem('adminToken')
    this.router.navigate(['admin/login'])
  }
}
