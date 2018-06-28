import { Component, OnInit } from '@angular/core';
import { Globals } from '../../../globals/globals';
import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  collabType : any;
  constructor(public globals: Globals, public project: ProjectsService) { }

  async ngOnInit() {
    this.collabType = this.globals.getConfig('collab_types');
    console.log(await this.project.getCountryHasCollab());
  }

}
