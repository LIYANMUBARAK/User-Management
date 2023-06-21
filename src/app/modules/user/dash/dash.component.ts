import { Component, OnInit } from '@angular/core';
import { fetchUserProfileAPI } from '../../store/user.action';
import { Store, select } from '@ngrx/store';
import { Profile } from '../../store/user';
import { Observable } from 'rxjs';
import { profileSelectorData } from '../../store/user.selector';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit{

  profile$!: Observable<Profile[]>;

  constructor(private store:Store){}

  ngOnInit(): void {
    this.store.dispatch(fetchUserProfileAPI())
    this.profile$ = this.store.pipe(select(profileSelectorData))
    this.profile$.subscribe((data) => { })
  }

}
