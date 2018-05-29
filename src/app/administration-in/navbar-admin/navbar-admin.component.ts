import { Component, OnInit,Input } from '@angular/core';
import { Globals } from "./../../globals/globals";
import { Router } from "@angular/router";
@Component({
  selector: 'navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.scss']
})
export class NavbarAdminComponent implements OnInit {
  constructor(private router: Router, public g: Globals) { }

  ngOnInit() {
  }
}
