import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../store/user';
import { Observable } from 'rxjs';
import { fetchUserAPI } from '../../store/user.action';
import { userSelectorData } from '../../store/user.selector';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit{

  users$!: Observable<User[]>;

  constructor(private store: Store<{ allUser: User[] }>, private userServices: AuthService, private router : Router) { }
  ngOnInit(): void {
    this.store.dispatch(fetchUserAPI())
    this.users$ = this.store.pipe(select(userSelectorData))
    this.users$.subscribe((data)=>{console.log(data)})
  }


  editUser(id:string){
      this.userServices.setId(id)
      this.router.navigate(['/admin/editUser'])
    }

  
    deleteUser(id: string) {
      const sure = confirm('Are You Sure!')
      if(sure){
        this.userServices.deleteUser(id).subscribe((response) => {
          alert(response.message)
          this.store.dispatch(fetchUserAPI())
        }, (error) => {
          alert(error)
        })
      }
    }
  
  }

