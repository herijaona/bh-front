import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";
@Component({
  selector: 'request-info',
  templateUrl: './request-info.component.html',
  styleUrls: ['./request-info.component.scss']
})
export class RequestInfoComponent implements OnInit {

  constructor(public g: Globals) { }

  ngOnInit() {
  }

}
