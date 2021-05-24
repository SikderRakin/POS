import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormControl, FormGroup, Validators,FormBuilder} from '@angular/forms';
import{userService} from '../../services/userService'
@Component({
  selector: 'app-user-entry',
  templateUrl: './user-entry.component.html',
  styleUrls: ['./user-entry.component.css'],
  providers:[userService]
})
export class UserEntryComponent implements OnInit {
  userEntryForm:FormGroup;
  hide=true;
  startDate = new Date(1990, 0, 1);
  getErrorMessage() {
    if (this.userEntryForm.get('email').hasError('required')) {
      return 'You must enter a value';
    }

    return this.userEntryForm.get('email').hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private _formBuilder: FormBuilder,private _userService:userService) { }

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
      rollID:       ['Admin'],
      DOB:          [''],
      region:       [''],
      email :       ['',Validators.required],
      isActvie :    ['1',Validators.required],
      password :    ['',Validators.required],
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
    this._userService.userEntry(this.userEntryForm.value)
  }

}
// initialization - No nested form controls
// this._formGroup = new FormGroup({
//   /* all other controls */
//   password: new FormControl(['', [/* Validators - required, minLength, pattern (if any) */]]),
//   confirm: new FormControl(['', [/* Validators - required */]])
// });

// // watch both the password fields
// this._formGroup.get('password').valueChanges.pipe(
//   tap(password => { this.validatePasswords(); })
// ).subscribe();

// this._formGroup.get('confirm').valueChanges.pipe(
//   tap(password => { this.validatePasswords(); })
// ).subscribe();

// validatePasswords(): void {
//   const confirmControl = this._formGroup.get('confirm')

//   const password: string = this._formGroup.get('password').value;
//   const confirm: string = confirmControl.value;


//   // if confirm password is not entered
//   if (!confirm) confirmControl.setErrors({ required: true });

//   else {

//     // if passwords do not match
//     if (password !== confirm) {
//       confirmControl.setErrors({
//         passwordMismatch: {
//           required: `(base64 encrypted) => ${btoa(password)}`,
//           entered: `(base64 encrypted) => ${btoa(confirm)}`
//         }
//       });
//     }

//     // if all goes well
//     else
//       confirmControl.setErrors(null);

//   }
// }