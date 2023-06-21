import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { fetchUserProfileAPI } from '../../store/user.action';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  // store: any;

  constructor(private router : Router,private store:Store){}

  ngOnInit(): void {
    this.store.dispatch(fetchUserProfileAPI())
  }


  logout(){
    localStorage.removeItem('userToken')
    this.router.navigate(['/login'])
  }
}
