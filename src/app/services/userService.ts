
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{UserModel} from '../Models/user.model'
@Injectable()
export class userService {
    userData:UserModel;

    constructor(private httpClient: HttpClient) { }

  
    userEntry(userData) {
      debugger;
       
        this.httpClient.post<any>(`http://localhost:3000/users`, userData)
            .subscribe(resData => {
               this.userData=resData;
               console.log(this.userData)
            })
    }

  
}
