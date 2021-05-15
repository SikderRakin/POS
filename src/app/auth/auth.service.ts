
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router} from "@angular/router";
@Injectable({ providedIn: 'root' })
export class authService {
    private token: string
    private authStatusListener = new Subject<boolean>()
    private isAuthenticated = false

    constructor(private httpClient: HttpClient,private _router:Router) { }

    getToken() {
        return this.token
    }

    getauthStatusListener() {
        return this.authStatusListener.asObservable();
    }

    
    getIsAuth() {
        return this.isAuthenticated;
    }

  autoAuthUser(){
      const authUserInfo=this.getAuthData();
      if(authUserInfo){
        const token = authUserInfo.token
        this.token=token
        this.isAuthenticated=true
        this.authStatusListener.next(true)
       
    }
  }

    signup(email: string, password: string) {
      
        const authData: any = { email: email, password: password }
        this.httpClient.post<{token:string}>(`http://localhost:3000/user/login`, authData)
            .subscribe(resData => {
               const token = resData.token
                this.token=token
                if(token){
                    this.isAuthenticated=true
                    this.authStatusListener.next(true)
                    this.saveAuthData(this.token)
                    this._router.navigate(['/home'])
                }
               
                console.log(this.token)
            })
    }

    readprofile() {
        this.httpClient.get<any>(`http://localhost:3000/users/me`)
            .subscribe(resData => {

                console.log(resData)
            })
    }

    logout() {
        debugger;
        this.token=null;
        this.isAuthenticated=false;
        this.authStatusListener.next(false);
        this._router.navigate(['/login'])
        this.clearSaveData()
        // this.httpClient.post<any>(`http://localhost:3000/user/logout`, {})
        //     .subscribe(resData => {
        //         console.log(resData)
        //     })
    }


   private saveAuthData(token:string){
       localStorage.setItem("token",token)
    }
    private  clearSaveData(){
        localStorage.removeItem("token")
    }

    private getAuthData(){
        const token=localStorage.getItem("token")
        if(!token){
            return
        }
        return{
            token: token
        }
    }
}
