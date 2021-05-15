import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
@Input() color:string
@Input() value:string
@Input() mode:string

  constructor() { }

  ngOnInit(): void {
  }

}
