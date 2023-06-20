import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessAuthGuard } from './gaurds/user-auth.guard'

const routes: Routes = [
  {
  path:'',
  loadChildren:()=> import('./modules/user/user.module').then(b=>b.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
