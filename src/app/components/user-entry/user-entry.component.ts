import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.css']
})
export class UserEntryComponent implements OnInit {
  userEntryForm:FormGroup;
  hide=true;

  getErrorMessage() {
    if (this.userEntryForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.userEntryForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.userEntryForm=this._formBuilder.group({
      
      userName :    ['',Validators.required],
      first_name :  ['',Validators.required],
      last_name :   ['',Validators.required],
      contact :     ['',Validators.required],
      country :     ['',],
      address :     ['',Validators.required],
      zip_code :    ['',Validators.required],
      emplyeeCode : ['',Validators.required],
      gender:       ['Others'],
      roll:       ['Admin'],
      email :       ['',Validators.required],
      // email : new FormControl('', [Validators.required, Validators.email]),
      // email : new FormControl('', [Validators.required, Validators.email]),
      // email : new FormControl('', [Validators.required, Validators.email]),
      // email : new FormControl('', [Validators.required, Validators.email]),
      password :   ['',Validators.required],
    // this.userEntryForm=new FormGroup({
      
    //   userName :    new FormControl('', [Validators.required]),
    //   first_name :  new FormControl('', [Validators.required]),
    //   last_name :   new FormControl('', [Validators.required]),
    //   contact :     new FormControl('', [Validators.required]),
    //   country :     new FormControl('', []),
    //   address :     new FormControl('', [Validators.required]),
    //   zip_code :    new FormControl('', [Validators.required]),
    //   emplyeeCode : new FormControl('', [Validators.required]),
    //   gender: new FormControl({value: 'true', disabled: false}, [Validators.required]),
    //   email :       new FormControl('', [Validators.required, Validators.email]),
    //   // email : new FormControl('', [Validators.required, Validators.email]),
    //   // email : new FormControl('', [Validators.required, Validators.email]),
    //   // email : new FormControl('', [Validators.required, Validators.email]),
    //   // email : new FormControl('', [Validators.required, Validators.email]),
    //   password :   new FormControl('',[Validators.required])

    })
  }

  submit(){
    console.log(this.userEntryForm.value)
  }

}
// IsActive: [{ value: true, disabled: false },Validators.required]
// <section class="example-section">
// <label class="radioButton">Status:</label>
// <mat-radio-group formControlName="IsActive">
//   <mat-radio-button class="radioButton" [value]="true">Active</mat-radio-button>
//   <mat-radio-button class="radioButton" [value]="false">Inactive</mat-radio-button>
// </mat-radio-group>
// </section>