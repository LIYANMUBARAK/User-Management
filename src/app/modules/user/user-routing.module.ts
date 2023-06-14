import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/gaurds/auth.guard';


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
      canActivate:[AuthGuard],
        path:'profile',
        component:ProfileComponent
    }
  ];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })

  export class UserRoutingModule { }