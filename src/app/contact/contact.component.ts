import { Component, OnInit } from '@angular/core';
import { Globals } from "./../globals/globals";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(public g : Globals ) { }

  ngOnInit() {
  }

}
