import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";

@Component({
  selector: 'app-description-project',
  templateUrl: './description-project.component.html',
  styleUrls: ['./description-project.component.scss']
})
export class DescriptionProjectComponent implements OnInit {

  constructor(public g: Globals) { }

  ngOnInit() {
  }

}
