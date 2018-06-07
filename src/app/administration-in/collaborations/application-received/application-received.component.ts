import { Component, OnInit } from '@angular/core';
import { Globals } from './../../../globals/globals';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { Router, ActivatedRoute } from '@angular/router';

import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'app-application-received',
  templateUrl: './application-received.component.html',
  styleUrls: ['./application-received.component.scss'],
})
export class ApplicationReceivedComponent implements OnInit {
  public applicationreport_page = 'applicationreport_page';
  public allApplData: any = [];
  public dataCollab: any = {};
  public byApplication: boolean = false;
  private currentCollabID = '';
  constructor(private pr: ProjectsService, private activRoute: ActivatedRoute) {}
  ngOnInit() {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCollabID = params_['idCollab'];
      console.log(this.currentCollabID);
      if (this.currentCollabID) {
        this.getAllApplicationByCollab(this.currentCollabID);
      } else {
        this.getAllCProjectApplication();
      }
    });
  }
  async getAllCProjectApplication() {
    this.allApplData = [];
    try {
      const appl: any = await this.pr.getCompanyApplication();
      if (appl.data) {
        this.allApplData = appl.data;
      }
    } catch (e) {
      console.log(e);
    }
  }

  async getAllApplicationByCollab(cCollabID) {
    try {
      const applyByCollab = await this.pr.getApplByCollabID(cCollabID);
      if (applyByCollab['status'] === 'OK') {
        this.byApplication = true;
        console.log(applyByCollab);
        this.allApplData = applyByCollab['data']['allApplication'];
        this.dataCollab = applyByCollab['data']['collabData'];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
