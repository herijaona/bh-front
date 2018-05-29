import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
@Component({
  selector: 'navbar-capital',
  templateUrl: './navbar-capital.component.html',
  styleUrls: ['./navbar-capital.component.scss']
})
export class NavbarCapitalComponent implements OnInit {
  public header_page_logo: string = this.g.base_href + "assets/img/logo-collaboration.png";
  constructor(
  	public g: Globals,
  	) {}

  ngOnInit() {
  }

}
