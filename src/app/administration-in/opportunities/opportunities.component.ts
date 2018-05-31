import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss']
})
export class OpportunitiesComponent implements OnInit {
  constructor(public g: Globals) { }

  ngOnInit() {
  }

}
