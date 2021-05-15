import { Component, OnInit } from '@angular/core';
import{authService} from './auth/auth.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private _authService:authService){}
  title = 'POS';
  ngOnInit(){
    this._authService.autoAuthUser()
  }
}
