import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './security/auth.guard';

const routes: Routes = [

  { path: 'login', component: LoginComponent },

  {path: 'signup', component: SignupComponent},

  {
    path: '', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path:'', component: HomeComponent },
      { path: 'todos', loadChildren: () => import('./pages/todos/todos.module').then(m=>m.TodosModule)}
    ]
  },

  {path: '**', redirectTo: 'login'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
