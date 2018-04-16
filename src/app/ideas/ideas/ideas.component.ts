import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
@Component({
  selector: 'app-ideas',
  templateUrl: './ideas.component.html',
  styleUrls: ['./ideas.component.scss']
})
export class IdeasComponent implements OnInit {

  constructor(public g: Globals) { }

  ngOnInit() {
  }

}
