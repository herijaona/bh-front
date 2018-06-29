import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Globals } from './../../../globals/globals';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthserviceService } from '../../../services/authservice/authservice.service';
import { TeamsService } from '../../../services/teams/teams.service';
import { ProjectsService } from '../../../services/projects/projects.service';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  public applicationreport_page = 'applicationreport_page';
  public currentCandidatureID = '';
  public readytoshow = false;
  public detailsAll: any = {};
  constructor(private pr: ProjectsService, private activRoute: ActivatedRoute, private titl: Title, public g: Globals) {
    this.activRoute.params.subscribe((params_: any) => {
      this.currentCandidatureID = params_['applicationID'];
      this.getDetailsOnCandidature();
    });
  }

  ngOnInit() {
    this.titl.setTitle('Applications details');
  }
  async getDetailsOnCandidature() {
    this.detailsAll = [];
    try {
      const cDetails: any = await this.pr.getDetails(this.currentCandidatureID);
      if (cDetails) {
        if (cDetails.status === 'OK') {
          this.detailsAll = cDetails.data;
          this.readytoshow = true;
        } else {
          // code...
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
  async acceptApplication() {
    try {
      const acceptResData = await this.pr.sendacceptApplicationData({ applicationID: this.currentCandidatureID });
      if (acceptResData['status'] === 'OK') {
        
      }
    } catch (err) {
      console.log(err);
    }
  }

  closeAction() {
    window.close();
  }
}
