import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor() { }


  itemEntry(itemData:any) {
    debugger;
    // for(var i=0;itemData.length;i++){
    //   const formData = new FormData();

    //   for (const propertyKey of Object.keys(itemData[i])) {
    //     formData.append(propertyKey, itemData[i][propertyKey]);
    //   }
    const formData = new FormData();

      for (const propertyKey of Object.keys(itemData)) {
      formData.append(propertyKey, itemData[propertyKey]);
        }
      console.log(formData)
    }

  

  
      


}

