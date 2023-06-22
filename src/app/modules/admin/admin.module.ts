import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserlistComponent } from './userlist/userlist.component';
import { EffectsModule } from '@ngrx/effects';
import { userEffects } from '../store/user.effects';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '../store/user.reducer';



@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    EditUserComponent,
    NewUserComponent,
    UserlistComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    EffectsModule.forFeature([userEffects]),
    StoreModule.forFeature( "users",userReducer ),
  ]
})
export class AdminModule { }
