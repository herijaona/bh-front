import { Component, OnInit,Input } from '@angular/core';
import { Globals } from "./../../globals/globals";
@Component({
  selector: 'navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  constructor(public g: Globals) { }

  ngOnInit() {
  }

}
