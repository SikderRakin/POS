import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {
  constructor(private httpClient: HttpClient) { }


  itemEntry(itemData:any) {
    debugger;
    // for(var i=0;itemData.length;i++){
    //   const formData = new FormData();

    //   for (const propertyKey of Object.keys(itemData[i])) {
    //     formData.append(propertyKey, itemData[i][propertyKey]);

       
    //   }
     
      
    //   this.httpClient.post<any>(`http://localhost:3000/itementry`, formData)
    //   .subscribe(resData => {
    //      alert("saved")
    //   })
    
    // }
    const formData = new FormData();

      for (const propertyKey of Object.keys(itemData)) {
      formData.append(propertyKey, itemData[propertyKey]);
        }

   

      
    console.log(formData)
    this.httpClient.post<any>(`http://localhost:3000/itementry`, formData)
      .subscribe(resData => {
         console.log(resData)
      })
  }

  

  
      


}

