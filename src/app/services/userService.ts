

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{UserModel} from '../Models/user.model'
@Injectable()
export class userService {
    userData:UserModel;

    constructor(private httpClient: HttpClient) { }

  
    userEntry(userData:any) {
      debugger;
const body = JSON.stringify(userData);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
        this.httpClient.post<any>(`http://localhost:3000/users`, body , httpOptions)
            .subscribe(resData => {
               this.userData=resData;
               console.log(this.userData)
            })
    }

  
}
