import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ItemServiceService {
  constructor(private httpClient: HttpClient) {}
  private modifiedTableData = new Subject<any>();
  public modifiedTableDataChange = this.modifiedTableData.asObservable();

  changeModifiedTableData(modifiedTableData) {
    debugger;
    this.modifiedTableData.next(modifiedTableData);
  }
  itemEntry(itemData: any) {
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

    console.log(formData);
    this.httpClient
      .post<any>(`http://localhost:3000/itementry`, formData)
      .subscribe((resData) => {
        console.log(resData);
      });
  }
}
