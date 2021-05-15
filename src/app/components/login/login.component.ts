import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import { Subscription } from 'rxjs';

import{authService} from '../../auth/auth.service'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm:FormGroup;
  hide=true;
  IsLoading=false;
  //Auth part
  private authStatusListener:Subscription
  isAuthenticated:boolean=false
  getErrorMessage() {
    if (this.loginForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private _signupService:authService) { }


  ngOnInit(): void {

       this.isAuthenticated=this._signupService.getIsAuth();
       this.authStatusListener=this._signupService.getauthStatusListener()
         .subscribe(resData =>{this.isAuthenticated = resData} );
           
       this.loginForm = new FormGroup({
       email : new FormControl('', [Validators.required, Validators.email]),
       password : new FormControl('',[Validators.required])
    
         
  });
  }

  ngOnDestroy(): void {
    this.authStatusListener.unsubscribe();
  }

 
  logIn(){
   
    const email=this.loginForm.get('email').value;
    const password=this.loginForm.get('password').value;
    this.IsLoading=true
      this._signupService.signup(email,password)
        // .subscribe(resData => {
        //   this.IsLoading=false
        //   console.log(resData)
        // },
        // error=>{
        //   this.IsLoading=false
        //   console.log(error);
          
        // });
      
this.loginForm.reset();

  }
  readprofile(){
    this._signupService.readprofile()
  }
  logOut(){
    this._signupService.logout()
  }
}
