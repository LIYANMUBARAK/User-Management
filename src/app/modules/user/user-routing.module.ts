import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { AccessAuthGuard } from 'src/app/gaurds/user-auth.guard';


const routes: Routes = [
    {
      path:'login',
      component:LoginComponent
    },
    {
        path:'registration',
        component:RegistrationComponent
    },
   
    {
      canActivate:[AccessAuthGuard],
      path:'',
      component:HomeComponent,
      children:[ {
          path:'profile',
          component:ProfileComponent
      }]
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class UserRoutingModule { }