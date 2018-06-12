import { Component, OnInit } from '@angular/core';
import { Globals } from './../../globals/globals';
import { ProjectsService } from '../../services/projects/projects.service';

@Component({
  selector: 'app-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'],
})
export class OpportunitiesComponent implements OnInit {
  constructor(public g: Globals, private pr: ProjectsService) {}

  ngOnInit() {
    this.getListOfOpportinuity();
  }

  async getListOfOpportinuity() {
    try {
      let allL: any = await this.pr.getadminProjectAsOpportuinity();
      if (allL.status === 'OK') {
        console.log(allL.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
