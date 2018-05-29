import { Component, OnInit, Input  } from '@angular/core';
import { Globals } from "./../../globals/globals";

@Component({
  selector: 'app-collaborations',
  templateUrl: './collaborations.component.html',
  styleUrls: ['./collaborations.component.scss']
})
export class CollaborationsComponent implements OnInit {
  constructor(
  	public g: Globals) { }

  ngOnInit() {
  }

}
