import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  itemEntryForm:FormGroup;
  taxes = [{name:"tax"},{name:"tax2"}]
  constructor(private _formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.itemEntryForm=this._formbuilder.group({
      type           :     ['Goods'], 
      item_name      :     ['',Validators.required],
      description    :     ['',Validators.required],
      unit           :     ['pc',Validators.required],
      tax            :     ['',],
      manufacturer   :     [""],   
      brand          :     [''],
              

    })
  }

  addManufacture(){
    alert("added")
  }

}
