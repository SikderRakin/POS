import {  NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from '../../components/login/login.component';
import { HomeComponent } from '../../components/home/home.component';
import { AuthGurad } from '../../auth/auth.guard';
import { SideNavComponent } from '../../layouts/side-nav/side-nav.component';

const appRoute: Routes = [
  {path:'', redirectTo:'/home',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  { path: 'home',
   component: SideNavComponent,
   canActivate:[AuthGurad],
   children: [
    {
      path:'landing', component:HomeComponent
    }
]
},
{    path: '**', component: LoginComponent}

]

  @NgModule({
    imports:[RouterModule.forRoot(appRoute)],
    exports:[RouterModule],
    providers:[AuthGurad]
    })
export class AppRoutingModule { }