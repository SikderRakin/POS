import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from  './modules/app-routing/app-routing.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppMaterialModule} from  './modules/app-material/app-material.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Auth Component
import {AuthInterceptor} from './auth/auth-interceptor';
import { LoginComponent } from './components/login/login.component';
//Components
import { AppComponent } from './app.component';

import { ButtonComponent } from './shared/button/button.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { HomeComponent } from './components/home/home.component';
import { SideNavComponent } from './layouts/side-nav/side-nav.component';
import { UserEntryComponent } from './components/user-entry/user-entry.component';



@NgModule({
  declarations: [
    AppComponent,
    
    LoginComponent,
    ButtonComponent,
    SpinnerComponent,
    HomeComponent,
    SideNavComponent,
    UserEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppMaterialModule,
    FormsModule,
  
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
