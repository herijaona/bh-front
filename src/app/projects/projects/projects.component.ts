import { Component, OnInit } from '@angular/core';
import { Globals } from "./../../globals/globals";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  constructor(public g : Globals) { }

  ngOnInit() {
  }

}
