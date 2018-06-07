import { Component, OnInit } from '@angular/core';
import { Globals } from './../../../globals/globals';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'app-application-received',
  templateUrl: './application-received.component.html',
  styleUrls: ['./application-received.component.scss']
})
export class ApplicationReceivedComponent implements OnInit {
  public applicationreport_page = 'applicationreport_page';
  public allApplData: any = [];
  constructor(private pr: ProjectsService) {}
  ngOnInit() {
    this.getAllCProjectApplication();
  }
  async getAllCProjectApplication() {
    this.allApplData = [];
    try {
      const appl: any = await this.pr.getCompanyApplication();
      console.log('Apply');
      if (appl.data) {
        this.allApplData = appl.data;
      }
    } catch (e) {
      console.log(e);
    }
  }
}
