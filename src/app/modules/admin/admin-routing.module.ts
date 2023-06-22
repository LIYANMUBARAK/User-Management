import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component';
import { AccessAuthGuard } from 'src/app/gaurds/user-auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { AdminAuthGuard } from 'src/app/gaurds/admin-auth.guard';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
    {
         path: 'login',
        component: LoginComponent
    },
    {

    canActivate: [AdminAuthGuard],
    path: '',
    component: DashboardComponent,
    children: [{
      path: 'editUser',
      component: EditUserComponent
    },
    {
      path:'newUser',
      component:NewUserComponent
    },
    {
      path:'userlist',
      component:UserlistComponent
    }]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule { }