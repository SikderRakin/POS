import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import{authService} from '../../auth/auth.service'
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  isExpanded=false
//Auth part
private authStatusListener:Subscription
isAuthenticated:boolean=false
  constructor(private _signupService:authService) { }

  ngOnInit(): void {
    this.isAuthenticated=this._signupService.getIsAuth();
    this.authStatusListener=this._signupService.getauthStatusListener()
      .subscribe(resData =>{this.isAuthenticated = resData} );
  }
  logOut(){
    this._signupService.logout()
  }
}
