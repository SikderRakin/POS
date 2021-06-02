import { rendererTypeName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-item-entry',
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.css']
})
export class ItemEntryComponent implements OnInit {
  itemEntryForm:FormGroup;
  imagePreview:string;

  taxes = [{name:"tax"},{name:"tax2"}]
  attributes = [{name:"color"},{name:"storage"}]
  constructor(private _formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.itemEntryForm=this._formbuilder.group({
      type           :     ['Goods'], 
      item_name      :     ['',Validators.required],
      description    :     ['',Validators.required],
      unit           :     ['pc',Validators.required],
      tax            :     ['',],
      manufacturer   :     ["",],   
      brand          :     ['',],
      item_attribute :     ['',],
      item_attribute2:     ['',],
    
      image          :     ['',],

    })
  }

  addManufacture(){
    alert("added")
  }
  onSaveitem(){
    console.log( this.itemEntryForm.value)
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
