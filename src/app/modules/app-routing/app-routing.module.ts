import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../../components/login/login.component';
import { HomeComponent } from '../../components/home/home.component';
import { AuthGurad } from '../../auth/auth.guard';
import { SideNavComponent } from '../../layouts/side-nav/side-nav.component';
import { UserEntryComponent } from '../../components/user-entry/user-entry.component';
import { ItemEntryComponent } from '../../components/item-entry/item-entry.component';
import { TestComponent } from 'src/app/test/test/test.component';

const appRoute: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: SideNavComponent,

    children: [
      {
        path: 'landing',
        component: HomeComponent,
      },
      {
        path: 'user-entry',
        component: UserEntryComponent,
      },
      {
        path: 'item-entry',
        component: ItemEntryComponent,
      },
      {
        path: 'test',
        component: TestComponent,
      },
    ],
  },
  { path: '**', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule],
  providers: [AuthGurad],
})
export class AppRoutingModule {}
