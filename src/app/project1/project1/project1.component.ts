import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
@Component({
  selector: 'app-project1',
  templateUrl: './project1.component.html',
  styleUrls: ['./project1.component.scss']
})
export class Project1Component implements OnInit {
  	public header_page_logo: string = this.g.base_href + "assets/img/logo-collaboration.png";
  constructor(
  	public g: Globals,
  	) {}

  ngOnInit() {
  }

}
