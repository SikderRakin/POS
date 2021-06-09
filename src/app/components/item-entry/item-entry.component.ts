
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import {ItemServiceService} from '../../services/item-service.service'
@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  itemEntryForm:FormGroup;
  imagePreview:string;
  dataSource=[];
  a:string
  taxes = [{name:"tax"},{name:"tax2"}]
  attributes = [{name:"color"},{name:"storage"}]
  displayedColumns: string[] = ['type', 'name', 'description', 'unit'];

  constructor(private _formbuilder:FormBuilder,private _itemSs:ItemServiceService) { }

  ngOnInit(): void {
    this.itemEntryForm=this._formbuilder.group({
      type           :     ['Goods'], 
      item_name      :     ['',Validators.required],
      description    :     ['',Validators.required],
      unit           :     ['pc',Validators.required],
      tax            :     ['',],
      manufacturer   :     ['',],   
      brand          :     ['',],
      color          :     ['',],
      storage        :     ['',],
    
      image          :     ['',],
      other          :     ['',],
      price          :     [0,],
      quantity       :     [0,],
      item_code      :     ['',Validators.required],
      isActive       :     ['true',]
    })
  }
  addItem(){
    this.dataSource = [...this.dataSource, this.itemEntryForm.value]
  // this.dataSource.push(this.itemEntryForm.value)
  // this.a=JSON.stringify(this.dataSource)
  // this._itemSs.itemEntry(this.dataSource);
  // this.dataSource=this.itemEntryForm.value
  console.log(this.dataSource)

  }
  addManufacture(){
    alert("added")
  }
  onSubmit(){
   this._itemSs.itemEntry(this.itemEntryForm.value)
  }

  getAttr(event:Event){

  }
  pickedImg(event:Event){
    const file=(event.target as HTMLInputElement).files[0]
    this.itemEntryForm.patchValue({image:file});
    this.itemEntryForm.get('image').updateValueAndValidity();
    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePreview=reader.result as string
    }
    reader.readAsDataURL(file);
    console.log(  this.itemEntryForm.get('image').value)
  }
}
